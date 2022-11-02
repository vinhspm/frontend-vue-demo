<template>
  <div class="table__content_body">
    <DxDataGrid id="dataGrid" :data-source="dataSource" key-expr="OverTimeId" :column-width="100"
      :hover-state-enabled="true" @row-click="detailRequest" no-data-text='Không có dữ liệu!'
      v-model:selected-row-keys="selectedRowKeys">
      <DxEditing :allow-updating="true" :allow-deleting="true" />
      <DxScrolling column-rendering-mode="virtual" />
      <DxPaging :enabled="false" />
      <DxColumnFixing :enabled="true" />
      <DxSelection select-all-mode="true" show-check-boxes-mode="always" mode="multiple" />
      <DxLoadPanel :enabled="true" text="" />
      <DxColumn v-for="(col, index) in listHeaders" :data-field="col.dataField" :caption="col.caption"
        :width="col.width" header-cell-template="cell-header" :data-type="col.dataType ? col.dataType : ''"
        :format="col.format ? col.format : ''" :alignment="col.alignment ? col.alignment : ''"
        :fixed="isColumnPinArray[index]" :cell-template="col.cellTemplate ? col.cellTemplate : ''" />
      <DxColumn :width="110" data-field="Status" caption="Trạng thái" cell-template="status-cell-template"
        alignment="left" />
      <DxColumn type="buttons" :width="100" caption="">
        <DxButton id="edit-button" icon="edit" @click="editRequest" css-class="command-button" :fixed="true"
          fixed-position="right" hint="Sửa" />
        <DxButton id="delete-button" icon="trash" @click="deleteRequest" css-class="command-button" hint="Xoá" />
      </DxColumn>
      <template #cell-header="{ data }">
        <HeaderCell :cell-data="data" @pin-column="pinColumn" :is-pin-props="getPinProps(data)" />
      </template>
      <template #status-cell-template="{ data }">
        <StatusCell :cell-data="data" />
      </template>
      <template #cell-avatar-name="{ data }">
        <NameCell :cell-data="data" />
      </template>
      <template #cell-overtimeworkshift-name="{ data }">
        {{ getOverTimeWorkShiftName(data) }}
      </template>
      <template #cell-workingshift-name="{ data }">
        {{ getWorkingShiftName(data) }}
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
  DxButton,
  DxEditing,
  DxLoadPanel
} from "devextreme-vue/data-grid";
import Tooltip from "devextreme/ui/tooltip"
import StatusCell from "./StatusCell.vue";
import HeaderCell from "./HeaderCell.vue";
import NameCell from "./NameCell.vue";
import { NUM_PIN_COLUMNS, DETAIL_VIEW_TYPE, WORK_TIME } from "../../enum.js";
import { REQUEST_LIST_HEADER } from "../../resources.js";
import lodash from "lodash";
export default {
  
  /**
   * khởi tạo giá trị ban đầu cho bảng
   */
  created() {
    this.isColumnPinArray = new Array(NUM_PIN_COLUMNS).fill(false);
    this.isShowPinIcon = new Array(NUM_PIN_COLUMNS).fill(false);
  },

  watch: {
    /**
     * kích hoạt sự kiệN update những hàng được chọn khi có thay đổi
     * author: vinhkt
     * created: 01/11/2022
     */
    selectedRowKeys: {
      handler(newVal, oldVal) {
        
        // console.log(oldVal);
        // console.log(newVal);
        if (newVal.length < oldVal.length) {
          const index = this.listRowKeys.findIndex(ele => ele === oldVal[0])
          if (index === -1) {
            return;
          }

          const unCheckedRows = oldVal.filter(ele => {
            return !newVal.includes(ele)
          })
          const emitObj = {
            data: unCheckedRows,
            clear: true
          }
          this.$emit('update:selectedRowKeys', emitObj);
        } else {
          this.$emit('update:selectedRowKeys', this.selectedRowKeys);
        }
      },
      deep: true,
      // immediate: true
    },

    /**
     * xoá các hàng được chọn khi được truyền vào từ cha
     * author: vinhkt
     * created: 01/11/2022
     */
    selectedRowKeysProp: {
      handler() {
        if (this.selectedRowKeysProp.length === 0) {
          this.selectedRowKeys = [];
        }
      },
      immediate: true,
      deep: true
    },

    /**
     * cập nhật hàng được chọn khi có sự thay đổi trang
     * author: vinhkt
     * created: 01/11/2022
     */
    dataSource: {
      handler() {
        this.listRowKeys = this.dataSource.map(ele => {
          return ele.OverTimeId;
        })
        if (this.selectedRowKeysProp) {
          this.selectedRowKeysProp.forEach(ele => {
            if (this.listRowKeys.includes(ele))
              this.selectedRowKeys.push(ele);
          })
        }
      },
      deep: true,
      immmediate: true
    }
  },

  methods: {

    /**
     * cập nhật hàng được chọn khi có sự thay đổi trang
     * author: vinhkt
     * created: 01/11/2022
     */
    getOverTimeWorkShiftName(data) {
      const workShift = this.workShifts.find(e => {
        return e.value === data.value
      })
      if (workShift) {
        return workShift.txt;
      }
      else return null;
    },

    /**
     * bind ca làm việc theo value
     * author: vinhkt
     * created: 01/11/2022
     */
    getWorkingShiftName(data) {
      if (data.value) {
        return "Ca chấm 1 lần";
      }
      return null;
    },

    /**
     * pin cột
     * author: vinhkt
     * created: 01/11/2022
     */
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

    /**
     * cập nhật hàng được chọn khi có sự thay đổi trang
     * author: vinhkt
     * created: 01/11/2022
     */
    getPinProps(data) {
      const idx = this.listHeaders.findIndex(
        (ele) => ele.dataField === data.column.dataField
      );
      if (this.isShowPinIcon[idx] === true) {
        return true;
      } else return false;
    },

    /**
     * kích hoạt sự kiện edit bản ghi
     * author: vinhkt
     * created: 01/11/2022
     */
    editRequest(event) {
      this.$emit('toggle-dialog', { type: DETAIL_VIEW_TYPE.EDIT, selectedRequestId: event.row.key })

    },

    /**
     * kích hoạt sự kiện xoá bản ghi
     * author: vinhkt
     * created: 01/11/2022
     */
    deleteRequest(event) {
      this.$emit('delete-request', event.row.key)
    },

    /**
     * kích hoạt sự kiện xem bản ghi
     * author: vinhkt
     * created: 01/11/2022
     */
    detailRequest(event) {
      this.$emit('toggle-dialog', { type: DETAIL_VIEW_TYPE.DETAIL, selectedRequestId: event.key })
    },
  },
  components: {
    DxDataGrid,
    DxScrolling,
    DxPaging,
    DxColumn,
    DxSelection,
    DxColumnFixing,
    DxButton,
    DxEditing,
    DxLoadPanel,
    Tooltip,
    StatusCell,
    HeaderCell,
    NameCell
  },
  props: {
    dataSource: {
      type: Object,
      default: [],
    },
    selectedRowKeysProp: {
      type: Array,
      default: []
    },
    listHeaders: {
      Type: Array,
      default: []
    }
  },
  data() {
    return {
      isColumnPinArray: [],
      isShowPinIcon: [],
      workShifts: WORK_TIME,
      selectedRowKeys: [],
      listRowKeys: [],
    };
  },


};
</script>
<style scoped>
@import url(../../css/page/requestlist.css);
</style>
