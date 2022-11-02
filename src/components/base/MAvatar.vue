<template>
  <div class="parent" v-if="!isDetailCell">
    <div class="child" :style="{backgroundColor:  backgroundColors[Math.floor(Math.random() * 3)]}">{{name}}</div>
  </div>
  <div class="parent--detail-cell" v-if="isDetailCell">
    <div class="child--detail-cell" :style="{backgroundColor:  backgroundColors[Math.floor(Math.random() * 3)]}">{{name}}</div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    name: {
      Type: String,
      default: ''
    },
    isDetailCell: {
      Type: Boolean,
      default: false,
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

.parent--detail-cell {
  width: 40px;
  margin-right: 8px;
}
.child--detail-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  text-transform: uppercase;
  color: #fff;
}
</style>