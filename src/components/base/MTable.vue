<template>
  <div class="table__content_body">
    <DxDataGrid id="dataGrid" :data-source="dataSource" key-expr="OverTimeID" :column-width="100"
      :hover-state-enabled="true">
      <DxScrolling column-rendering-mode="virtual" />
      <DxPaging :enabled="false" />
      <DxColumnFixing :enabled="true" />
      <DxSelection select-all-mode="true" show-check-boxes-mode="always" mode="multiple" />
      <DxColumn :width="150" data-field="EmployeeCode" caption="Mã nhân viên" header-cell-template="cell-header" />
      <DxColumn :width="220" data-field="FullName" caption="Người nộp đơn" header-cell-template="cell-header"/>
      <DxColumn :width="150" data-field="JobPositionName" caption="Vị trí công việc" header-cell-template="cell-header"/>
      <DxColumn :width="150" data-field="OrganizationUnitName" caption="Đơn vị công tác" header-cell-template="cell-header"/>
      <DxColumn :width="150" data-field="ApplyDate" caption="Ngày nộp đơn" data-type="datetime"
        format="dd/MM/yyyy HH:mm" alignment="center" header-cell-template="cell-header"/>
      <DxColumn :width="150" data-field="FromDate" caption="Làm thêm từ" data-type="datetime" format="dd/MM/yyyy HH:mm"
        alignment="center" header-cell-template="cell-header"/>
      <DxColumn :width="150" data-field="ToDate" caption="Làm thêm đến" data-type="datetime" format="dd/MM/yyyy HH:mm"
        alignment="center" header-cell-template="cell-header"/>
      <DxColumn :width="120" data-field="OverTimeInWorkingShiftName" caption="Thời điểm làm thêm" header-cell-template="cell-header"/>
      <DxColumn :width="150" data-field="WorkingShiftName" caption="Ca làm thêm" header-cell-template="cell-header"/>
      <DxColumn :width="220" data-field="Reason" caption="Lý do làm thêm" header-cell-template="cell-header"/>
      <DxColumn :width="150" data-field="ApprovalName" caption="Người duyệt" header-cell-template="cell-header"/>
      <DxColumn :width="220" data-field="Description" caption="Ghi chú" header-cell-template="cell-header"/>
      <DxColumn :width="110" data-field="Status" caption="Trạng thái" cell-template="status-cell-template" alignment="left"/>
      <DxColumn :width="110" />
      <template #cell-header="{ data }">
            <HeaderCell :cell-data="data"/>
        </template>
      <template #status-cell-template="{ data }">
        <StatusCell :cell-data="data" />
      </template>
    </DxDataGrid>

  </div>
</template>
<script>
import { DxDataGrid, DxScrolling, DxColumn, DxPaging, DxSelection, DxColumnFixing } from 'devextreme-vue/data-grid';
import StatusCell from './StatusCell.vue';
import HeaderCell from './HeaderCell.vue';
export default {
  components: {
    DxDataGrid,
    DxScrolling,
    DxPaging,
    DxColumn,
    DxSelection,
    DxColumnFixing,
    StatusCell,
    HeaderCell
},
  props: {
    dataSource: {
      type: Object,
      default: []
    }
  },
  methods: {

  }

};
</script>
<style scoped>
@import url(../../css/page/requestlist.css);
</style>
