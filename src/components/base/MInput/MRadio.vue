<template>
  <div v-for="(item, index) in data" :key="index" class="mr-20">
    <input :id="item.name + item.value" type="radio" :name="item.name" :value="item.value" @input="handleInput($event)"
      v-model="selectedItem" />
    <label :for="item.name + item.value">{{ item.labelTxt }}</label>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      Type: Array,
      default: [
        {
          value: 1,
          name: "cbxRadio",
          labelTxt: "Giá trị 1",
        },
        {
          value: 2,
          name: "cbxRadio",
          labelTxt: "Giá trị 2",
        },
        {
          value: 3,
          name: "cbxRadio",
          labelTxt: "Giá trị 3",
        },
      ],
    },
    selected: String,
  },

  created() {
    this.selectedItem = this.selected;
  },
  
  data() {
    return {
      selectedItem: String,
    };
  },

  watch: {
    selectedItem: {
      handler() {
        this.selectedItem = this.selected;
      },
    }
  },
  methods: {

    /**
     * truyền dữ liệu từ trường input lên component cha để xử lý
     * author: vinhkt
     * created: 21/09/2022
     * @param {event} event 
     */
    handleInput: function (event) {
      this.$emit("update:selectedItem", parseInt(event.target.value));
    },
  },
};
</script>
