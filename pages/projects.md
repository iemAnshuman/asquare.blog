---
title: Projects - Anshuman
display: Projects
description: List of projects
wrapperClass: 'text-center'
art: plum
projects:
  Featured: # <--- Add this category key
    - name: "asquare.blog"
      link: "https://asquare.blog"
      desc: "personal internet space"
      icon:  "mdi-web"
    - name: "neuro-ranker-distill"
      link: "https://github.com/iemAnshuman/neuro-ranker-distill"
      desc: >
        A distilled ranking system where a cross-encoder teacher trains a lightweight bi-encoder student for fast, high-quality retrieval.
      icon:  "slidev"
    - name: "Todoist CLI"
      link: "https://github.com/iemAnshuman/todoist-cli"
      desc: "A CLI tool to manage your Todoist tasks from the command line."
      icon:  "vueuse"
    - name: "EmotiTune"
      link: "https://github.com/iemAnshuman/EmotiTune"
      desc: >
        An emotion-aware music companion that recommends songs based on your current mood.
      icon:  "vue-reactivity"
    - name: "Ration Management System"
      link: "https://github.com/iemAnshuman/ration-management-system"
      desc: "A system that helps you manage your ration"
      icon:  "vue-demi"
---

<ListProjects :projects="frontmatter.projects" />
