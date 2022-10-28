<template>
  <div class="ms-component con-ms-popup popup--choose-employee">
    <div class="ms-popup--background">
      <div class="ms-popup flex flex-col">
        <div class="container" style="padding: 16px 24px; height: calc(100% - 68px) !important">
          <div class="content-header p-b-16">
            <div class="flex justify-between">
              <div class="flex" style="align-items: center">
                <h2>Chọn nhân viên</h2>
              </div>
              <div class="hover-show flex justify-between items-center" @click="closeDialog">
                <i class="ms-popup-close ms-icon mi-close"
                  style="color: rgb(145, 151, 175) !important; cursor: pointer"></i>
              </div>
            </div>
          </div>
          <div class="content-grid">
            <div class="ms-grid-header" style="padding: 0">
              <div class="ms-grid-left flex">
                <div class="tool-search">
                  <DxTextBox placeholder="Tìm kiếm" mode="search" />
                </div>
                <div class="ms-con-input-dropdown m-r-8">
                  <DxSelectBox :items="['contains', 'startsWith', 'equals']" v-model:value="searchMode"
                    placeholder="Tất cả đơn vị" />
                </div>
                <div class="flex" v-if="selectedRowKeys.length">
                  <div class="flex align-center">
                    <span class="f-z-14">Đã chọn <strong>{{ selectedRowKeys.length }}</strong></span>
                  </div>
                  <div class="flex align-center" @click="deSelectRows">
                    <span class="f-z-14 c-red" style="padding-left: 8px; cursor: pointer;">Bỏ chọn</span>
                  </div>
                </div>

              </div>
            </div>
            <div class="ms-grid-container">
              <DxDataGrid id='' class='table-page' :show-borders='true' :data-source='employees'
                :column-auto-width='true' :loadPanel='{ showIndicator: false, showPane: false, text: "" }'
                key-expr='EmployeeId' no-data-text='Không có dữ liệu!' :hover-state-enabled="true"
                v-model:selected-row-keys="selectedRowKeys">
                <DxPaging :enabled="true" :pageSize="15" />
                <DxPager :visible="true" :allowed-page-sizes="[15, 25, 50, 100]" display-mode="compact"
                  :show-page-size-selector="true" :show-info="true" :show-navigation-buttons="true"
                  info-text="Tổng số: {2} bản ghi" />
                <DxScrolling mode='standard' row-rendering-mode='standard' />
                <DxColumnFixing :enabled='true' />
                <DxSelection mode='multiple' show-check-boxes-mode='always' select-all-mode='page' />
                <DxColumn data-field="EmployeeCode" caption="Mã nhân viên" :fixed="true" />
                <DxColumn data-field="FullName" caption="Tên nhân viên" :fixed="true" />
                <DxColumn data-field="DepartmentId" caption="Đơn vị" cell-template="department-cell" />
                <DxColumn data-field="Email" caption="Email" />
                <DxColumn data-field="PhoneNumber" caption="Số điện thoại" />
                <DxColumn data-field="" caption="" />

                <template #department-cell="{ data }">
                  {{ getDepartmentName(data) }}
                </template>


              </DxDataGrid>
              <!-- <m-paging></m-paging> -->
            </div>
          </div>
        </div>
        <div class="ms-popup--footer borderFooter">
          <button class="ms-component ms-button ms-button-filled" @click="closeDialog">
            <span class="ms-button-text"> Hủy </span>
          </button>
          <div style="cursor: pointer">
            <button class="ms-component ms-button ms-button-primary" @click="selectButtonClicked">
              <span class="ms-button-backgroundx ms-button--background f-z-14">Chọn</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxPaging,
  DxScrolling,
  DxColumnFixing,
  DxHeaderFilter,
  DxFilterRow,
  DxSelection,
  DxColumn,
  DxSummary,
  DxGroupItem,
  DxPager
} from 'devextreme-vue/data-grid';
import DxTextBox from "devextreme-vue/text-box";
import DxSelectBox from "devextreme-vue/select-box";
export default {
  components: {
    DxDataGrid,
    DxPaging,
    DxScrolling,
    DxColumnFixing,
    DxHeaderFilter,
    DxFilterRow,
    DxSelection,
    DxColumn,
    DxSummary,
    DxGroupItem,
    DxTextBox,
    DxSelectBox,
    DxPager
  },
  created() {
    if (this.selectedEmployees.length) {
      this.selectedRowKeys = this.selectedEmployees.map(e => e.EmployeeId);
    }
  },
  props: {
    employees: {
      Type: Array,
      default: []
    },
    departments: {
      Type: Array,
      default: []
    },
    selectedEmployees: {
      Type: Array,
      default: []
    }
  },
  data() {
    return {
      selectedRowKeys: []
    };
  },
  methods: {
    closeDialog() {
      this.$emit('close-employee-list');
    },
    selectButtonClicked() {
      this.$emit('update:selectedRows', this.selectedRowKeys);
      this.closeDialog();
    },
    deSelectRows() {
      this.selectedRowKeys = [];
    },
    getDepartmentName(data) {
      return (this.departments.find(ele => data.value === ele.DepartmentId)).DepartmentName
    }
  },
};
</script>

<style>
@import url(../../css/page/employee_list.css);
</style>
