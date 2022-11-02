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
          <button class="btn btn--cancel" type="button" @click="closeDialog">Huỷ</button>

          <DxButton text="Lưu" class="btn btn--save" @click="buttonSaveClicked" />
        </div>
      </div>
      <div class="form-body">
        <DxScrollView :scroll-by-thumb="true">
          <div class="form-main p-24">
            <div class="col">
              <div class="form-field">
                <label class="input--label"><b>Người nộp đơn</b><span class="input--required">*</span></label>
                <DxSelectBox :data-source="employeesSource" v-model:value="selectedRequest.EmployeeId"
                  display-expr="FullName" value-expr="EmployeeId" search-enabled="true" search-mode="contains"
                  search-expr="FullName" :search-timeout="200" item-template="item"
                  @value-changed="onValueEmployeeChanged" placeholder="" :disabled="viewType !== 3 || isDisableAll"
                  v-if="viewType !== 1" id="fullname" :deferRendering="false" :onContentReady="selectboxEmployeeReady">
                  <DxValidator>
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                  <template #item="{ data }">
                    <NameCell :cell-data="data" />
                  </template>
                </DxSelectBox>
                <DxTextBox :value="selectedRequest.FullName" :disabled="isDisableAll" v-if="viewType === 1" />
              </div>
              <div class="form-field">
                <label class="input--label"><b>Đơn vị công tác</b></label>
                <DxSelectBox :data-source="departments" v-model:value="selectedRequest.DepartmentId" disabled="true"
                  display-expr="DepartmentName" value-expr="DepartmentId" placeholder="" v-if="viewType !== 1" />
                <DxTextBox :value="selectedRequest.DepartmentName" :disabled="isDisableAll" v-if="viewType === 1" />

              </div>
              <div class="form-field">
                <label class="input--label"><b>Ngày nộp đơn</b><span class="input--required">*</span></label>
                <DxDateBox v-model:value="selectedRequest.ApplyDate" cancel-button-text="Huỷ" apply-button-text="Lưu"
                  display-format="dd/MM/yyyy HH:mm" type="datetime" placeholder="DD/MM/YYYY HH:mm"
                  :disabled="isDisableAll">
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Làm thêm từ </b><span class="input--required">*</span></label>
                <DxDateBox v-model:value="selectedRequest.FromDate" cancel-button-text="Huỷ" apply-button-text="Lưu"
                  display-format="dd/MM/yyyy HH:mm" type="datetime" placeholder="DD/MM/YYYY HH:mm"
                  :disabled="isDisableAll">
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Nghỉ giữa ca từ </b></label>
                <DxDateBox cancel-button-text="Huỷ" apply-button-text="Lưu" display-format="dd/MM/yyyy HH:mm"
                  :disabled="isDisableAll" type="datetime" placeholder="DD/MM/YYYY HH:mm"
                  v-model:value="selectedRequest.BreakTimeFrom">
                  <DxValidator :height="34">
                    <DxRangeRule :min="selectedRequest.FromDate"
                      :message="customValidateMsg.BREAKTIME_FROM.INVALID_INPUT" :reevaluate="true"
                      v-if="selectedRequest.FromDate" />
                    <DxRequiredRule v-if="selectedRequest.BreakTimeTo"
                      :message="customValidateMsg.BREAKTIME_FROM.NOT_NULL" />
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Nghỉ giữa ca đến</b> </label>
                <DxDateBox cancel-button-text="Huỷ" apply-button-text="Lưu" display-format="dd/MM/yyyy HH:mm"
                  :disabled="isDisableAll" type="datetime" placeholder="DD/MM/YYYY HH:mm"
                  v-model:value="selectedRequest.BreakTimeTo">
                  <DxValidator :height="34">
                    <DxRangeRule :min="selectedRequest.BreakTimeFrom"
                      :message="customValidateMsg.BREAKTIME_TO.INVALID_INPUT" :reevaluate="true"
                      v-if="selectedRequest.BreakTimeFrom" />
                    <DxRequiredRule v-if="selectedRequest.BreakTimeFrom"
                      :message="customValidateMsg.BREAKTIME_TO.NOT_NULL" />
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Làm thêm đến</b><span class="input--required">*</span></label>
                <DxDateBox v-model:value="selectedRequest.ToDate" cancel-button-text="Huỷ" apply-button-text="Lưu"
                  display-format="dd/MM/yyyy HH:mm" type="datetime" placeholder="DD/MM/YYYY HH:mm"
                  :disabled="isDisableAll">
                  <DxValidator :height="34">
                    <DxRangeRule :min="selectedRequest.BreakTimeTo" :message="customValidateMsg.TO_DATE.INVALID_INPUT"
                      :reevaluate="true" v-if="selectedRequest.BreakTimeTo" />
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Thời điểm làm thêm </b><span class="input--required">*</span></label>
                <DxSelectBox :data-source="workTimes" v-model:value="selectedRequest.OverTimeInWorkingShift"
                  display-expr="txt" value-expr="value" placeholder="" :disabled="isDisableAll"
                  @value-changed="onOverTimeInWorkShiftChange">
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                </DxSelectBox>
              </div>
              <div class="form-field" v-if="
                selectedRequest.OverTimeInWorkingShift != workTimes[3].value
              ">
                <label class="input--label"><b>Ca làm thêm </b><span class="input--required">*</span></label>
                <DxSelectBox :data-source="
                  selectedRequest.OverTimeInWorkingShift ? workShifts : null
                " v-model:value="selectedRequest.WorkingShift" display-expr="txt" value-expr="value" placeholder=""
                  no-data-text="Không có dữ liệu" :disabled="isDisableAll">
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                </DxSelectBox>
              </div>
            </div>
            <div class="col">
              <div class="form-field">
                <label><b>Lý do làm thêm</b><span class="input--required">*</span></label>
                <DxTextArea :height="90" v-model:value="selectedRequest.Reason" :disabled="isDisableAll"
                  v-if="viewType !== 1">
                  <DxValidator :height="85">
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                </DxTextArea>
                <DxTextBox v-model:value="selectedRequest.Reason" :disabled="isDisableAll" v-if="viewType === 1" />
              </div>
              <div class="form-field">
                <label><b>Người duyệt</b><span class="input--required">*</span></label>
                <DxSelectBox :data-source="employeesSourceClone" v-model:value="selectedRequest.ApprovalToId"
                  display-expr="FullName" value-expr="EmployeeId" search-enabled="true" search-mode="contains"
                  search-expr="FullName" :search-timeout="200" item-template="item" placeholder=""
                  :disabled="isDisableAll">
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg" />
                  </DxValidator>
                  <template #item="{ data }">
                    <NameCell :cell-data="data" />
                  </template>
                </DxSelectBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Trạng thái</b><span class="input--required">*</span></label>
                <DxSelectBox :data-source="statuses" v-model:value="selectedRequest.Status" display-expr="txt"
                  value-expr="value" placeholder="" :disabled="isDisableAll" v-if="viewType !== 1">
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
              <div class="flex align-center">
                <h3 class="list__header">DANH SÁCH NHÂN VIÊN LÀM THÊM</h3>
                <div class="flex align-center" v-if="selectedRowKeys.length">
                  <span>Đã chọn <strong>{{ selectedRowKeys.length }}</strong></span>
                  <div class="flex align-center" @click="deSelectRows">
                    <span class="f-z-14 c-blue" style="padding-left: 16px; cursor: pointer">Bỏ chọn</span>
                  </div>
                  <div class="flex align-center" @click="deleteRows">
                    <span class="f-z-14 c-red" style="padding-left: 16px; cursor: pointer">Loại bỏ</span>
                  </div>

                </div>
              </div>
              <div class="add__wrapper" v-if="viewType !== 1">
                <span v-if="!selectedEmployees.length"><i>Chưa có dữ liệu</i></span>
                <button type="button" class="add__button" @click="openEmployeeList">
                  <i class="add__icon"></i>
                  <span>Thêm</span>
                </button>
              </div>
              <div class="add__wrapper" v-if="viewType === 1">
                <DxTextBox placeholder="Tìm kiếm" mode="search" valueChangeEvent="keyup" @valueChanged="filterChanged"
                  :width="320" v-if="selectedEmployees.length" />
                <span v-if="!selectedEmployees.length"><i>Chưa có dữ liệu</i></span>
              </div>
              <div class="add__table" v-if="selectedEmployees.length">
                <DxDataGrid id="" class="table-page" :show-borders="true"
                  :data-source="viewType === 1 ? employeeSearch : selectedEmployees" :column-auto-width="true"
                  :loadPanel="{
                    showIndicator: false,
                    showPane: false,
                    text: '',
                  }" key-expr="EmployeeId" no-data-text="Không có dữ liệu!" :hover-state-enabled="true"
                  :readOnly="true" v-model:selected-row-keys="selectedRowKeys">
                  <DxEditing :allow-deleting="true" v-if="viewType !== 1">
                    <DxTexts confirmDeleteMessage="" />
                  </DxEditing>
                  <DxPaging :enabled="false" />
                  <DxScrolling mode="standard" row-rendering-mode="standard" />
                  <DxColumnFixing :enabled="true" />
                  <DxSelection mode='multiple' show-check-boxes-mode='always' select-all-mode='page'
                    v-if="viewType !== 1" />
                  <DxColumn data-field="EmployeeCode" caption="Mã nhân viên" :fixed="true" />
                  <DxColumn data-field="FullName" caption="Tên nhân viên" :fixed="true" />
                  <DxColumn data-field="DepartmentId" caption="Đơn vị" cell-template="department-cell" />
                  <DxColumn data-field="PositionId" caption="Vị trí" :width="150" cell-template="position-cell" />
                  <DxColumn data-field="Email" caption="Email" />
                  <DxColumn data-field="PhoneNumber" caption="Số điện thoại" />
                  <DxColumn type="buttons" :width="100" caption="" :fixed="true" fixed-position="right">
                    <DxButtonGrid id="delete-button" name="delete" icon="trash" css-class="command-button" hint="Xoá" />
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
        </DxScrollView>
      </div>
    </form>
  </div>
  <EmployeeList v-if="isShowEmployeeList" @close-employee-list="closeEmployeeList" :employees="employees"
    :departments="departments" @update:selectedRows="changeSelectedEmployees" :selectedEmployees="selectedEmployees"
    :positions="positions" />
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
import notify from "devextreme/ui/notify";
import {
  DATETIME_OPTIONS,
  NOTIFY_TYPE,
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
import DxTextBox from "devextreme-vue/text-box";
import { CUSTOM_VALIDATE_MSG } from "../../resources.js";
import { getPositions } from "../../assets/axios/positionController/positionController";
import moment from 'moment';
export default {
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
      this.selectedRequest.Status = this.statuses[1].value
    }

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
        this.employeesSourceClone = new DataSource({
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
    "selectedRowKeys.length": {
      handler() {
      }
    },
    filter: {
      handler() {
        this.applyFilter();
      }
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

    /**
     * kích hoạt sự kiện đóng form detail
     * author: vinhkt
     * created: 01/11/2022
     */
    closeDialog() {
      console.log('close');
      this.$emit("close-dialog");
    },

    /**
     * mở dialog bảng nhân viên
     * author: vinhkt
     * created: 01/11/2022
     */
    openEmployeeList() {
      this.isShowEmployeeList = true;
    },

    /**
     * đóng bảng nhân viên
     * author: vinhkt
     * created: 01/11/2022
     */
    closeEmployeeList() {
      this.isShowEmployeeList = false;
    },

    /**
     * tìm kiếm bảng nhân viên làm thêm
     * author: vinhkt
     * created: 01/11/2022
     */
    applyFilter: lodash.debounce(function () {
      this.employeeSearch = this.selectedEmployees.filter((ele) => {
        return (
          ele.EmployeeCode.toLowerCase().includes(this.filter.toLowerCase()) ||
          ele.FullName.toLowerCase().includes(this.filter.toLowerCase())
        );
      });
    }, 500),

    /**
     * map dữ liệu đơn vị theo nhân viên
     * author: vinhkt
     * created: 01/11/2022
     */
    onValueEmployeeChanged(event) {
      const index = this.employees.findIndex(
        (ele) => ele.EmployeeId === event.value
      );
      if (index > -1) {
        this.selectedRequest.DepartmentId = this.employees[index].DepartmentId;
        
        //cập nhật bảng nhân viên làm thêm
        if (!this.selectedEmployees.length && this.viewType !== DETAIL_VIEW_TYPE.DETAIL) {
          this.changeSelectedEmployees([event.value])
        }
      } else {
        this.selectedRequest.DepartmentId = null;
      }
    },

    /**
     * sự kiện thay đổi filter tìm kiếm nhân viên
     * author: vinhkt
     * created: 01/11/2022
     */
    filterChanged($event) {
      this.filter = $event.value.toLowerCase();
    },

    /**
     * xoá nhiều nhân viên làm thêm
     * author: vinhkt
     * created: 01/11/2022
     */
    deleteRows() {
      this.selectedEmployees = this.selectedEmployees.filter(ele => {
        return !this.selectedRowKeys.includes(ele.EmployeeId);
      });
      this.selectedRowKeys = []
    },

    /**
     * bỏ chọn hàng trong bảng nhân viên
     * author: vinhkt
     * created: 01/11/2022
     */
    deSelectRows() {
      this.selectedRowKeys = []
    },

    /**
     * bind dữ liệu trường thời điểm làm thêm với ca làm thêm
     * author: vinhkt
     * created: 01/11/2022
     */
    onOverTimeInWorkShiftChange(event) {
      if (!event.previousValue) {
        this.selectedRequest.WorkingShift = this.workShifts[0].value;
      }
      if (event.value == this.workTimes[3].value) {
        this.selectedRequest.WorkingShift = null;
      }
    },

    /**
     * call api lấy dữ liệu form detail
     * author: vinhkt
     * created: 01/11/2022
     */
    async getSelectedData() {
      const res = await getRequestDetail(this.selectedRequestId);
      if (res) {
        this.selectedRequest = res.data;
        this.selectedEmployees = this.selectedRequest.Employees;
        if (this.viewType === DETAIL_VIEW_TYPE.DETAIL) {
          this.employeeSearch = this.selectedEmployees;
        }
        this.selectedRequest.ApplyDate = this.selectedRequest.ApplyDate ? new Date(this.selectedRequest.ApplyDate) : null;
        this.selectedRequest.FromDate = this.selectedRequest.FromDate ? new Date(this.selectedRequest.FromDate) : null;
        this.selectedRequest.ToDate = this.selectedRequest.ToDate ? new Date(this.selectedRequest.ToDate) : null;
        this.selectedRequest.BreakTimeFrom = this.selectedRequest.BreakTimeFrom ? new Date(this.selectedRequest.BreakTimeFrom) : null;
        this.selectedRequest.BreakTimeTo = this.selectedRequest.BreakTimeTo ? new Date(this.selectedRequest.BreakTimeTo) : null;
      }
    },

    /**
     * call api lấy dữ liệu nhân viên, vị trí, đơn vị
     * author: vinhkt
     * created: 01/11/2022
     */
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

    /**
     * sự kiện chọn nhân viên làm thêm từ bảng lớn
     * author: vinhkt
     * created: 01/11/2022
     */
    changeSelectedEmployees(event) {
      this.selectedEmployees = this.employees.filter((e) => {
        return event.includes(e.EmployeeId);
      });
    },

    /**
     * kích hoạt sự kiện từ chi tiết thành sửa form detail
     * author: vinhkt
     * created: 01/11/2022
     */
    editRequest() {
      this.$emit("open-dialog", {
        type: DETAIL_VIEW_TYPE.EDIT,
        selectedRequestId: this.selectedRequest.OverTimeId,
      });
    },

    /**
     * validate dữ liệu trước khi lưu
     * author: vinhkt
     * created: 01/11/2022
     */
    buttonSaveClicked(params) {
      const res = params.validationGroup.validate();
      if (res.isValid) {
        this.onSave();
      }
    },

    /**
     * lấy tên vị trí từ id
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

    /**
     * lấy tên đơn vị từ id
     * author: vinhkt
     * created: 01/11/2022
     */
    getDepartmentName(data) {
      const department = this.departments.find((e) => {
        return e.DepartmentId === data.value;
      });
      if (department) {
        return department.DepartmentName;
      } else return null;
    },

    selectboxEmployeeReady(e) {
      this.$nextTick(() => e.component.focus())
    },

    /**
     * toast thông báo
     * author: vinhkt
     * created: 01/11/2022
     */
    notifyMsg(type, message) {
      notify(
        {
          message: message,
          width: 230,
          height: 40,
          position: {
            at: "bottom right",
            my: "bottom right",
          },
        },
        type,
        500
      );
    },

    /**
     * gửi dữ liệu lên server
     * author: vinhkt
     * created: 01/11/2022
     */
    async onSave() {
      try {
        this.selectedRequest.DepartmentId = null;
        this.selectedRequest.Employees = this.selectedEmployees.map((ele) => {
          return {
            EmployeeId: ele.EmployeeId,
            EmployeeCode: ele.EmployeeCode,
            FullName: ele.FullName,
            DepartmentId: ele.DepartmentId,
            PositionId: ele.PositionId,
            Email: ele.Email,
            PhoneNumber: ele.PhoneNumber,
          };
        });
        if (this.viewType === DETAIL_VIEW_TYPE.ADDNEW) {
          const res = await postRequest(this.selectedRequest);
          if (res.status == 201) {
            this.notifyMsg(NOTIFY_TYPE.SUCCESS, "Thêm mới thành công");
            this.closeDialog();
          }
        } else {
          const res = await putRequest(
            this.selectedRequestId,
            this.selectedRequest
          );
          if (res.status == 200) {
            this.notifyMsg(NOTIFY_TYPE.SUCCESS, "Sửa thành công");
            this.closeDialog();
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
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
    EmployeeList,
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
      selectedRowKeys: [],
      employeeSearch: [],
      filter: "",
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
      employeesSourceClone: new DataSource({
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
};
</script>
<style scoped>
@import url(../../css/page/request_detail.css);

#app>div.main>div>div.detail-form-wrapper>form>div.form-body>div>div.dx-scrollable-wrapper>div>div.dx-scrollable-content>div.dx-scrollview-content>div.form-main.p-24>div:nth-child(2)>div:nth-child(3)>div>div {
  height: 19px;
}
</style>
