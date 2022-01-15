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
  <div w:position="relative" class="flex flex-auto justify-center items-center">
    <h3>
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
    <div v-if="redirectionLinks.info" class="absolute top-0 right-0">
      <Popper placement="top" arrow class="absolute top-[22px] right-0">
        <span w:cursor="pointer">
          <fluent-question-48-filled
            w:bg="[aliceblue]"
            w:border="2 [var(--red)] rounded-full"
            w:p="[2px]"
            w:text="xl"
            style="box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5)"
          />
        </span>
      </Popper>
    </div>
  </div>
</template>

<style scoped>
  .title {
    font-family: 'Zacoalt', Avenir, Helvetica, Arial, sans-serif;
    font-size: 30px;
  }
</style>
