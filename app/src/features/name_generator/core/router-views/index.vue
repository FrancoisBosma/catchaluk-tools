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
  <section w:m="x-[2vw]" w:p="b-4" w:border="b current">
    <introduction />
  </section>
  <section>
    <name-generator />
  </section>
</template>
