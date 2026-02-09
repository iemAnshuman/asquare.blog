---
title: Projects - Anshuman
display: Projects
description: Research Experiments & Systems
wrapperClass: 'text-center'
art: plum
projects:
  Research & Systems:
    - name: "Triton 1.58"
      link: "https://github.com/iemAnshuman/Triton_1.58"
      desc: >
        Custom inference engine for 1.58-bit models built with OpenAI Triton. Optimized for high-performance low-bit quantization.
      icon: "carbon:chip"

    - name: "HPC-DL"
      link: "https://github.com/iemAnshuman/high-performance-deep-learning"
      desc: >
        Distributed training library and pipeline for model compression. Incorporates Neuro-Shrink logic for efficient scaling.
      icon: "carbon:network-overlay"

  Engineering & Tools:
    - name: "Neuro-Ranker"
      link: "https://github.com/iemAnshuman/neuro-ranker-research"
      desc: >
        A high-performance dense retrieval system (On-Device Search API). Distilled Cross-Encoders into Bi-Encoders for sub-10ms CPU latency.
      icon: "carbon:machine-learning-model"

    - name: "EmotiTune"
      link: "https://github.com/iemAnshuman/EmotiTune"
      desc: >
        Real-time audio inference pipeline using PyTorch CNNs and Librosa, deployed via Docker.
      icon: "carbon:audio-console"
---

<ListProjects :projects="frontmatter.projects" />
