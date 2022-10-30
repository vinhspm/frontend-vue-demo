<template>
  <div class="detail-form-wrapper">
    <form action="#" @submit="handleSubmit">
      <div class="form-header">
        <div class="flex align-center">
          <div class="button-back" @click="closeDialog"></div>
          <div>
            <h2>{{ formTitle }}</h2>
          </div>
        </div>
        <div class="flex" v-if="viewType === 1">
          <button class="btn btn--save" @click="editRequest">Sửa</button>
        </div>
        <div class="flex" v-if="viewType === 2 || viewType === 3">
          <button class="btn btn--cancel" @click="closeDialog">Huỷ</button>

          <DxButton
            text="Lưu"
            class="btn btn--save"
            @click="buttonSaveClicked"
          />
        </div>
      </div>
      <div class="form-body">
        <DxScrollView :scroll-by-thumb="true">
          <div class="form-main p-24">
            <div class="col">
              <div class="form-field">
                <label class="input--label"
                  ><b>Người nộp đơn</b
                  ><span class="input--required">*</span></label
                >
                <DxSelectBox
                  :data-source="employeesSource"
                  v-model:value="selectedRequest.EmployeeId"
                  display-expr="FullName"
                  value-expr="EmployeeId"
                  search-enabled="true"
                  search-mode="contains"
                  search-expr="FullName"
                  :search-timeout="200"
                  item-template="item"
                  @value-changed="onValueEmployeeChanged"
                  placeholder=""
                  :disabled="viewType !== 3 || isDisableAll"
                >
                  <DxValidator>
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                  <template #item="{ data }">
                    <NameCell :cell-data="data.FullName" />
                  </template>
                </DxSelectBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Đơn vị công tác</b></label>
                <DxSelectBox
                  :data-source="departments"
                  v-model:value="selectedRequest.DepartmentId"
                  disabled="true"
                  display-expr="DepartmentName"
                  value-expr="DepartmentId"
                  placeholder=""
                />
              </div>
              <div class="form-field">
                <label class="input--label"
                  ><b>Ngày nộp đơn</b
                  ><span class="input--required">*</span></label
                >
                <DxDateBox
                  v-model:value="selectedRequest.ApplyDate"
                  cancel-button-text="Huỷ"
                  apply-button-text="Lưu"
                  display-format="dd/MM/yyyy HH:mm"
                  type="datetime"
                  placeholder="DD/MM/YYYY HH:mm"
                  :disabled="isDisableAll"
                >
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="form-field">
                <label class="input--label"
                  ><b>Làm thêm từ </b
                  ><span class="input--required">*</span></label
                >
                <DxDateBox
                  v-model:value="selectedRequest.FromDate"
                  cancel-button-text="Huỷ"
                  apply-button-text="Lưu"
                  display-format="dd/MM/yyyy HH:mm"
                  type="datetime"
                  placeholder="DD/MM/YYYY HH:mm"
                  :disabled="isDisableAll"
                >
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Nghỉ giữa ca từ </b></label>
                <DxDateBox
                  cancel-button-text="Huỷ"
                  apply-button-text="Lưu"
                  display-format="dd/MM/yyyy HH:mm"
                  :disabled="isDisableAll"
                  type="datetime"
                  placeholder="DD/MM/YYYY HH:mm"
                  v-model:value="selectedRequest.BreakTimeFrom"
                >
                  <DxValidator :height="34">
                    <DxRangeRule
                      :min="selectedRequest.FromDate"
                      :message="customValidateMsg.BREAKTIME_FROM.INVALID_INPUT"
                      :reevaluate="true"
                      v-if="selectedRequest.FromDate"
                    />
                    <DxRequiredRule
                      v-if="selectedRequest.BreakTimeTo"
                      :message="customValidateMsg.BREAKTIME_FROM.NOT_NULL"
                    />
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Nghỉ giữa ca đến</b> </label>
                <DxDateBox
                  cancel-button-text="Huỷ"
                  apply-button-text="Lưu"
                  display-format="dd/MM/yyyy HH:mm"
                  :disabled="isDisableAll"
                  type="datetime"
                  placeholder="DD/MM/YYYY HH:mm"
                  v-model:value="selectedRequest.BreakTimeTo"
                >
                  <DxValidator :height="34">
                    <DxRangeRule
                      :min="selectedRequest.BreakTimeFrom"
                      :message="customValidateMsg.BREAKTIME_TO.INVALID_INPUT"
                      :reevaluate="true"
                      v-if="selectedRequest.BreakTimeFrom"
                    />
                    <DxRequiredRule
                      v-if="selectedRequest.BreakTimeFrom"
                      :message="customValidateMsg.BREAKTIME_TO.NOT_NULL"
                    />
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="form-field">
                <label class="input--label"
                  ><b>Làm thêm đến</b
                  ><span class="input--required">*</span></label
                >
                <DxDateBox
                  v-model:value="selectedRequest.ToDate"
                  cancel-button-text="Huỷ"
                  apply-button-text="Lưu"
                  display-format="dd/MM/yyyy HH:mm"
                  type="datetime"
                  placeholder="DD/MM/YYYY HH:mm"
                  :disabled="isDisableAll"
                >
                  <DxValidator :height="34">
                    <DxRangeRule
                      :min="selectedRequest.BreakTimeTo"
                      :message="customValidateMsg.TO_DATE.INVALID_INPUT"
                      :reevaluate="true"
                      v-if="selectedRequest.BreakTimeTo"
                    />
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="form-field">
                <label class="input--label"
                  ><b>Thời điểm làm thêm </b
                  ><span class="input--required">*</span></label
                >
                <DxSelectBox
                  :data-source="workTimes"
                  v-model:value="selectedRequest.OverTimeInWorkingShift"
                  display-expr="txt"
                  value-expr="value"
                  placeholder=""
                  :disabled="isDisableAll"
                  @value-changed="onOverTimeInWorkShiftChange"
                >
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                </DxSelectBox>
              </div>
              <div
                class="form-field"
                v-if="
                  selectedRequest.OverTimeInWorkingShift != workTimes[3].value
                "
              >
                <label class="input--label"
                  ><b>Ca làm thêm </b
                  ><span class="input--required">*</span></label
                >
                <DxSelectBox
                  :data-source="
                    selectedRequest.OverTimeInWorkingShift ? workShifts : null
                  "
                  v-model:value="selectedRequest.WorkingShift"
                  display-expr="txt"
                  value-expr="value"
                  placeholder=""
                  no-data-text="Không có dữ liệu"
                  :disabled="isDisableAll"
                >
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                </DxSelectBox>
              </div>
            </div>
            <div class="col">
              <div class="form-field">
                <label
                  ><b>Lý do làm thêm</b
                  ><span class="input--required">*</span></label
                >
                <DxTextArea
                  :height="90"
                  v-model:value="selectedRequest.Reason"
                  :disabled="isDisableAll"
                >
                  <DxValidator :height="85">
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                </DxTextArea>
              </div>
              <div class="form-field">
                <label
                  ><b>Người duyệt</b
                  ><span class="input--required">*</span></label
                >
                <DxSelectBox
                  :data-source="employeesSource"
                  v-model:value="selectedRequest.ApprovalToId"
                  display-expr="FullName"
                  value-expr="EmployeeId"
                  search-enabled="true"
                  search-mode="contains"
                  search-expr="FullName"
                  :search-timeout="200"
                  item-template="item"
                  placeholder=""
                  :disabled="isDisableAll"
                >
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                  <template #item="{ data }">
                    <NameCell :cell-data="data.FullName" />
                  </template>
                </DxSelectBox>
              </div>
              <div class="form-field">
                <label class="input--label"
                  ><b>Trạng thái</b
                  ><span class="input--required">*</span></label
                >
                <DxSelectBox
                  :data-source="statuses"
                  v-model:value="selectedRequest.Status"
                  display-expr="txt"
                  value-expr="value"
                  placeholder=""
                  :disabled="isDisableAll"
                  v-if="viewType !== 1"
                >
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                </DxSelectBox>
                <div v-if="viewType === 1" style="height: 33px">
                  <StatusCell :cell-data="{ value: selectedRequest.Status }" />
                </div>
              </div>
            </div>
            <div class="form-list">
              <h3 class="list__header">DANH SÁCH NHÂN VIÊN LÀM THÊM</h3>
              <div class="add__wrapper">
                <span v-if="!selectedEmployees.length"
                  ><i>Chưa có dữ liệu</i></span
                >
                <button
                  type="button"
                  class="add__button"
                  @click="openEmployeeList"
                >
                  <i class="add__icon"></i>
                  <span>Thêm</span>
                </button>
              </div>
              <div class="add__table" v-if="selectedEmployees.length">
                <DxDataGrid
                  id=""
                  class="table-page"
                  :show-borders="true"
                  :data-source="selectedEmployees"
                  :column-auto-width="true"
                  :loadPanel="{
                    showIndicator: false,
                    showPane: false,
                    text: '',
                  }"
                  key-expr="EmployeeId"
                  no-data-text="Không có dữ liệu!"
                  :hover-state-enabled="true"
                >
                  <DxEditing :allow-deleting="true">
                    <DxTexts confirmDeleteMessage="" />
                  </DxEditing>
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
                  <!-- <DxSelection mode='multiple' show-check-boxes-mode='always' select-all-mode='page' /> -->
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
                  <DxColumn
                    type="buttons"
                    :width="100"
                    caption=""
                    :fixed="true"
                    fixed-position="right"
                  >
                    <DxButtonGrid
                      id="delete-button"
                      name="delete"
                      icon="trash"
                      @click="deleteRequest"
                      css-class="command-button"
                      hint="Xoá"
                    />
                  </DxColumn>
                  <template #department-cell="{ data }">
                    {{ getDepartmentName(data) }}
                  </template>
                  <template #position-cell="{ data }">
                    {{ getPositionName(data) }}
                  </template>
                </DxDataGrid>
              </div>
            </div>
          </div>

          <div class="form-note p-24"></div>
        </DxScrollView>
      </div>
    </form>
  </div>
  <EmployeeList
    v-if="isShowEmployeeList"
    @close-employee-list="closeEmployeeList"
    :employees="employees"
    :departments="departments"
    @update:selectedRows="changeSelectedEmployees"
    :selectedEmployees="selectedEmployees"
    :positions="positions"
  />
</template>
<script>
import { DxTextArea } from "devextreme-vue/text-area";
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
  DxEditing,
  DxTexts,
  DxButton as DxButtonGrid,
} from "devextreme-vue/data-grid";
import lodash from "lodash";
import {
  DEFAULT_REQUEST,
  DATETIME_OPTIONS,
  DEFAULT_EMPLOYEE_LIST,
  DEFAULT_DEPARTMENT_LIST,
  WORK_TIME,
  WORK_SHIFT,
  REQUEST_STATUS_ARRAY,
  DETAIL_VIEW_TYPE,
} from "../../enum.js";
import DxDateBox from "devextreme-vue/date-box";
import { DxScrollView } from "devextreme-vue/scroll-view";

import { locale } from "devextreme/localization";
import {
  getRequestDetail,
  postRequest,
  putRequest,
} from "../../assets/axios/requestController/requestController.js";
import {
  DxValidator,
  DxRequiredRule,
  DxCustomRule,
  DxRangeRule,
} from "devextreme-vue/validator";
import StatusCell from "../../components/base/StatusCell.vue";
import NameCell from "../../components/base/NameCell.vue";
import { DxSelectBox } from "devextreme-vue/select-box";
import { DxButton } from "devextreme-vue";
import "devextreme-vue/text-area";
import DataSource from "devextreme/data/data_source";
import { getEmployees } from "../../assets/axios/employeeController/employeeController.js";
import { getDepartments } from "../../assets/axios/departmentController/departmentController.js";
import EmployeeList from "./EmployeeList.vue";
import DxTextBox from "devextreme/ui/text_box";
import { CUSTOM_VALIDATE_MSG } from "../../resources.js";
import { getPositions } from "../../assets/axios/positionController/positionController";
export default {
  components: {
    DxColumn,
    DxButton,
    DxTextArea,
    DxScrollView,
    DxValidator,
    DxRequiredRule,
    DxCustomRule,
    DxRangeRule,
    DxSelectBox,
    DxDateBox,
    DxDataGrid,
    DxPaging,
    DxScrolling,
    DxColumnFixing,
    DxHeaderFilter,
    DxEditing,
    DxFilterRow,
    DxSelection,
    DxColumn,
    DxSummary,
    DxGroupItem,
    DxButtonGrid,
    DxTextBox,
    DxSelectBox,
    DxPager,
    DxTexts,
    StatusCell,
    NameCell,
    DxTextBox,
    EmployeeList,
  },
  created() {
    locale("vi");
    this.getEmployeesData();
    this.statuses.splice(0, 1);
    if (this.viewType != DETAIL_VIEW_TYPE.ADDNEW) {
      this.getSelectedData();
    } else {
      this.selectedRequest.ApplyDate = new Date();
      this.selectedRequest.FromDate = new Date();
      this.selectedRequest.ToDate = new Date();
    }
  },
  props: {
    selectedRequestId: {
      Type: String,
      default: "",
    },
    viewType: {
      Type: Number,
      default: DETAIL_VIEW_TYPE.ADDNEW,
    },
  },
  data() {
    return {
      formTitle: "",
      selectedRequest: {},
      dateTimeOptions: DATETIME_OPTIONS,
      options: {},
      employees: [],
      departments: [],
      positions: [],
      notNullMsg: "Trường không được để trống",
      workTimes: WORK_TIME,
      workShifts: WORK_SHIFT,
      isDisableAll: false,
      customValidateMsg: CUSTOM_VALIDATE_MSG,
      statuses: lodash.cloneDeep(REQUEST_STATUS_ARRAY),
      buttonOptions: {
        text: "Register",
        type: "success",
        useSubmitBehavior: true,
      },
      selectedEmployees: [],
      isShowEmployeeList: false,
      employeesSource: new DataSource({
        store: {
          type: "array",
          key: "EmployeeId",
          data: [],
        },
        paginate: true,
        pageSize: 10,
      }),
    };
  },
  watch: {
    "employees.length": {
      handler() {
        this.employeesSource = new DataSource({
          store: {
            type: "array",
            key: "EmployeeId",
            data: this.employees,
          },
          paginate: true,
          pageSize: 10,
        });
      },
      immediate: true,
    },
    viewType: {
      handler(val) {
        if (val === DETAIL_VIEW_TYPE.EDIT || val === DETAIL_VIEW_TYPE.ADDNEW) {
          this.isDisableAll = false;
        } else {
          this.isDisableAll = true;
        }
        if (this.viewType === DETAIL_VIEW_TYPE.ADDNEW) {
          this.formTitle = "Thêm mới đăng ký làm thêm";
        } else {
          if (this.viewType === DETAIL_VIEW_TYPE.EDIT) {
            this.formTitle = "Sửa đăng ký làm thêm";
          } else {
            this.formTitle = "Chi tiết đăng ký làm thêm";
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    openEmployeeList() {
      this.isShowEmployeeList = true;
    },
    closeEmployeeList() {
      this.isShowEmployeeList = false;
    },

    onValueEmployeeChanged(event) {
      const index = this.employees.findIndex(
        (ele) => ele.EmployeeId === event.value
      );
      if (index > -1) {
        this.selectedRequest.DepartmentId = this.employees[index].DepartmentId;
      } else {
        this.selectedRequest.DepartmentId = null;
      }
    },
    onOverTimeInWorkShiftChange(event) {
      console.log(event);
      if (!event.previousValue) {
        this.selectedRequest.WorkingShift = this.workShifts[0].value;
      }
      if (event.value == this.workTimes[3].value) {
        this.selectedRequest.WorkingShift = null;
      }
    },
    async getSelectedData() {
      const res = await getRequestDetail(this.selectedRequestId);
      if (res) {
        this.selectedRequest = res.data;
      }
    },

    async getEmployeesData() {
      const resEmp = await getEmployees();
      if (resEmp) {
        this.employees = resEmp.data;
      }
      const resDpm = await getDepartments();
      if (resDpm) {
        this.departments = resDpm.data;
      }
      const rePst = await getPositions();
      if (rePst) {
        this.positions = rePst.data;
      }
    },
    changeSelectedEmployees(event) {
      this.selectedEmployees = this.employees.filter((e) => {
        return event.includes(e.EmployeeId);
      });
      console.log(this.selectedEmployees);
    },
    editRequest() {
      console.log("edit", this.selectedRequest.OverTimeId);
      this.$emit("open-dialog", {
        type: DETAIL_VIEW_TYPE.EDIT,
        selectedRequestId: this.selectedRequest.OverTimeId,
      });
    },
    onValueChanged(event) {
      console.log(event);
    },
    buttonSaveClicked(params) {
      const res = params.validationGroup.validate();
      if (res.isValid) {
        this.onSave();
      }
    },
    getPositionName(data) {
      const position = this.positions.find((e) => {
        return e.PositionId === data.value;
      });
      if (position) {
        return position.PositionName;
      } else return null;
    },
    getDepartmentName(data) {
      return this.departments.find((ele) => data.value === ele.DepartmentId)
        .DepartmentName;
    },
    async onSave() {
      try {
        this.selectedRequest.DepartmentId = null;
        this.selectedRequest.Employees = this.selectedEmployees.map((ele) => {
          return {
            EmployeeCode: ele.EmployeeCode,
            FullName: ele.FullName,
            DepartmentId: ele.DepartmentId,
            Email: ele.Email,
            PhoneNumber: ele.PhoneNumber,
          };
        });
        console.log(this.selectedRequest.Employees);
        if (this.viewType === DETAIL_VIEW_TYPE.ADDNEW) {
          const res = await postRequest(this.selectedRequest);
          if(res.status == 201) {
            // this.notifyMsg(NOTIFY_TYPE.SUCCESS, "Xoá thành công");
            this.closeDialog();
          }
        } else {
          const res = await putRequest(
            this.selectedRequestId,
            this.selectedRequest
          );
          if(res.status == 200) {
            // this.notifyMsg(NOTIFY_TYPE.ERROR, "Xoá thành công");
            this.closeDialog();
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
@import url(../../css/page/request_detail.css);

#app
  > div.main
  > div
  > div.detail-form-wrapper
  > form
  > div.form-body
  > div
  > div.dx-scrollable-wrapper
  > div
  > div.dx-scrollable-content
  > div.dx-scrollview-content
  > div.form-main.p-24
  > div:nth-child(2)
  > div:nth-child(3)
  > div
  > div {
  height: 19px;
}
</style>
