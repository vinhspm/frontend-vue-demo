<template>
  <div class="table__content_body">
    <DxDataGrid
      id="dataGrid"
      :data-source="dataSource"
      key-expr="OverTimeID"
      :column-width="100"
      :hover-state-enabled="true"
    >
      <DxScrolling column-rendering-mode="virtual" />
      <DxPaging :enabled="false" />
      <DxColumnFixing :enabled="true" />
      <DxSelection
        select-all-mode="true"
        show-check-boxes-mode="always"
        mode="multiple"
      />

      <DxColumn
        v-for="(col, index) in listHeaders"
        :data-field="col.dataField"
        :caption="col.caption"
        :width="col.width"
        header-cell-template="cell-header"
        :data-type="col.dataType ? col.dataType : ''"
        :format="col.format ? col.format : ''"
        :alignment="col.alignment ? col.alignment : ''"
        :fixed="isColumnPinArray[index]"
      />
      <DxColumn
        :width="110"
        data-field="Status"
        caption="Trạng thái"
        cell-template="status-cell-template"
        alignment="left"
      />
      <DxColumn :width="110" />
      <template #cell-header="{ data }">
        <HeaderCell
          :cell-data="data"
          @pin-column="pinColumn"
          :is-pin-props="getPinProps(data)"
        />
      </template>
      <template #status-cell-template="{ data }">
        <StatusCell :cell-data="data" />
      </template>
    </DxDataGrid>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxScrolling,
  DxColumn,
  DxPaging,
  DxSelection,
  DxColumnFixing,
} from "devextreme-vue/data-grid";
import StatusCell from "./StatusCell.vue";
import HeaderCell from "./HeaderCell.vue";
import { NUM_PIN_COLUMNS } from "../../enum.js";
import { REQUEST_LIST_HEADER } from "../../resources.js";
import lodash from "lodash";
export default {
  components: {
    DxDataGrid,
    DxScrolling,
    DxPaging,
    DxColumn,
    DxSelection,
    DxColumnFixing,
    StatusCell,
    HeaderCell,
  },
  props: {
    dataSource: {
      type: Object,
      default: [],
    },
  },
  data() {
    return {
      isColumnPinArray: [],
      listHeaders: [],
      isShowPinIcon: [],
    };
  },
  created() {
    this.isColumnPinArray = new Array(NUM_PIN_COLUMNS).fill(false);
    this.listHeaders = lodash.cloneDeep(REQUEST_LIST_HEADER);
    this.isShowPinIcon = new Array(NUM_PIN_COLUMNS).fill(false);
  },

  watch: {

  },

  methods: {
    pinColumn(pinColumnObj) {
      if (pinColumnObj.showPin) {
        // console.log(index);
        this.isColumnPinArray.forEach((ele, index) => {
          if (index <= pinColumnObj.index) {
            this.isColumnPinArray[index] = true;
          } else {
            this.isColumnPinArray[index] = false;
          }
        });

        const lastIndex = this.isColumnPinArray.findIndex(
          (ele, index) => ele === true && !this.isColumnPinArray[index + 1]
        );
        this.isShowPinIcon = new Array(NUM_PIN_COLUMNS).fill(false);
        this.isShowPinIcon[lastIndex] = true;
      } else {
        this.isColumnPinArray = new Array(NUM_PIN_COLUMNS).fill(false);
        this.isShowPinIcon = new Array(NUM_PIN_COLUMNS).fill(false);
      }
    },
    getPinProps(data) {
      const idx = this.listHeaders.findIndex(
        (ele) => ele.dataField === data.column.dataField
      );
      if (this.isShowPinIcon[idx] === true) {
        return true;
      } else return false;
    },
  },
};
</script>
<style scoped>
@import url(../../css/page/requestlist.css);
</style>
