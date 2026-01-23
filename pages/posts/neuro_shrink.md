---
title: "Neuro-Shrink: Estimating LLM VRAM Usage with 4-bit Logic"
date: 2026-01-24
type: post
---

I tried to run Llama-3-70B on my laptop this morning.

It didn't work, obviously. My screen flickered, the fans screamed, and then: `CUDA out of memory`.

We throw around these numbers—7B, 13B, 70B—like they are just model names. But they are physical constraints. A "parameter" isn't an abstract concept, it is a piece of data that has to live somewhere.

I got tired of guessing if a model would fit. I got tired of downloading a 40GB file just to find out I was 2GB short of VRAM.

So I spent the afternoon building a calculator.

### The Arithmetic of Intelligence

The math is deceptively simple, but we always forget the overhead.

If you have a 7 Billion parameter model:

- **FP32 (Standard):** 4 bytes per param. $7 \times 4 = 28$ GB.
- **FP16 (Half):** 2 bytes per param. $7 \times 2 = 14$ GB.
- **INT4 (Quantized):** 0.5 bytes per param. $7 \times 0.5 = 3.5$ GB.

This is why 4-bit quantization is the only reason local AI exists. It turns a data center problem into a laptop problem.

### The Hidden Cost: KV Cache

But the weights aren't the whole story.

When you chat with a model, it has to remember the conversation. It stores the "Key" and "Value" matrices for every token in the context window.

This is the **KV Cache**, and it grows linearly with context length.

$$\text{Cache Size} = 2 \times n_{\text{layers}} \times n_{\text{heads}} \times d_{\text{head}} \times \text{Context} \times \text{Precision}$$

For a 70B model with a long context, this cache alone can eat 5GB of VRAM. If you don't account for this, your model loads fine, but crashes the moment you ask it a long question.

### Introducing Neuro-Shrink

I wrote a CLI tool called `neuro-shrink`.

It hits the HuggingFace API, pulls the config (layers, heads, hidden size), and calculates the _actual_ memory footprint, including the KV cache buffer and the activation overhead.

```bash
$ python neuro_shrink.py --model meta-llama/Llama-2-7b-hf --quantization int4

[+] Fetching config for meta-llama/Llama-2-7b-hf...
[+] Model Size: 7B parameters

Memory Requirements:
--------------------
Weights (INT4):      3.50 GB
KV Cache (4k ctx):   1.02 GB
Activation Buffer:   0.30 GB
--------------------
TOTAL VRAM:          4.82 GB

Verdict: Fits on RTX 3060 (6GB)

```

It’s not a complex AI. It’s just a script. But it solves a problem I actually have.

And honestly, seeing that green checkmark is satisfying. It means I don't have to fight the memory wall today. I just have to fit inside it.
