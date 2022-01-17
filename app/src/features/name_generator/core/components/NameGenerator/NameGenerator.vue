<script setup lang="ts">
  import Flicking from '@egjs/vue3-flicking'
  import { Fade, Pagination } from '@egjs/flicking-plugins'
  import { UseMousePressed } from '@vueuse/components'

  import PopulationTile from './PopulationTile'

  import textBg from '@ASSETS/text_background.jpg?url'

  import findAllIndexes from '@GLOBAL/functions/strings'
  import { randomInt, range } from '@GLOBAL/functions/numbers'
  import type { Dictionary, NameList, OccurrenceTable } from '@ROOT/src/types'

  import { EMPTY_CHAR, GENDERS, PopulationBase } from '@API/local_placeholder'

  // non-reactive data
  const flickingOptions = {
    align: 'center',
    circular: true,
    deceleration: 0.01,
    easing: (x: number) => 1 - (1 - x) ** 3,
    noPanelStyleOverride: true,
  }
  const flickingPlugins = [new Fade(), new Pagination({ type: 'bullet' })]
  const textBoxBg = `url(${textBg})`
  // reactive data & computed
  const isCarouselMoving = ref(false)
  const generatedNames = ref('(Veuillez sélectionner une catégorie)')
  const nbOfwantedNames = ref(5)
  const selectedCriterium = ref({ populationName: '', critName: '', critValue: '' })
  const selectedNameBase = computed(() => {
    const output: Dictionary<NameList> = {}
    if (!selectedCriterium.value.populationName) return output
    PopulationBase[selectedCriterium.value.populationName].names.forEach((nameData) => {
      if (!Object.prototype.hasOwnProperty.call(output, nameData.gender)) output[nameData.gender] = []
      output[nameData.gender].push(nameData.name)
    })
    return output
  })
  // methods
  const doesNameRespectNomenclature = (name: string): boolean => {
    const { nomenclature } = PopulationBase[selectedCriterium.value.populationName]
    const { min: minSize, max: maxSize } = nomenclature.nameSize
    if (!(name.length >= minSize && name.length <= maxSize)) {
      return false
    }
    const areSpecialCharsRulesRespected = Object.entries(nomenclature.specialChars).every(([spChar, rules]) => {
      const spCharOccurrences = findAllIndexes(name, spChar)
      const spCharAmount =
        spCharOccurrences.length -
        spCharOccurrences.reduce((acc: number, curr: number) => acc + Number(rules.isException(name, curr)), 0)
      if (spCharAmount > rules.maxAllowed) return false
      const spCharsAreIllPlaced = spCharOccurrences.some(
        (index: number) => index < rules.minDistFromEdges - 1 || index > name.length - rules.minDistFromEdges
      )
      if (spCharsAreIllPlaced) return false
      return true
    })
    if (!areSpecialCharsRulesRespected) return false
    return true
  }
  const generateCharOccurrenceTable = (nameList: NameList): OccurrenceTable => {
    const output: OccurrenceTable = {}
    nameList.forEach((name) => {
      range(name.length, -1).forEach((index) => {
        const currChar = name[index] ?? EMPTY_CHAR
        const prevChar = name[index - 1] ?? EMPTY_CHAR
        const nextChar = name[index + 1] ?? EMPTY_CHAR
        const prevTwoChars = [prevChar, currChar].toString()
        if (!Object.prototype.hasOwnProperty.call(output, prevTwoChars)) {
          output[prevTwoChars] = {}
        }
        const nextCharTable = output[prevTwoChars]
        const nextCharCurrentCount = nextCharTable[nextChar] ?? 0
        nextCharTable[nextChar] = nextCharCurrentCount + 1
      })
    })
    return output
  }
  const getRandomNamesFromCharOccurrences = (occurrenceTable: OccurrenceTable, nbWanted: number): NameList => {
    const output: NameList = []
    if (!Object.keys(occurrenceTable).length) return output
    const generateNewName = (occTable: OccurrenceTable, legacyGeneratedNames: NameList): string => {
      let outputName = EMPTY_CHAR
      let charToAdd = EMPTY_CHAR
      let generationWasReset = false
      do {
        generationWasReset = false
        const prevPrevChar = outputName.slice(-2, -1) ?? EMPTY_CHAR
        const prevChar = outputName.slice(-1) ?? EMPTY_CHAR
        const nextCharTable: Dictionary<number> = occTable[[prevPrevChar, prevChar].toString()]
        const nbOfNextCharOccurrences = Object.values(nextCharTable).reduce((acc, curr) => acc + curr, 0)
        let randomIndex = Math.random() * 100 // float within [0; 100[
        Object.entries(nextCharTable).some(([char, occurrenceNb]) => {
          const charFrequency = (occurrenceNb / nbOfNextCharOccurrences) * 100
          if (randomIndex >= charFrequency) {
            randomIndex -= charFrequency
            return false
          }
          charToAdd = char
          return true
        })
        outputName += charToAdd
        if (
          charToAdd === EMPTY_CHAR &&
          (!doesNameRespectNomenclature(outputName) || legacyGeneratedNames.includes(outputName))
        ) {
          outputName = ''
          generationWasReset = true
        }
      } while (charToAdd !== EMPTY_CHAR || generationWasReset)
      return outputName
    }
    range(nbWanted).forEach(() => output.push(generateNewName(occurrenceTable, output)))
    return output
  }
  const getRandomPopulationGenderName = (): string => {
    const genderNameList = PopulationBase[selectedCriterium.value.populationName].criteria.gender
    return genderNameList[randomInt(genderNameList.length)]
  }
  const generateRawNames = (): NameList => {
    const { populationName, critName, critValue } = selectedCriterium.value
    const randomGenderName = getRandomPopulationGenderName()
    const genderSelection = critName === 'gender' ? critValue : randomGenderName
    const selectedNames = PopulationBase[populationName].names.reduce((acc: NameList, curr) => {
      if (curr.gender === GENDERS[genderSelection]) {
        acc.push(curr.name)
      }
      return acc
    }, [])
    const charOccurrenceTable = generateCharOccurrenceTable(selectedNames)
    return getRandomNamesFromCharOccurrences(charOccurrenceTable, nbOfwantedNames.value)
  }
  const postEditing = (nameList: NameList): NameList => {
    const { populationName, critName, critValue } = selectedCriterium.value
    if (critName === 'agglomeration') {
      const output: NameList = []
      const nameEditor = PopulationBase[populationName].agglomerationTemplates[critValue]
      nameList.forEach((name, index) => (output[index] = nameEditor(name)))
      return output
    }
    if (populationName === 'Atlec') {
      const output: NameList = []
      const familyNames = generateRawNames()
      nameList.forEach((name, index, arr) => (output[index] = `${arr[index]} ${familyNames[index]}`))
      return output
    }
    return nameList
  }
  const generateNames = (): void => {
    const rawGeneratedNames = generateRawNames()
    const generatedNameList = postEditing(rawGeneratedNames)
    generatedNames.value = generatedNameList.length
      ? generatedNameList.reduce((acc, curr) => `${acc}\n${curr}`)
      : 'No data available\nfor this selection :/'
  }
  const handleTileButtonClick = (populationName: string, critName: string, critValue: string): void => {
    selectedCriterium.value = { populationName, critName, critValue }
    generateNames()
  }
</script>

<template>
  <h2 w:m="b-4" w:font="sans">Générateur de noms</h2>
  <h3 w:m="b-4">Générez aléatoirement 5 noms de personnages ou d'agglomérations</h3>
  <p w:p="b-4">Choisissez un peuple, puis cliquez sur le type de nom à générer</p>
  <UseMousePressed v-slot="{ pressed }" w:position="relative">
    <Flicking
      w:p="b-14"
      :options="flickingOptions"
      :plugins="flickingPlugins"
      :style="{ cursor: pressed ? 'grabbing' : 'grab' }"
      @move-start="() => (isCarouselMoving = true)"
      @move-end="() => (isCarouselMoving = false)"
    >
      <PopulationTile
        v-for="([popName, popData], index) in Object.entries(PopulationBase)"
        :key="index"
        :population-name="popName"
        :population-data="popData"
        :generation-trigger-callback="handleTileButtonClick"
        :is-carousel-moving="isCarouselMoving"
      />
      <template #viewport>
        <div class="flicking-pagination bottom-0"></div>
      </template>
    </Flicking>
    <div v-show="!isCarouselMoving" w:w="full" w:position="absolute" w:bottom="[calc(50%+10px)]">
      <fa-solid-less-than w:text="25px" w:position="relative" w:right="107px sm:210px" />
      <fa-solid-less-than w:text="25px" w:position="relative" w:left="107px sm:210px" w:transform="~ rotate-180" />
    </div>
    <whh-handswipe w:text="25px" w:position="absolute" w:left="[calc(50%-15px)]" w:bottom="4" />
  </UseMousePressed>
  <h3 w:m="t-10 b-4">Noms aléatoirement générés</h3>
  <div w:flex="~" w:justify="center">
    <div class="generated-names">
      <pre w:whitespace="pre-wrap">{{ generatedNames }}</pre>
    </div>
  </div>
  <template v-if="selectedCriterium.populationName">
    <h3 w:p="y-4">
      Base de noms utilisée :
      <span class="font-zacoalt underline decoration-dashed">{{ selectedCriterium.populationName }}</span>
    </h3>
    <div w:gap="20px" w:m="x-[5%]" w:justify="center" w:flex="~ wrap" w:children="max-w-[386px] p-4">
      <div
        v-for="([gender, genderedNameList], index) in Object.entries(selectedNameBase)"
        :key="index"
        class="text-box"
        :style="{ backgroundImage: textBoxBg }"
      >
        <p w:p="b-4">{{ gender }}</p>
        <em w:text="[15px]" w:font="sans">{{ genderedNameList.join(', ') }}</em>
      </div>
    </div>
  </template>
</template>

<style>
  @import '@egjs/vue3-flicking/dist/flicking.css';
  @import '@egjs/flicking-plugins/dist/flicking-plugins.css';

  /* Imported from 'flicking' component's css (cf. index.html link tag)
   * N.B: this one has to be declared before
  */
  .flicking-pagination-bullet-active {
    background-color: var(--red);
  }
</style>

<style lang="postcss" scoped>
  /* Imported from 'flicking' component's css */
  .flicking-viewport {
    overflow-x: clip;
    overflow-y: visible;
  }
  .flicking-pagination {
    z-index: 0;
  }
  .generated-names {
    @apply text-box;
    @apply children:(font-zacoalt) flex flex-col justify-center h-min-[240px];
    font-size: x-large;
    background-image: v-bind('textBoxBg');
    width: min(90%, 386px);
    @screen sm {
      font-size: xx-large;
      width: max(386px, 50%);
    }
  }
</style>
