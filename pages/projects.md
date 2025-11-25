---
title: Projects - Anshuman
display: Projects
description: Research Experiments & Systems
wrapperClass: 'text-center'
art: plum
projects:
  Research & Systems:
    - name: "Sparse-Transformer-H100"
      link: "https://github.com/iemAnshuman/reproduction-repo"
      desc: >
        Reproducibility study of sparse attention kernels on NVIDIA DGX H100. Achieved 1.5x throughput gain via custom INT8 quantization.
      icon: "carbon:chart-network"

    - name: "Neuro-Ranker"
      link: "https://github.com/iemAnshuman/neuro-ranker-research"
      desc: >
        A high-performance dense retrieval system. Distilled Cross-Encoders into Bi-Encoders to achieve sub-10ms latency on CPU (18x compression).
      icon: "carbon:machine-learning-model"

    - name: "Neuro-Hedge"
      link: "https://github.com/iemAnshuman/Neuro-Hedge"
      desc: >
        Deep RL agent for derivative pricing using Geometric Brownian Motion and Ornstein-Uhlenbeck exploration noise.
      icon: "carbon:finance"

  Engineering & Tools:
    - name: "EmotiTune"
      link: "https://github.com/iemAnshuman/EmotiTune"
      desc: >
        Real-time audio inference pipeline using PyTorch CNNs and Librosa, deployed via Docker.
      icon: "carbon:audio-console"
---

<ListProjects :projects="frontmatter.projects" />
