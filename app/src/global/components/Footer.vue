<template>
  <footer w:p="8" w:text="[#eee]" w:flex="~ col" w:align="items-center" w:gap="2">
    <div class="grid grid-rows-1 grid-cols-[1fr,auto,1fr] gap-1">
      <span w:text="right">Implemented with</span>
      <span><ion-md-heart class="icon" /></span>
      <span>by Francois Bosma</span>
    </div>
    <div class="grid grid-rows-1 grid-cols-[1fr,auto,1fr] gap-3 w-max text-center">
      <a href="" target="_blank" rel="noopener noreferrer" w:animate="bounce">
        <fontelico-emo-sunglasses class="icon-btn" />
      </a>
      <a href="https://github.com/FrancoisBosma" target="_blank" rel="noopener noreferrer" w:animate="bounce delay-75">
        <zmdi-github-alt class="icon-btn" />
      </a>
      <a
        href="https://linkedin.com/in/francois-bosma-1051849b/"
        target="_blank"
        rel="noopener noreferrer"
        w:animate="bounce delay-150"
      >
        <fontisto-linkedin class="icon-btn" />
      </a>
    </div>
  </footer>
</template>

<style>
  footer * {
    font-family: 'Alliance No.1', sans-serif;
  }
</style>
