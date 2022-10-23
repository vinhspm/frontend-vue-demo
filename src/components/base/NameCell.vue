<template>
  <div class="flex align-center">
    <MAvatar :name="avatarName" /> <span>{{(typeof this.cellData === 'string') ? cellData : cellData.value}}</span>
  </div>
</template>
<script>
import MAvatar from './MAvatar.vue'
export default {
  components: {
    MAvatar,
  },
  created() {
    let nameSeparateArray;
    if (typeof this.cellData === 'string') {
      nameSeparateArray = this.cellData.split(" ");
    } else {
      nameSeparateArray = this.cellData.value.split(" ");
    }
    this.avatarName = (nameSeparateArray[0][0] + nameSeparateArray[2][0]);
  },
  props: {
    cellData: Object
  },
  methods: {


  },
  data() {
    return {
      avatarName: "",
    }
  }
};
</script>
<style>

</style>