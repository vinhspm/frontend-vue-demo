<template>
  <div class="m-dropdown">
    <DxSelectBox :data-source="data" :value="data[0][fieldKey]" :display-expr="fieldName" :value-expr="fieldKey" />
  </div>
</template>
<script>

export default {
  name: "MCombobox",
  props: {
    width: {
      Type: [Number, String],
      default: 421,
    },
    data: {
      Type: Array,
      default: [],
    },
    fieldKey: {
      Type: String,
      default: "ID",
    },
    fieldName: {
      Type: String,
      default: "Name",
    },
    readOnly: {
      Type: Boolean,
      default: false,
    },

    // cài đặt vị trí xuất hiện của dropdown menu
    top: {
      Type: Boolean,
      default: false,
    },
    fieldNameTxt: {
      Type: String,
      default: ''
    },

    modelValue: String,
  },
  created() {

  },
  data() {
    return {

    };
  },

  methods: {},
};
</script>
<style scoped>
@import url(@/css/base/input.css);
@import url(@/css/base/combobox.css);
</style>
