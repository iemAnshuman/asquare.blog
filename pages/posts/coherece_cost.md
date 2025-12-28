---
title: The Unreasonable Cost of Coherence: A Deep Dive into GPU Memory Hierarchies
date: 2025-12-28
type: post
---

I broke physics today, or at least, I thought I did.

I wrote two kernels. They did the exact same thing. They both read 1 million numbers from memory, added 1 to them, and wrote them back. Same math, same data size, same GPU.

Kernel A took 12 microseconds.
Kernel B took 140 microseconds.

Kernel B was **10x slower**.

I stared at the profiler for an hour, I thought my clock was broken. How can reading the same amount of data take 10 times longer just because I changed the order I read it in?

We grow up learning Big O notation. $O(N)$. Linear time. We are taught that memory is just a giant array, a random-access tape that we can read from anywhere, instantly.

That is a lie.

### The Bucket Metaphor

Here is what I learned today: The GPU doesn't read numbers. It reads _lines_.

When I ask for a single float (4 bytes), the GPU doesn't just send a little courier to fetch that one number. It sends a dump truck. It fetches a 128-byte "cache line" from the VRAM.

In **Kernel A** (the fast one), my threads were cooperative. Thread 0 asked for address 0. Thread 1 asked for address 4. Thread 2 asked for address 8.

The GPU memory controller looked at this request and said, "Oh, you all want data that lives next to each other? Cool. I'll send **one** dump truck."

One transaction. 32 threads fed.

In **Kernel B** (the slow one), I was being chaotic. I was "striding." Thread 0 asked for address 0. Thread 1 asked for address 128. Thread 2 asked for address 256.

The GPU controller panicked. It had to send a dump truck for Thread 0. Then _another_ dump truck for Thread 1. Then _another_ for Thread 2.

I was triggering 32 memory transactions to read 32 numbers. I was using a massive bucket to carry a single drop of water, over and over again.

### The Code That Killed Performance

It looks so innocent in Triton, but the hardware cost is catastrophic.

```python
@triton.jit
def memory_test(ptr, n_elements, STRIDE, BLOCK_SIZE: tl.constexpr):
    pid = tl.program_id(0)

    # The "Coalesced" read (Stride = 1)
    # The "Uncoalesced" read (Stride = 128)
    offsets = tl.arange(0, BLOCK_SIZE) * STRIDE
    mask = offsets < n_elements

    # If STRIDE is 128, this single line destroys your bandwidth
    val = tl.load(ptr + offsets, mask=mask)

    tl.store(ptr + offsets, val + 1, mask=mask)

```

### Coherence is Expensive

This is called **Memory Coalescing**, and it's the invisible wall that separates the "good" kernels from the "great" ones.

It made me realize something philosophical about systems. Coherence is cheap, chaos is expensive. If you can organize your work so that everyone is pulling in the same direction, accessing data that is close together, you get massive throughput for free.

But if you scatter your attention? If you jump around? The system collapses under the overhead of just _fetching_ the work.

I used to think optimization was about writing clever math. It’s not. It’s about being a good traffic controller. It’s about understanding that the hardware has a geometry, a shape, and if you fight that shape, you lose.

I’m never writing `stride=128` again.
