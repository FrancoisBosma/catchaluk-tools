<script setup lang="ts">
  import smallBg from '@ASSETS/background_small_screens.jpg?url'
  import largeBg from '@ASSETS/background_large_screens.png?url'
  const urls = {
    small: `url(${smallBg})`,
    large: `url(${largeBg})`,
  }
</script>

<template>
  <main w:bg="100%" w:h="min-full" w:p="sm:(x-[6.9vw])" w:text="center">
    <router-view />
  </main>
  <Footer />
</template>

<style scoped>
  main {
    background-image: v-bind('urls.small');
    @screen sm {
      background-image: v-bind('urls.large');
    }
  }
</style>
