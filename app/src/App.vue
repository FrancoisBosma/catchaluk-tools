<script setup lang="ts">
  // https://github.com/vueuse/head
  // you can use this to manipulate the document head in any components,
  // they will be rendered correctly in the html results with vite-ssg
  useHead({
    title: 'Catchaluk-tools',
    meta: [{ name: 'description', content: 'Tools for tabletop RPG universe Catchaluk' }],
  })
</script>

<template>
  <router-view />
</template>
