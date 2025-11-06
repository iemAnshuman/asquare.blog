<script setup lang="ts">
// no script needed
</script>

<template>
  <header class="w-full">
    <!-- Brand (top-left) -->
    <RouterLink
      to="/"
      class="w-12 h-12 absolute xl:fixed m-5 select-none outline-none"
      focusable="false"
      aria-label="Home"
    >
      <!-- Light mode -->
      <img src="/asquare.png" alt="Asquare Logo" class="w-12 h-12 dark:hidden">
      <!-- Dark mode -->
      <img src="/asquare_black.png" alt="Asquare Logo" class="w-12 h-12 hidden dark:block">
    </RouterLink>

    <!-- Right-side nav -->
    <nav class="right flex items-center gap-4 md:gap-6 fixed top-5 right-5 print:op0">
      <!-- Blog -->
      <RouterLink to="/posts" title="Blog" class="inline-flex items-center gap-2">
        <span class="lt-md:hidden">Blog</span>
        <div class="md:hidden" i-ri-article-line />
      </RouterLink>

      <!-- Projects -->
      <RouterLink to="/projects" title="Projects" class="inline-flex items-center gap-2">
        <span class="lt-md:hidden">Projects</span>
        <div class="md:hidden" i-ri-lightbulb-line />
      </RouterLink>

      <!-- Notes -->
      <RouterLink to="/notes" title="Notes" class="inline-flex items-center gap-2">
        <span class="lt-md:hidden">Notes</span>
        <div class="md:hidden" i-ri-sticky-note-line />
      </RouterLink>

      <!-- Socials -->
      <a
        href="https://x.com/latentth0ughts?s=11"
        target="_blank"
        rel="noopener noreferrer"
        title="Twitter"
        class="lt-md:hidden"
        aria-label="Twitter"
      >
        <div i-ri-twitter-x-line />
      </a>
      <a
        href="https://github.com/iemAnshuman"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
        class="lt-md:hidden"
        aria-label="GitHub"
      >
        <div i-uil-github-alt />
      </a>

      <!-- RSS -->
      <a
        href="/feed.xml"
        target="_blank"
        rel="noopener noreferrer"
        title="RSS"
        class="lt-md:hidden"
        aria-label="RSS"
      >
        <div i-la-rss-square style="font-size:1.25rem; margin: 0 -0.125rem;" />
      </a>

      <!-- Theme toggle -->
      <ToggleTheme />
    </nav>
  </header>
</template>
