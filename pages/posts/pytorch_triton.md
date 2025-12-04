---
title: Why I left Pytorch for Triton
date: 2025-12-04
type: post
---

I hate waiting.

It’s a specific kind of waiting. Not the "waiting for a bus" kind. It’s the "waiting for the progress bar to move" kind. I pressed run on my training loop today and just stared at the GPU utilization. It was at 100%. The fans were spinning. It _sounded_ like it was working hard.

But it felt slow.

I looked at the code. It was simple. Just a Softmax. A large one, sure, but just math. `Exp`. `Sum`. `Divide`. Why does it take so long?

I realized something today. PyTorch is lying to me.

Well, not lying. But hiding. It hides the metal. It makes me think that the "math" is the hard part. It makes me think that `torch.softmax(x)` is one operation. It’s not. It’s a tragedy of movement.

### The Cost of Moving

I started reading about the Roofline Model.

Here is the thing I didn't understand before: **Compute is free.**

Modern GPUs are monsters. They can do trillions of floating point operations per second. They are hungry beasts that want to eat numbers. But we, the programmers, we are starving them.

When I run `torch.exp(x)` in PyTorch, the GPU reads `x` from memory (HBM), calculates the exponent, and writes it back to memory.
Then `torch.sum(x)` reads that result _again_, sums it, writes it back.
Then `torch.div` reads it _again_.

It’s like running to the grocery store to buy one egg. Coming home. Running back to buy milk. Coming home. Running back to buy flour.

You spend all your time running. You spend no time baking.

This is the **Memory Wall**. And I hit it hard.

### Entering the Kernel

So I decided to stop using the pre-made stuff. I needed to write the kernel myself. I needed to go lower. CUDA is... painful. Cpp is too much boilerplate for my brain right now.

Then I found **Triton**.

It feels like Python, but it compiles to the metal. It lets me control the "tiles"—the chunks of data I bring into the chip.

The goal was simple: Fused Softmax.
Do everything—the exp, the sum, the divide—while the data is still "hot" in the SRAM (the fast cache). Don't write anything back to the slow HBM until you are done.

I spent few hours fighting with pointers. `tl.load`. `tl.store`. The mask. God, the masks. If your vector size isn't a power of 2, everything explodes. Segfaults. Silent failures.

I felt stupid. I felt like I didn't know how computers worked anymore.

And then, it worked.

```python
@triton.jit
def softmax_kernel(output_ptr, input_ptr, input_row_stride, output_row_stride, n_cols, BLOCK_SIZE: tl.constexpr):
    row_idx = tl.program_id(0)

    row_start_ptr = input_ptr + row_idx * input_row_stride
    col_offsets = tl.arange(0, BLOCK_SIZE)
    input_ptrs = row_start_ptr + col_offsets

    row = tl.load(input_ptrs, mask=col_offsets < n_cols, other=-float('inf'))

    row_minus_max = row - tl.max(row, axis=0)
    numerator = tl.exp(row_minus_max)
    denominator = tl.sum(numerator, axis=0)
    softmax_output = numerator / denominator

    output_row_start_ptr = output_ptr + row_idx * output_row_stride
    output_ptrs = output_row_start_ptr + col_offsets
    tl.store(output_ptrs, softmax_output, mask=col_offsets < n_cols)

```

### The Speed of Light

I profiled it.

My kernel was **4x faster** than the naive PyTorch implementation for the specific size I needed.

4x!!

I sat there looking at the number. It wasn't just "optimization." It was understanding. I wasn't just calling a function anymore. I was controlling the electrons. I told them where to go, and I told them not to leave the chip until I said so.

There is a specific dopamine hit when you realize the bottleneck isn't the hardware. The bottleneck was me. It was my code.

I think I'm going to stay down here for a while. In the kernels. It's messy, and you have to manage your own memory, and you can't just `print()` to debug.

But it feels real.

---
