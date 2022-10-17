<template>
  <div class="m-dropdown" :style="{
    width: width + 'px',
  }" v-click-away="closeOption">
    <div>
      <input type="text" v-model="valueText" @input="searchItem($event)" class="input__form" :readonly="readOnly"
        @click="showOption" :class="{invalidInput: !isValidate}" :title="title" />
      <div class="input_action" v-show="top" @click="showOption">
        <div class="icon icon-16 arrow_icon_dropdown" :class="{ rotate_icon: isShow }"></div>
      </div>
    </div>
    <div class="m-dropdown-menu" :class="{ showOnTop: top }" v-if="isShow">
      <div v-for="(item, index) in dataSearch" :key="index">
        <div class="menu-item" :class="{
          'item-active': itemSelect && itemSelect[fieldKey] == item[fieldKey],
        }" @click="selectItem(item)">
          {{ item[fieldName] }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MBaseControl from "../MBaseControl.vue";
import { WARNING_TXT } from "@/resources";

export default {
  extends: MBaseControl,
  name: "MDropdown",
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
    
    // this.valueText = this.findNameByKey(this.modelValue);
  },
  data() {
    return {
      itemSelect: null,
      isShow: false,

      // khi thực hiện search trong input mảng data sẽ được filter vào dataSearch
      dataSearch: [],
      valueText: null,
      title: "",
    };
  },
  watch: {
    modelValue: {
      handler() {
        this.valueText = this.findNameByKey(this.modelValue);
      },
    },

    data: {
      handler() {
        this.dataSearch = {...this.data};
        this.valueText = this.findNameByKey(this.modelValue);
      },
      immediate: true
    }
  },

  methods: {

    /**
     * hàm lọc combobox item theo input nhập vào và gán vào dataSearch
     * author: vinhkt
     * created: 21/09/2021
     * @param {val: input value} val 
     */
    searchItem(val) {
      try {
        let keySearch = val.target.value;
        this.dataSearch = this.data.filter((x) =>
          x[this.fieldName].toLowerCase().includes(keySearch.toLowerCase())
        );
        if (!keySearch || keySearch == "") {
          this.itemSelect = null;
          this.dataSearch = this.data;
        }
        this.checkInvalidInput(val);
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * gán giá trị cho input và item đã được chọn dựa trên key - id được truyền từ component cha
     * author: vinhkt
     * created: 21/09/2022
     * @param {key} key 
     */
    findNameByKey(key) {
      try {
        for (let i = 0; i < this.data.length; i++) {
          if (key === this.data[i][this.fieldKey]) {
            this.itemSelect = this.data[i];
            this.selectItem(this.itemSelect);
            return this.data[i][this.fieldName];
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * hiển thị / tắt select box on click
     * author: vinhkt
     * created: 21/09/2022
     */
    showOption() {
      this.isShow = !this.isShow;
    },

    /**
     * đóng select box và validate box
     * author: vinhkt
     * created: 21/09/2022
     */
    closeOption() {
      this.isShow = false;
      this.checkInvalidInputValue()
    },

    /**
     * chọn một item từ selectbox và validate item đó
     * author: vinhkt
     * created: 21/09/2022
     * @param {item} item 
     */
    selectItem(item) {
      try {
        this.itemSelect = item;
        this.valueText = item[this.fieldName];
        this.closeOption();
        this.$emit("update:modelValue", this.itemSelect[this.fieldKey]);
        this.checkInvalidInputValue();
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * validate giá trị input có nằm trong các giá trị được chọn hay không dựa trên event
     * author: vinhkt
     * created: 21/09/2022
     * @param {event: $event from input} event 
     */
    checkInvalidInput(event) {

      try {
        if (!this.dataSearch.length && event.type) {
          this.isValidate = false;
          this.title = WARNING_TXT.dataNotInList(this.fieldNameTxt);
          this.$emit('field-invalid', this.title)
        } else {
          this.isValidate = true;
          this.$emit('field-valid', this.title)
          this.title = "";
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * validate giá trị input có nằm trong các giá trị được chọn hay không dựa trên value
     * author: vinhkt
     * created: 21/09/2022
     */
    checkInvalidInputValue() {
      try {
        if (this.dataSearch.length === 0) {
          this.isValidate = false;
          this.title = WARNING_TXT.dataNotInList(this.fieldNameTxt);
          this.$emit('field-invalid', this.title)
        } else {
          this.isValidate = true;
          this.$emit('field-valid', this.title)
          this.title = "";
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
@import url(@/css/base/input.css);
@import url(@/css/base/combobox.css);
</style>
