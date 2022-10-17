<template>
  <div
    class="m-dropdown"
    :style="{
      width: width + 'px',
    }"
    v-click-away="closeOption"
  >
    <div class="input_container">
      <input
        type="text"
        @focus="inputTouched"
        v-model="valueText"
        @input="searchItem($event)"
        class="input__form"
        :class="{ invalidInput: !isValidate | !isValidProp.value }"
        :title="title || isValidProp.msg"
        @keyup.up="changeSelection($event)"
        @keyup.down="changeSelection($event)"

      />
      <div class="input_action" @click="showOption">
        <div
          class="icon icon-16 arrow_icon_dropdown"
          :class="{ rotate_icon: isShow }"
        ></div>
      </div>
    </div>
    <div class="m-dropdown-menu" v-show="isShow">
      <div id="header" class="bg-gray">
        <div>Mã đơn vị</div>
        <div>Tên đơn vị</div>
      </div>

      <div v-for="(item, index) in dataSearch" :key="index">
        <div
          class="menu-item"
          :class="{
            'item-active': itemSelect && itemSelect[fieldKey] == item[fieldKey],
          }"
          @click="selectItem(item)"
        >
          <div>{{ item[fieldCode] }}</div>
          <div>{{ item[fieldName] }}</div>
        </div>
      </div>

      <div id="footer" class="bg-gray">
        <div class="icon icon-16 pen_icon"></div>
        <div>Cập nhật cơ cấu tổ chức</div>
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
    fieldCode: {
      Type: String,
      default: "Code",
    },
    fieldName: {
      Type: String,
      default: "Name",
    },
    modelValue: String,
    isRequire: {
      Type: Boolean,
      default: false,
    },
    fieldNameTxt: {
      Type: String,
      default: "",
    },
    isValidProp: {
      Type: Boolean,
      default: {
        value: true,
        msg: "",
      },
    },
  },
  created() {
    
    
  },
  data() {
    return {
      itemSelect: null,
      isShow: false,
      dataSearch: [],
      valueText: null,
      title: "",
    };
  },

  watch: {
    // gán dataSearch = data truyền vào từ prop mỗi khi có thay đổi data prop
    data: {
      handler() {
        this.dataSearch = {...this.data};
        this.valueText = this.findNameByKey(this.modelValue);
      },
      immediate: true
    },
    modelValue: {
      handler() {
        // this.valueText = this.findNameByKey(this.modelValue);
      }
    }
  },

  methods: {
    changeSelection(event) {
      this.isShow = true;
      if(event.code==="ArrowDown") {
        console.log(this.itemSelect);
        const index = this.dataSearch.findIndex(ele => {
          return ele[this.fieldKey] === this.itemSelect[this.fieldKey];
        })
        console.log(index);
      }
    },
    /**
     * tìm kiếm đơn vị theo mã và theo tên, khi kết thúc nhập nếu giá trị của ô input không
     * trùng với một trong các giá trị được chọn thì gọi sự kiện đơn vị đang để trống
     * author: vinhkt
     * created: 21/09/2022
     * @param {val: input text} val
     */
    searchItem(val) {
      try {
        this.isShow = true;
        let keySearch = val.target.value;
        this.dataSearch = this.data.filter((item) => {
          return (
            item[this.fieldName].toLowerCase().includes(keySearch.toLowerCase()) |
            item[this.fieldCode].toLowerCase().includes(keySearch.toLowerCase())
          );
        });
  
        // nếu xoá ô input thì reset lại select
        if (!keySearch || keySearch == "") {
          this.itemSelect = null;
          this.dataSearch = this.data;
        }
  
        // nếu giá trị ô input không trùng khớp với dữ liệu đã cho thì gán selected = rỗng
        let dataMatch = this.data.filter((item) => {
          return item[this.fieldName].toLowerCase() === keySearch.toLowerCase();
        });
        if (dataMatch.length === 0) {
          this.$emit("update:modelValue", "");
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
     * đánh dấu ô input là đã được focus - phục vụ việc validate
     * author: vinhkt
     * created: 21/09/2022
     */
    inputTouched() {
      if (!this.valueText) {
        this.valueText = "";
      }
    },

    /**
     * đóng select box và validate box
     * author: vinhkt
     * created: 21/09/2022
     */
    closeOption() {
      this.isShow = false;
      this.checkInvalidInputValue();
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
        this.dataSearch = { ...this.data };
        this.valueText = item[this.fieldName];
        this.isShow = false;
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
     * @param {event: $event} event
     */
    checkInvalidInput(event) {
      try {
        if (this.isRequire) {
          if (!event.target.value && event.type !== "input") {
            this.isValidate = false;
            this.title = this.fieldNameTxt + WARNING_TXT.REQUIRE;
            this.$emit("field-invalid", this.title);
          } else if (!this.dataSearch.length && event.type) {
            this.isValidate = false;
            this.title = WARNING_TXT.dataNotInList(this.fieldNameTxt);
            this.$emit("field-valid", this.fieldNameTxt + WARNING_TXT.REQUIRE);
            this.$emit("field-invalid", this.title);
          } else {
            this.isValidate = true;
            this.$emit("field-valid", this.title);
            this.title = "";
          }
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
        if (this.isRequire) {
          if (this.valueText === "") {
            this.isValidate = false;
            this.title = this.fieldNameTxt + WARNING_TXT.REQUIRE;
            this.$emit("field-invalid", this.title);
          } else if (this.dataSearch.length === 0) {
            this.isValidate = false;
            this.title = WARNING_TXT.dataNotInList(this.fieldNameTxt);
            this.$emit("field-valid", this.fieldNameTxt + WARNING_TXT.REQUIRE);
            this.$emit("field-invalid", this.title);
          } else {
            this.isValidate = true;
            this.$emit("field-valid", this.title);
            this.title = "";
          }
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
@import url(@/css/base/comboboxDepartment.css);
</style>
