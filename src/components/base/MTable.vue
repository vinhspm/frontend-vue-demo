<template>
  <div class="table__content_body">
    <DxDataGrid id="dataGrid" :data-source="dataSource" key-expr="OverTimeId" :column-width="100" 
      :hover-state-enabled="true" @row-click="detailRequest" no-data-text='Không có dữ liệu!' v-model:selected-row-keys="selectedRowKeys">
      <DxEditing :allow-updating="true" :allow-deleting="true" />
      <DxScrolling column-rendering-mode="virtual" />
      <DxPaging :enabled="false" />
      <DxColumnFixing :enabled="true" />
      <DxSelection select-all-mode="true" show-check-boxes-mode="always" mode="multiple" />
      <DxLoadPanel :enabled="true" text="" />
      <DxColumn v-for="(col, index) in listHeaders" :data-field="col.dataField" :caption="col.caption"
        :width="col.width" header-cell-template="cell-header" :data-type="col.dataType ? col.dataType : ''"
        :format="col.format ? col.format : ''" :alignment="col.alignment ? col.alignment : ''"
        :fixed="isColumnPinArray[index]" :cell-template="col.cellTemplate?col.cellTemplate: ''" />
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
      <template #cell-avatar-name="{data}">
        <NameCell :cell-data="data" />
      </template>
      <template #cell-department-name="{data}">
        {{getDepartmentName(data)}}
      </template>
      <template #cell-position-name="{data}">
        {{getPositionName(data)}}
      </template>
      <template #cell-overtimeworkshift-name="{data}">
        {{getOverTimeWorkShiftName(data)}}
      </template>
      <template #cell-workingshift-name="{data}">
        {{getWorkingShiftName(data)}}
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
import { getDepartments } from "../../assets/axios/departmentController/departmentController.js";
import { getPositions } from "../../assets/axios/positionController/positionController.js";
import { NUM_PIN_COLUMNS, DETAIL_VIEW_TYPE, WORK_TIME } from "../../enum.js";
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
    selectedRowKeysProp:{
      type: Array,
      default: []
    }
  },
  data() {
    return {
      isColumnPinArray: [],
      listHeaders: [],
      isShowPinIcon: [],
      departments: [],
      positions: [],
      workShifts: WORK_TIME,
      selectedRowKeys: []
    };
  },
  created() {
    this.isColumnPinArray = new Array(NUM_PIN_COLUMNS).fill(false);
    this.listHeaders = lodash.cloneDeep(REQUEST_LIST_HEADER);
    this.isShowPinIcon = new Array(NUM_PIN_COLUMNS).fill(false);
    this.getDepartmentAndPositionData();
  },

  watch: {
    "selectedRowKeys.length": {
      handler() {
        this.$emit('update:selectedRowKeys', this.selectedRowKeys);
      }
    },
    "selectedRowKeysProp.length": {
      handler() {
        this.selectedRowKeys = this.selectedRowKeysProp;
      },
      immediate: true,
    }
  },

  methods: {
    getDepartmentName(data) {
      const department = this.departments.find(e => {
        return e.DepartmentId === data.value
      })
      if (department) {
        return department.DepartmentName;
      }
      return null;
    },
    getPositionName(data) {
      const position = this.positions.find(e => {
        return e.PositionId === data.value
      })
      if (position) {
        return position.PositionName;
      }
      else return null;
    },
    getOverTimeWorkShiftName(data) {
      const workShift = this.workShifts.find(e => {
        return e.value === data.value
      })
      if (workShift) {
        return workShift.txt;
      }
      else return null;
    },
    getWorkingShiftName(data) {
      if(data.value) {
        return "Ca chấm 1 lần";
      }
      return null;
    },
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
    editRequest(event) {
      this.$emit('toggle-dialog', { type: DETAIL_VIEW_TYPE.EDIT, selectedRequestId: event.row.key })

    },
    deleteRequest(event) {
      this.$emit('delete-request', event.row.key)
    },
    detailRequest(event) {
      this.$emit('toggle-dialog', { type: DETAIL_VIEW_TYPE.DETAIL, selectedRequestId: event.key })
    },
    /**
 * lấy dữ liệu đầu vào cho combobox vị trí và đơn vị
 */
    async getDepartmentAndPositionData() {
      try {
        const departmentResponse = await getDepartments();
        const positionResponse = await getPositions();
        if (departmentResponse) {
          this.departments = departmentResponse.data;
          this.$emit('update:departments', this.departments)
        }
        if (positionResponse) {
          this.positions = positionResponse.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
@import url(../../css/page/requestlist.css);
</style>
