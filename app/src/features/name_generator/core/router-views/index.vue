<route lang="yaml">
meta:
  public: true
  layout: DefaultLayout
</route>

<script setup lang="ts">
  import Introduction from '../components/Introduction'
  import NameGenerator from '../components/NameGenerator'
</script>

<template>
  <section w:m="x-[2vw]" w:p="y-8" w:border="b current">
    <Introduction />
  </section>
  <section w:p="y-8">
    <NameGenerator />
  </section>
</template>
