<template>
  <div class="menu">
    <router-link v-for="(item, index) in menuItems" :key="index" :to="item.route" class="menu__item"
    v-slot="{ isActive }">
      <div class="menu__icon icon icon-24 sprite_icon" :style="{
        'background-position':(-item.iconCoordinates[0])+'px' + ' ' + (-item.iconCoordinates[1])+'px'
      }" :class="[isActive && `${getActiveClass(item)}`]"></div>
      <div class="menu__text">{{ item.text }}</div>
    </router-link>

  </div>
</template>
<script>
import { MENU_ITEMS } from "../../resources.js";
export default {
  data() {
    return {
      menuItems: [],
    };
  },
  created() {
    this.menuItems = MENU_ITEMS;
  },
  methods: {
    getActiveClass(item) {
      return item.activeClass;
    }
  }
};
</script>
<style scoped>
@import url(../../css/layout/menu.css);
</style>
