<template>
  <div class="flex align-center" v-if="!this.cellData.FullName">
    <MAvatar :name="avatarName" /> <span>{{cellData.value}}</span>
  </div>
  <div class="flex align-center" v-if="cellData.FullName">
    <MAvatar :name="avatarName" :isDetailCell="true"/> 
    <div>
      <p><span>{{cellData.FullName}}</span> ({{cellData.EmployeeCode}})</p>
      <p>{{cellData.DepartmentName}}</p>
    </div>
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
    if (typeof this.cellData.FullName === 'string') {
      nameSeparateArray = this.cellData.FullName.split(" ");
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
  p {
    margin: 0;
    font-size: 14px;
    color: #212121;
  }
  p span {
    font-weight: bold;
    font-size: 14px;
    color: #212121;
  }
</style>