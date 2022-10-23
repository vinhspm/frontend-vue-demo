<template>
  <div class="parent">
    <div class="child" :style="{backgroundColor:  backgroundColors[Math.floor(Math.random() * 3)]}">{{name}}</div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    name: {
      Type: String,
      default: ''
    }
  },
  data() {
    return {
      backgroundColors: ['#ec5504', '#a3cf30', '#aa62e2']
    };
  },
  created() { },
  methods: {},
  mounted() { },
};
</script>
<style scoped>

</style>
<style lang='css' scoped>
.parent {
  width: 34px;
}
.child {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  text-transform: uppercase;
  color: #fff;
}
</style>