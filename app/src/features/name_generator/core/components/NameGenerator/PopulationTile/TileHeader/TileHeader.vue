<script setup lang="ts">
  import Popper from 'vue3-popper'

  import type { RedirectionLinks } from '@API/local_placeholder'

  defineProps<{
    isCarouselMoving: boolean
    populationName: string
    redirectionLinks: RedirectionLinks
  }>()
</script>

<template>
  <h3 class="title flex flex-auto justify-center items-center">
    <a
      v-if="typeof redirectionLinks.population === 'string'"
      :href="redirectionLinks.population"
      target="_blank"
      rel="noopener noreferrer"
      class="ext-link"
    >
      <span class="title relative">
        {{ populationName }}<uil-external-link-alt class="ext-link-icon absolute top-[-45%]" />
      </span>
    </a>
    <template v-else>
      <a :href="redirectionLinks.population[0]" target="_blank" rel="noopener noreferrer" class="ext-link">
        <span class="title relative">
          {{ populationName.split('&')[0] }}<uil-external-link-alt class="ext-link-icon absolute top-[-45%]" />
        </span>
      </a>
      <span class="title">&nbsp; et&nbsp;</span>
      <a :href="redirectionLinks.population[1]" target="_blank" rel="noopener noreferrer" class="ext-link">
        <span class="title relative">
          {{ populationName.split('&')[1] }}<uil-external-link-alt class="ext-link-icon absolute top-[-45%]" /> &nbsp;
        </span>
      </a>
    </template>
  </h3>
</template>

<style scoped>
  .title {
    font-family: 'Zacoalt', Avenir, Helvetica, Arial, sans-serif;
    font-size: 30px;
  }
</style>
