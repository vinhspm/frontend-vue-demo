<template>
  <div class="ms-component con-ms-popup popup--choose-employee">
    <div class="ms-popup--background">
      <div class="ms-popup flex flex-col">
        <div
          class="container"
          style="padding: 16px 24px; height: calc(100% - 68px) !important"
        >
          <div class="content-header p-b-16">
            <div class="flex justify-between align-center">
              <div class="flex" style="align-items: center">
                <h2>Chọn nhân viên</h2>
              </div>
              <div
                class="hover-show flex justify-between align-center items-center"
                @click="closeDialog"
              >
                <i
                  class="ms-popup-close ms-icon mi-close"
                  style="color: rgb(145, 151, 175) !important; cursor: pointer"
                ></i>
              </div>
            </div>
          </div>
          <div class="content-grid">
            <div class="ms-grid-header" style="padding: 0">
              <div class="ms-grid-left flex">
                <div class="tool-search">
                  <DxTextBox
                    placeholder="Tìm kiếm"
                    mode="search"
                    valueChangeEvent="keyup"
                    @valueChanged="filterChanged"
                  />
                </div>
                <div class="ms-con-input-dropdown m-r-8">
                  <DxDropDownBox
                    v-model:value="params.departmentId"
                    v-model:opened="isTreeBoxOpened"
                    :show-clear-button="true"
                    :data-source="departments"
                    value-expr="DepartmentId"
                    display-expr="DepartmentName"
                    placeholder="Tất cả đơn vị"
                  >
                    <template #content="{ data }">
                      <DxTreeView
                        ref="treeView"
                        :items="departmentDataSource"
                        :select-by-click="true"
                        :search-enabled="true"
                        value-expr="DepartmentId"
                        display-expr="DepartmentName"
                        search-mode="contains"
                        selection-mode="single"
                        @content-ready="
                          $event.component.selectItem(params.departmentId)
                        "
                        :width="400"
                        @item-selection-changed="
                          treeView_itemSelectionChanged($event)
                        "
                        @item-click="onTreeItemClick($event)"
                      >
                        <DxSearchEditorOptions placeholder="Tìm kiếm" />
                      </DxTreeView>
                    </template>
                  </DxDropDownBox>
                </div>
                <div
                  class="flex"
                  v-if="selectedRowKeys.length"
                  style="margin-left: 16px"
                >
                  <div class="flex align-center">
                    <span class="f-z-14"
                      >Đã chọn
                      <strong>{{ selectedRowKeys.length }}</strong></span
                    >
                  </div>
                  <div class="flex align-center" @click="deSelectRows">
                    <span
                      class="f-z-14 c-red"
                      style="padding-left: 8px; cursor: pointer"
                      >Bỏ chọn</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="ms-grid-container">
              <DxDataGrid
                id=""
                class="table-page"
                :show-borders="true"
                :data-source="employeeSearch"
                :column-auto-width="true"
                :loadPanel="{ showIndicator: false, showPane: false, text: '' }"
                key-expr="EmployeeId"
                no-data-text="Không có dữ liệu!"
                :hover-state-enabled="true"
                v-model:selected-row-keys="selectedRowKeys"
              >
                <DxPaging :enabled="true" :pageSize="15" />
                <DxPager
                  :visible="true"
                  :allowed-page-sizes="[15, 25, 50, 100]"
                  display-mode="compact"
                  :show-page-size-selector="true"
                  :show-info="true"
                  :show-navigation-buttons="true"
                  info-text="Tổng số: {2} bản ghi"
                />
                <DxScrolling mode="standard" row-rendering-mode="standard" />
                <DxColumnFixing :enabled="true" />
                <DxSelection
                  mode="multiple"
                  show-check-boxes-mode="always"
                  select-all-mode="page"
                />
                <DxColumn
                  data-field="EmployeeCode"
                  caption="Mã nhân viên"
                  :fixed="true"
                />
                <DxColumn
                  data-field="FullName"
                  caption="Tên nhân viên"
                  :fixed="true"
                />
                <DxColumn
                  data-field="DepartmentId"
                  caption="Đơn vị"
                  cell-template="department-cell"
                />
                <DxColumn
                  data-field="PositionId"
                  caption="Vị trí"
                  cell-template="position-cell"
                />

                <DxColumn data-field="Email" caption="Email" />
                <DxColumn data-field="PhoneNumber" caption="Số điện thoại" />
                <DxColumn data-field="" caption="" />

                <template #department-cell="{ data }">
                  {{ getDepartmentName(data) }}
                </template>
                <template #position-cell="{ data }">
                  {{ getPositionName(data) }}
                </template>
              </DxDataGrid>
              <!-- <m-paging></m-paging> -->
            </div>
          </div>
        </div>
        <div class="ms-popup--footer borderFooter">
          <button
            class="ms-component ms-button ms-button-filled"
            @click="closeDialog"
          >
            <span class="ms-button-text"> Hủy </span>
          </button>
          <div style="cursor: pointer">
            <button
              class="ms-component ms-button ms-button-primary"
              @click="selectButtonClicked"
            >
              <span class="ms-button-backgroundx ms-button--background f-z-14"
                >Chọn</span
              >
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
  DxPager,
} from "devextreme-vue/data-grid";
import DxTreeView, { DxSearchEditorOptions } from "devextreme-vue/tree-view";
import DxTextBox from "devextreme-vue/text-box";
import DxDropDownBox from "devextreme-vue/drop-down-box";
import { DEFAULT_DEPARTMENT_LIST } from "../../enum.js";
import { getPositions } from "../../assets/axios/positionController/positionController";
import lodash from "lodash";

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
    DxPager,
    DxDropDownBox,
    DxSearchEditorOptions,
    DxTreeView,
  },
  created() {
    if (this.selectedEmployees.length) {
      this.selectedRowKeys = this.selectedEmployees.map((e) => e.EmployeeId);
    }
    this.departmentDataSource = DEFAULT_DEPARTMENT_LIST;
    this.employeeSearch = this.employees;
  },
  props: {
    employees: {
      Type: Array,
      default: [],
    },
    departments: {
      Type: Array,
      default: [],
    },
    selectedEmployees: {
      Type: Array,
      default: [],
    },
    positions: {
      Type: Array,
      default: []
    }

  },
  data() {
    return {
      selectedRowKeys: [],
      isTreeBoxOpened: false,
      departmentDataSource: null,
      params: { filter: "", departmentId: null },
      employeeSearch: [],
    };
  },
  watch: {
    params: {
      handler() {
        this.applyFilter();
      },
      deep: true,
    },
  },
  methods: {
    /**
     * kích hoạt đóng pop up
     * author: vinhkt
     * created: 01/11/2022
     */
    closeDialog() {
      this.$emit("close-employee-list");
    },

    /**
     * filter danh sách nhân viên
     * author: vinhkt
     * created: 01/11/2022
     */
    applyFilter: lodash.debounce(function() {
      this.employeeSearch = this.employees.filter((ele) => {
          return (
            ele.EmployeeCode.toLowerCase().includes(this.params.filter) ||
            ele.FullName.toLowerCase().includes(this.params.filter)
          );
        });
        if (this.params.departmentId !== null) {
          this.employeeSearch = this.employeeSearch.filter((ele) => {
            return ele.DepartmentId === this.params.departmentId;
          });
        }
    }, 500),

    /**
     * kích hoạt sự kiện ấn chọn nhân viên
     * author: vinhkt
     * created: 01/11/2022
     */
    selectButtonClicked() {
      this.$emit("update:selectedRows", this.selectedRowKeys);
      this.closeDialog();
    },

    /**
     * bỏ chọn một hàng trong bảng
     * author: vinhkt
     * created: 01/11/2022
     */
    deSelectRows() {
      this.selectedRowKeys = [];
    },

    /**
     * trả về tên đơn vị theo id
     * author: vinhkt
     * created: 01/11/2022
     */
    getDepartmentName(data) {
      return this.departments.find((ele) => data.value === ele.DepartmentId)
        .DepartmentName;
    },

    /**
     * gán giá trị cho selectbox đơn vị
     * author: vinhkt
     * created: 01/11/2022
     */
    treeView_itemSelectionChanged(e) {
      this.params.departmentId = e.itemData.DepartmentId;
    },

    /**
     * đóng selectbox đơn vị
     * author: vinhkt
     * created: 01/11/2022
     */
    onTreeItemClick() {
      this.isTreeBoxOpened = false;
    },

    /**
     * gán giá trị cho filter 
     * author: vinhkt
     * created: 01/11/2022
     */
    filterChanged($event) {
      this.params.filter = $event.value.toLowerCase();
    },

    /**
     * trả về tên vị trí theo id
     * author: vinhkt
     * created: 01/11/2022
     */
    getPositionName(data) {
      const position = this.positions.find((e) => {
        return e.PositionId === data.value;
      });
      if (position) {
        return position.PositionName;
      } else return null;
    },
  },
};
</script>

<style>
@import url(../../css/page/employee_list.css);
</style>
