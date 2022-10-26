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

          <DxButton text="Lưu" class="btn btn--save" @click="buttonSaveClicked" />
        </div>
      </div>
      <div class="form-body">
        <DxScrollView :scroll-by-thumb="true">

          <div class="form-main p-24">
            <div class="col">
              <div class="form-field">
                <label class="input--label"><b>Người nộp đơn</b></label>
                <DxSelectBox :data-source="employeesSource" v-model:value="selectedRequest.EmployeeId" display-expr="FullName"
                  value-expr="EmployeeId" search-enabled="true" search-mode="contains" search-expr="FullName"
                  :search-timeout="200" item-template="item" @value-changed="onValueEmployeeChanged" placeholder=""
                  :disabled="viewType !== 3 || isDisableAll">
                  <DxValidator>
                    <DxRequiredRule :message="notNullMsg"/>
                  </DxValidator>
                  <template #item="{ data }">
                    <NameCell :cell-data="data.FullName" />
                  </template>
                </DxSelectBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Đơn vị công tác</b></label>
                <DxSelectBox :data-source="departments" v-model:value="selectedRequest.DepartmentId" disabled="true"
                  display-expr="DepartmentName" value-expr="DepartmentId" placeholder="" />
              </div>
              <div class="form-field">
                <label class="input--label"><b>Ngày nộp đơn</b></label>
                <DxDateBox v-model:value="selectedRequest.ApplyDate" cancel-button-text="Huỷ" apply-button-text="Lưu"
                  display-format="dd/MM/yyyy HH:mm" type="datetime" placeholder="DD/MM/YYYY HH:mm"
                  :disabled="isDisableAll" >
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg"/>
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Làm thêm từ </b></label>
                <DxDateBox v-model:value="selectedRequest.FromDate" cancel-button-text="Huỷ" apply-button-text="Lưu"
                  display-format="dd/MM/yyyy HH:mm" type="datetime" placeholder="DD/MM/YYYY HH:mm"
                  :disabled="isDisableAll" >
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg"/>
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Nghỉ giữa ca từ </b></label>
                <DxDateBox cancel-button-text="Huỷ" apply-button-text="Lưu" display-format="dd/MM/yyyy HH:mm"
                  :disabled="isDisableAll" type="datetime" placeholder="DD/MM/YYYY HH:mm"
                  v-model:value="selectedRequest.BreakTimeFrom" >
                  <DxValidator :height="34">
                    <!-- <DxRequiredRule :message="notNullMsg"/> -->
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Nghỉ giữa ca đến</b> </label>
                <DxDateBox cancel-button-text="Huỷ" apply-button-text="Lưu" display-format="dd/MM/yyyy HH:mm"
                  :disabled="isDisableAll" type="datetime" placeholder="DD/MM/YYYY HH:mm"
                  v-model:value="selectedRequest.BreakTimeTo" />
              </div>
              <div class="form-field">
                <label class="input--label"><b>Làm thêm đến</b> </label>
                <DxDateBox v-model:value="selectedRequest.ToDate" cancel-button-text="Huỷ" apply-button-text="Lưu"
                  display-format="dd/MM/yyyy HH:mm" type="datetime" placeholder="DD/MM/YYYY HH:mm"
                  :disabled="isDisableAll" >
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg"/>
                  </DxValidator>
                </DxDateBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Thời điểm làm thêm </b></label>
                <DxSelectBox :data-source="workTimes" v-model:value="selectedRequest.OverTimeInWorkingShift" display-expr="txt"
                  value-expr="value" placeholder="" :disabled="isDisableAll" > 
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg"/>
                  </DxValidator>
                </DxSelectBox>
              </div>


            </div>
            <div class="col">
              <div class="form-field">
                <label><b>Lý do làm thêm</b></label>
                <DxTextArea :height="90" v-model:value="selectedRequest.Reason" :disabled="isDisableAll" />
              </div>
              <div class="form-field">
                <label><b>Người duyệt</b></label>
                <DxSelectBox :data-source="employeesSource" v-model:value="selectedRequest.ApprovalToId"
                  display-expr="FullName" value-expr="EmployeeId" search-enabled="true" search-mode="contains"
                  search-expr="FullName" :search-timeout="200" item-template="item" placeholder=""
                  :disabled="isDisableAll">
                  <template #item="{ data }">
                    <NameCell :cell-data="data.FullName" />
                  </template>
                </DxSelectBox>
              </div>
              <div class="form-field">
                <label class="input--label"><b>Trạng thái </b></label>
                <DxSelectBox :data-source="statuses" v-model:value="selectedRequest.Status" display-expr="txt"
                  value-expr="value" placeholder="" :disabled="isDisableAll" v-if="viewType !== 1" >
                  <DxValidator :height="34">
                    <DxRequiredRule :message="notNullMsg"/>
                  </DxValidator>
                </DxSelectBox>
                <div v-if="viewType === 1" style="height: 33px">
                  <StatusCell :cell-data="{ value: selectedRequest.Status }" />
                </div>
              </div>
            </div>
          </div>
          <div class="form-note p-24"></div>
        </DxScrollView>
      </div>

    </form>
  </div>
  <EmployeeList v-if="true"/>
</template>
<script>
import {
  DxTextArea,
} from 'devextreme-vue/text-area';

import lodash from "lodash";
import {
  DEFAULT_REQUEST,
  DATETIME_OPTIONS,
  DEFAULT_EMPLOYEE_LIST,
  DEFAULT_DEPARTMENT_LIST,
  WORK_TIME,
  REQUEST_STATUS_ARRAY,
  DETAIL_VIEW_TYPE,
} from "../../enum.js";
import DxDateBox from 'devextreme-vue/date-box';
import { DxScrollView } from "devextreme-vue/scroll-view";

import { locale } from "devextreme/localization";
import { getRequestDetail, postRequest, putRequest } from '../../assets/axios/requestController/requestController.js'
import {
  DxValidator,
  DxRequiredRule,
  DxCustomRule
} from 'devextreme-vue/validator';
import StatusCell from "../../components/base/StatusCell.vue";
import NameCell from "../../components/base/NameCell.vue";
import { DxSelectBox } from "devextreme-vue/select-box";
import { DxButton } from "devextreme-vue";
import "devextreme-vue/text-area";
import DataSource from "devextreme/data/data_source";
import { getEmployees } from '../../assets/axios/employeeController/employeeController.js'
import { getDepartments } from '../../assets/axios/departmentController/departmentController.js'
import EmployeeList from './EmployeeList.vue';
import DxTextBox from "devextreme/ui/text_box";
import Store from 'devextreme/data/abstract_store';
export default {
  components: {
    DxButton,
    DxTextArea,
    DxScrollView,
    DxValidator,
    DxRequiredRule,
    DxCustomRule,
    DxSelectBox,
    DxDateBox,
    StatusCell,
    NameCell,
    DxTextBox,
    EmployeeList
  },
  created() {
    locale("vi");
    this.getEmployeesAndDepartments();
    this.statuses.splice(0, 1);
    if (this.viewType === DETAIL_VIEW_TYPE.ADDNEW) {
      this.formTitle = "Thêm mới đăng ký làm thêm";
    } else {
      if (this.viewType === DETAIL_VIEW_TYPE.EDIT) {
        this.formTitle = "Sửa đăng ký làm thêm";

      } else {
        this.formTitle = "Chi tiết đăng ký làm thêm";
      }
      this.getSelectedData();
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
      notNullMsg:"Trường không được để trống",
      workTimes: WORK_TIME,
      isDisableAll: false,
      statuses: lodash.cloneDeep(REQUEST_STATUS_ARRAY),
      buttonOptions: {
        text: "Register",
        type: "success",
        useSubmitBehavior: true,
      },
      employeesSource: new DataSource({
        store: {
          type: "array",
          key: "EmployeeId",
          data: []
        },
        paginate: true,
        pageSize: 10
      })
    };
  },
  watch: {
    "employees.length": {
      handler() {
        this.employeesSource = new DataSource({
          store: {
            type: "array",
            key: "EmployeeId",
            data: this.employees
          },
          paginate: true,
          pageSize: 10
        });
      },
      immediate: true
    },
    viewType: {
      handler(val) {
        if (val === DETAIL_VIEW_TYPE.EDIT || val === DETAIL_VIEW_TYPE.ADDNEW) {
          this.isDisableAll = false;
        } else {
          this.isDisableAll = true
        }
        console.log(this.selectedRequestId);
      },
      immediate: true
    }
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
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
    async getSelectedData() {
      const res = await getRequestDetail(this.selectedRequestId);
      if (res) {
        this.selectedRequest = res.data;
      }
    },

    async getEmployeesAndDepartments() {
      const resEmp = await getEmployees();
      if (resEmp) {
        this.employees = resEmp.data;
      }
      const resDpm = await getDepartments();
      if (resDpm) {
        this.departments = resDpm.data;
      }
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
      if(res.isValid) {
        this.onSave();
      }
    },
    async onSave() {
      this.selectedRequest.DepartmentId = null;
      if(this.viewType === DETAIL_VIEW_TYPE.ADDNEW) {
        const res = await postRequest(this.selectedRequest);
      } else {
        const res = await putRequest(this.selectedRequestId,this.selectedRequest);
      }
    }
  },
};
</script>
<style scoped>
@import url(../../css/page/request_detail.css);

#app>div.main>div>div.detail-form-wrapper>form>div.form-body>div>div.dx-scrollable-wrapper>div>div.dx-scrollable-content>div.dx-scrollview-content>div.form-main.p-24>div:nth-child(2)>div:nth-child(3)>div>div {
  height: 19px;
}
</style>
