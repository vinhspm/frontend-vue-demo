<template>
  <the-header></the-header>
  <div class="main">
    <the-content></the-content>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheContent from "./components/layout/TheContent.vue";
export default {
  name: "App",
  components: {
    TheHeader,
    TheContent,
  },
};
</script>

<style>
@import url(./css/main.css);
</style>