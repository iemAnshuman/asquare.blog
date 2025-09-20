---
title: Blog
art: plum
display: ''
---

<SubNav />

<RouterView v-slot="{ Component }">
  <component :is="Component" v-if="Component" />
  <ListPosts v-else type="post" />
</RouterView>
