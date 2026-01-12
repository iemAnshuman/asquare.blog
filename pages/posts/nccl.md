---
title: "It’s Just a Ring: Demystifying NCCL and Distributed Training"
date: 2026-01-12
type: post
---

I used to treat `torch.nn.parallel.DistributedDataParallel` as a magic wrapper. You wrap your model, you spawn 8 processes, and suddenly your batch size is 8x bigger. Magic.

But magic is just engineering you don't understand yet. And in systems, magic is dangerous. If you don't know how it works, you can't fix it when it stalls.

I spent the weekend trying to understand how 8 GPUs agree on a single set of gradients without stopping the world.

### The Telephone Game

The naive assumption is that there is a "Master" GPU.
GPU 1 calculates gradients $\to$ Sends to Master.
GPU 2 calculates gradients $\to$ Sends to Master.
Master averages them $\to$ Sends back.

This is the **Parameter Server** model. It works, but it has a flaw: The Master is a bottleneck. If you have 1000 GPUs, the Master melts. The bandwidth required scales linearly with $N$.

The solution that NVIDIA uses (in NCCL) is so simple it feels like a toy algorithm.

**It’s a Ring.**

GPU 0 talks _only_ to GPU 1.
GPU 1 talks _only_ to GPU 2.
...
GPU N talks _only_ to GPU 0.

circular linked list!

It’s a bucket brigade. It’s a game of telephone.

### The Algorithm (All-Reduce)

To average the numbers, you don't send the whole model at once. You chop the data into chunks.

1.  **Scatter-Reduce:** Everyone passes a chunk to their neighbor. As the chunk passes through, you add your own gradients to it. By the time the chunk makes a full circle, it contains the sum of everyone's work.
2.  **All-Gather:** Now that the sum is calculated, you pass the _result_ around the ring so everyone has the final copy.

The beauty of this is bandwidth. The amount of data sent by each GPU is constant. It doesn't matter if you have 4 GPUs or 4,000 GPUs. You only ever talk to your neighbor.

### Simulating the Metal

I didn't believe it was that simple, so I wrote a simulation in Python. No PyTorch, no CUDA. Just lists and loops.

```python
class Node:
    def __init__(self, rank, value):
        self.rank = rank
        self.buffer = value
        self.neighbor = None

    def step(self):
        # pass to right
        # receive from left
        incoming = self.left_neighbor.buffer
        self.buffer += incoming

nodes = [Node(i, value=1) for i in range(4)]
for i in range(4):
    nodes[i].left_neighbor = nodes[(i - 1) % 4]

print(f"step 0: {[n.buffer for n in nodes]}")
for step in range(3):
    new_buffers = [n.left_neighbor.buffer + n.buffer for n in nodes]
    for i, n in enumerate(nodes):
        n.buffer = new_buffers[i]
    print(f"step {step+1}: {[n.buffer for n in nodes]}")

```

When you see the numbers flow, the fear disappears.

Distributed training isn't magic. It isn't even complicated math. It’s just a very organized, very fast game of pass-the-parcel.

The bottleneck isn't the math. It’s the wire. It’s the speed of light between the boxes. That’s why we need InfiniBand. That’s why we need NVLink. Because when the algorithm is this efficient, the only thing slowing you down is physics.
