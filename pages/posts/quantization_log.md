---
title: "The Unreasonable Effectiveness of INT8 Quantization"
date: 2025-11-20
type: post
---

In modern deep learning, we often obsess over parameter count, but memory bandwidth is frequently the true bottleneck for inference. Recently, while benchmarking Transformer architectures on **NVIDIA H100 clusters**, I observed that moving from FP16 to INT8 precision often yields throughput gains that theoretical FLOPs calculations don't fully predict.

### The Memory Wall

When deploying models like BERT or Llama on edge devices (or even high-end GPUs), the cost of moving weights from HBM (High Bandwidth Memory) to the compute units often exceeds the cost of the matrix multiplication itself.

By quantizing weights to 8-bit integers, we essentially:

1. Reduce memory footprint by **2x** (vs FP16) or **4x** (vs FP32).
2. Double the effective memory bandwidth.

### Experiments with ONNX Runtime

For my **Neuro-Ranker** project, I utilized Post-Training Quantization (PTQ). The challenge wasn't just rounding numbers; it was handling the outliers in the activation distributions (a phenomenon often seen in larger transformers).

Using a calibration dataset to calculate the min-max range of activations allowed me to maintain **97% of the original MRR (Mean Reciprocal Rank)** while reducing latency from **~140ms to ~8ms** on a standard CPU backend.

### Conclusion

There is a "free lunch" in deep learning, but it's hidden inside the bit-representation of our tensors.

_[Link to full technical report on GitHub]_
