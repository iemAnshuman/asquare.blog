<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const activeStyle
  = 'text-(black dark:white) font-semibold border-b-2 border-(black dark:white)'
const inactiveStyle
  = 'text-(gray-600 dark:gray-300) hover:text-(black dark:white)'

function linkClass(prefix: string) {
  // Active if the current path equals or starts with the link prefix
  return route.path === prefix || route.path.startsWith(`${prefix}/`)
    ? activeStyle
    : inactiveStyle
}
</script>

<template>
  <nav class="flex items-center gap-4 md:gap-6 border-b border-(gray-200 dark:gray-800) pb-3 mb-6">
    <!-- Keep this lean: Blog + Notes only (no Podcasts, no Streams) -->
    <RouterLink
      to="/posts"
      :class="linkClass('/posts')"
      class="!border-none"
      title="Blog"
    >
      Blog
    </RouterLink>

    <RouterLink
      to="/notes"
      :class="linkClass('/notes')"
      class="!border-none"
      title="Notes"
    >
      Notes
    </RouterLink>
  </nav>
</template>
