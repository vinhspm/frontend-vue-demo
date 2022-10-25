<template>
  <div class="detail-form-wrapper">
    <!-- <DxScrollView :scroll-by-thumb="true"> -->
    <form action="#" @submit="handleSubmit">
      <DxForm
        id="form"
        :form-data="selectedRequest"
        :show-colon-after-label="false"
        :disabled="viewType === 1"
        :show-validation-summary="true"
        validation-group="data"
      >
        <DxButtonItem
          horizontal-alignment="right"
          :button-options="buttonOptions"
          css-class="d-none"
          ref="buttonSave"
        />

        <DxGroupItem>
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

              <button class="btn btn--save" type="submit" @click="$refs.buttonSave.click()">Lưu</button>
            </div>
          </div>
        </DxGroupItem>
        <DxGroupItem css-class="form-body">
          <!-- <div class="form-body"> -->
          <!-- <div class="form-main p-24"> -->
          <DxGroupItem :col-count="15" css-class="form-main">
            <DxGroupItem :col-span="7">
              <DxSimpleItem data-field="EmployeeId">
                <DxRequiredRule message="Email is required" />
                <DxLabel text="Người nộp đơn" css-class="input--label" />
                <DxSelectBox
                  :data-source="employees"
                  :value="selectedEmployeeId"
                  display-expr="FullName"
                  value-expr="EmployeeId"
                  search-enabled="true"
                  search-mode="contains"
                  search-expr="FullName"
                  :search-timeout="200"
                  item-template="item"
                  @value-changed="onValueEmployeeChanged"
                  placeholder=""
                  :disabled="viewType === 2"
                  :on-content-ready="
                    (e) => {
                      if (viewType === 3) e.component.focus();
                    }
                  "
                >
                  <template #item="{ data }">
                    <NameCell :cell-data="data.FullName" />
                  </template>
                </DxSelectBox>
              </DxSimpleItem>
              <DxSimpleItem data-field="DepartmentId">
                <DxLabel text="Đơn vị công tác" css-class="input--label" />
                <DxSelectBox
                  :data-source="departments"
                  :value="selectedDepartment"
                  disabled="true"
                  display-expr="DepartmentName"
                  value-expr="DepartmentId"
                  placeholder=""
                />
              </DxSimpleItem>
              <DxSimpleItem
                data-field="ApplyDate"
                editor-type="dxDateBox"
                :editor-options="dateTimeOptions"
              >
                <DxRequiredRule message="Email is required" />

                <DxLabel text="Ngày nộp đơn" css-class="input--label" />
              </DxSimpleItem>
              <DxSimpleItem
                data-field="FromDate"
                editor-type="dxDateBox"
                :editor-options="dateTimeOptions"
              >
                <DxLabel text="Làm thêm từ" css-class="input--label" />
              </DxSimpleItem>
              <DxSimpleItem
                data-field="BreakTimeFrom"
                editor-type="dxDateBox"
                :editor-options="dateTimeOptions"
              >
                <DxLabel text="Nghỉ giữa ca từ" css-class="input--label" />
              </DxSimpleItem>
              <DxSimpleItem
                data-field="BreakTimeTo"
                editor-type="dxDateBox"
                :editor-options="dateTimeOptions"
              >
                <DxLabel text="Nghỉ giữa ca đến" css-class="input--label" />
              </DxSimpleItem>
              <DxSimpleItem
                data-field="ToDate"
                editor-type="dxDateBox"
                :editor-options="dateTimeOptions"
              >
                <DxLabel text="Làm thêm đến" css-class="input--label" />
              </DxSimpleItem>
              <DxSimpleItem data-field="OverTimeInWorkingShiftName">
                <DxLabel text="Thời điểm làm thêm" css-class="input--label" />
                <DxSelectBox
                  :data-source="workTimes"
                  v-model="selectedOverTimeInWorkingShiftName"
                  @value-changed="onValueChanged"
                  display-expr="label"
                  value-expr="label"
                  placeholder=""
                />
              </DxSimpleItem>
            </DxGroupItem>
            <DxGroupItem :col-span="1" />
            <DxGroupItem :col-span="7">
              <DxSimpleItem
                data-field="Reason"
                editor-type="dxTextArea"
                :editor-options="{ height: 90 }"
              >
                <DxLabel text="Lý do làm thêm" css-class="textarea--label" />
              </DxSimpleItem>
              <DxSimpleItem data-field="ApprovalName">
                <DxLabel text="Người duyệt" css-class="input--label" />
              </DxSimpleItem>
              <DxSimpleItem data-field="Status">
                <DxLabel text="Trạng thái" css-class="input--label" />
                <DxSelectBox
                  :data-source="statuses"
                  v-model="selectedStatus"
                  @value-changed="onValueChanged"
                  display-expr="txt"
                  value-expr="value"
                  v-if="viewType === 2 || viewType === 3"
                  placeholder=""
                />
                <StatusCell :cell-data="selectedStatus" v-if="viewType === 1" />
              </DxSimpleItem>
            </DxGroupItem>
          </DxGroupItem>
          <DxGroupItem css-class="form-note p-24"> </DxGroupItem>
          <!-- </div> -->
          <!-- <div class="form-note p-24"></div> -->
          <!-- </div> -->
        </DxGroupItem>
      </DxForm>
    </form>
    <!-- </DxScrollView> -->
  </div>
</template>
<script>
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
import { DxScrollView } from "devextreme-vue/scroll-view";

import { locale } from "devextreme/localization";
import {
  DxForm,
  DxSimpleItem,
  DxGroupItem,
  DxItem,
  DxLabel,
  DxButtonItem,
  DxRequiredRule,
} from "devextreme-vue/form";
import StatusCell from "../../components/base/StatusCell.vue";
import NameCell from "../../components/base/NameCell.vue";
import { DxSelectBox } from "devextreme-vue/select-box";
import "devextreme-vue/text-area";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxScrollView,
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxItem,
    DxLabel,
    DxButtonItem,
    DxRequiredRule,
    DxSelectBox,
    StatusCell,
    NameCell,
  },
  created() {
    locale("vi");
    this.getEmployeesAndDepartments();
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
      workTimes: WORK_TIME,
      statuses: lodash.cloneDeep(REQUEST_STATUS_ARRAY),
      selectedEmployeeId: null,
      selectedDepartment: null,
      selectedOverTimeInWorkingShiftName: null,
      selectedStatus: null,
      buttonOptions: {
        text: "Register",
        type: "success",
        useSubmitBehavior: true,
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    onValueEmployeeChanged(event) {
      const index = DEFAULT_EMPLOYEE_LIST.findIndex(
        (ele) => ele.EmployeeId === event.value
      );
      if (index > -1) {
        this.selectedDepartment = DEFAULT_EMPLOYEE_LIST[index].DepartmentId;
      } else {
        console.log("không thấy");
      }
    },
    async getSelectedData() {
      this.selectedRequest = lodash.cloneDeep(DEFAULT_REQUEST);

      this.selectedEmployeeId = this.selectedRequest.EmployeeId;
      this.selectedDepartment = this.selectedRequest.DepartmentId;
      this.selectedOverTimeInWorkingShiftName =
        this.selectedRequest.OverTimeInWorkingShiftName;
      this.statuses[0].disabled = true;
      this.selectedStatus = this.selectedRequest.Status;
    },

    async getEmployeesAndDepartments() {
      this.employees = DEFAULT_EMPLOYEE_LIST;
      this.departments = DEFAULT_DEPARTMENT_LIST;
    },
    editRequest() {
      console.log("edit", this.selectedRequest.OverTimeId);
      this.closeDialog();
      this.$emit("toggle-dialog", {
        type: DETAIL_VIEW_TYPE.EDIT,
        selectedRequestId: this.selectedRequest.OverTimeId,
      });
    },
    onValueChanged(event) {
      console.log(event);
    },
  },
};
</script>
<style scoped>
@import url(../../css/page/request_detail.css);
.form-header {
  height: 36px;
  padding-bottom: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 10px;
}
.button-back {
  height: 24px;
  width: 24px;
  -webkit-mask-image: url(../../assets/Icon.ad7c4b8.svg);
  -webkit-mask-position: -48px -48px;
  background-color: #666;
  margin-right: 12px;
  cursor: pointer;
}
h2 {
  margin: 0;
}

.form-body {
  /* display: table-cell; */
  width: 100%;
  height: calc(100% - 84px);
  overflow-y: scroll;
  background-color: #eeeeee;
  border-radius: 4px;
}
.form-main {
  /* min-height: 590px; */
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 16px;
}

.form-note {
  min-height: 260px;
  background-color: #fff;
  border-radius: 4px;
}
</style>
