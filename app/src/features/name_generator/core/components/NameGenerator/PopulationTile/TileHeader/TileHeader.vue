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
          {{ populationName }}<uil-external-link-alt class="ext-link-icon absolute top-[-35%]" />
        </span>
      </a>
      <template v-else>
        <a :href="redirectionLinks.population[0]" target="_blank" rel="noopener noreferrer" class="ext-link">
          <span class="title relative">
            {{ populationName.split('&')[0] }}<uil-external-link-alt class="ext-link-icon absolute top-[-35%]" />
          </span>
        </a>
        <span class="title">&nbsp; et&nbsp;</span>
        <a :href="redirectionLinks.population[1]" target="_blank" rel="noopener noreferrer" class="ext-link">
          <span class="title relative">
            {{ populationName.split('&')[1] }}<uil-external-link-alt class="ext-link-icon absolute top-[-35%]" /> &nbsp;
          </span>
        </a>
      </template>
    </h3>
    <div v-if="redirectionLinks.info" class="absolute top-0 right-0">
      <Popper placement="top" arrow class="absolute top-[22px] right-0">
        <span w:cursor="pointer">
          <fluent-question-48-filled
            w:bg="[white]"
            w:border="2 [var(--red)] rounded-full"
            w:p="[1px]"
            w:text="xl"
            class="info-icon"
          />
        </span>
        <template #content>
          <div w:w="max max-[20vw]" w:text="left" w:font="all:sans">
            <span v-if="populationName === 'Atlec'">
              Les atlecs sont le seul peuple à faire une usage courant du noms de famille
            </span>
            <span v-else-if="populationName === 'Cutchakan&Iktomi'">
              Bien qu’ayant une culture partiellement différents les Cutchakans et Iktomis utilisent généralement des
              noms similaires ou proches. Le « ‘ » dans le nom sert généralement à marquer une pause strict dans la
              prononciation
            </span>
            <span v-else-if="populationName === 'Oxotlli'">
              Ces noms concernent l’Oxotlli traditionnel. Si cette langue est rarement utilisé dans la pratique courante
              la norme est de l’utiliser pour donner les noms. Assez complexe la langue fait appel à des clics qui en
              phonétique se prononcent
              <a
                href="https://upload.wikimedia.org/wikipedia/commons/5/57/Clic_dental_sourd.ogg"
                target="_blank"
                rel="noopener noreferrer"
                :style="{ color: '#d41413', borderBottom: '1px dashed white' }"
                >[ǀ]</a
              >
              pour le « t’ » et
              <a
                href="https://upload.wikimedia.org/wikipedia/commons/6/67/Clic_lateral_sourd.ogg"
                target="_blank"
                rel="noopener noreferrer"
                :style="{ color: '#d41413', borderBottom: '1px dashed white' }"
                >[ǃ]</a
              >
              pour le « k ». Si une voyelle est doublé cela signifie qu’il faut la prononcer comme une voyelle longue
            </span>
            <span v-else-if="populationName === 'Tucoya'">
              Les Tucoyas sont le seul peuple dont tous les noms sont neutres
            </span>
          </div>
        </template>
      </Popper>
    </div>
  </div>
</template>

<style scoped>
  .title {
    @apply font-zacoalt;
    font-size: 30px;
  }
  .info-icon {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }
  .info-icon:hover,
  .info-icon:active {
    @apply duration-100;
    transform: rotate(45deg);
  }
</style>
<style>
  :root {
    --popper-theme-background-color: var(--foreground);
    --popper-theme-background-color-hover: var(--foreground);
    --popper-theme-text-color: aliceblue;
    --popper-theme-border-width: 0px;
    --popper-theme-border-style: solid;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 32px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
  }
</style>
