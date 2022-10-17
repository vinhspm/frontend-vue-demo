<template>
  <m-popup
    :componentWidth="900"
    @close-dialog="buttonCloseDialogClicked"
    v-loading="isLoading"
    @keyup.esc="buttonCloseDialogClicked"
    @keydown.ctrl.s.prevent.stop="onSaveOnly"
    @keydown.alt.s.prevent.stop="saveAndContinue"
  >
    <template #header>
      <div class="title">Thông tin nhân viên</div>
      <div class="employee__type__container">
        <div>
          <m-input
            type="checkbox"
            name="employeeType"
            id="customerTypeCheckbox"
          />
          <label for="customerTypeCheckbox">Là khách hàng</label>
        </div>
        <div>
          <m-input
            type="checkbox"
            name="employeeType"
            id="supplierTypeCheckbox"
          />
          <label for="supplierTypeCheckbox">Là nhà cung cấp</label>
        </div>
      </div>
    </template>
    <template #content>
      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col w-30">
              <label>Mã <span class="input--required">*</span></label>
              <m-input
                type="text"
                :modelValue="employeeDetailData.EmployeeCode"
                @update:modelValue="employeeDetailData.EmployeeCode = $event"
                :isRequire="true"
                :fieldNameTxt="fieldNameVnTxt.CODE"
                @field-invalid="(title) => addError(title)"
                @field-valid="(title) => removeError(title)"
                :isValidProp="fieldValid.EmployeeCode"
                :needMountedFocus="true"
                ref="EmployeeCode"
              />
            </div>
            <div class="col w-70">
              <label>Họ và tên <span class="input--required">*</span></label>
              <m-input
                type="text"
                :modelValue="employeeDetailData.FullName"
                @update:modelValue="employeeDetailData.FullName = $event"
                :isRequire="true"
                :fieldNameTxt="fieldNameVnTxt.FULLNAME"
                @field-invalid="(title) => addError(title)"
                @field-valid="(title) => removeError(title)"
                :isValidProp="fieldValid.FullName"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Đơn vị <span class="input--required">*</span></label>
              <m-department-combobox
                :data="departments"
                fieldKey="DepartmentId"
                fieldCode="DepartmentCode"
                fieldName="DepartmentName"
                :modelValue="employeeDetailData.DepartmentId"
                @update:modelValue="employeeDetailData.DepartmentId = $event"
                :isRequire="true"
                :fieldNameTxt="fieldNameVnTxt.DEPARTMENT"
                @field-invalid="(title) => addError(title)"
                @field-valid="(title) => removeError(title)"
                :isValidProp="fieldValid.DepartmentId"
              >
              </m-department-combobox>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Vị trí</label>
              <m-combobox
                :data="positions"
                fieldKey="PositionId"
                fieldName="PositionName"
                :modelValue="employeeDetailData.PositionId"
                @update:modelValue="employeeDetailData.PositionId = $event"
                :fieldNameTxt="fieldNameVnTxt.POSITION"
                @field-invalid="(title) => addError(title)"
                @field-valid="(title) => removeError(title)"
              >
              </m-combobox>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row">
            <div class="col w-40">
              <label>Ngày sinh</label>
              <el-date-picker
                v-model="employeeDetailData.DateOfBirth"
                type="date"
                placeholder="DD/MM/YYYY"
                format="DD/MM/YYYY"
                :disabled-date="disableDate"
                className="input__form"
              />
            </div>
            <div class="col w-60">
              <label>Giới tính</label>
              <div class="row align-center h-32">
                <m-radio
                  :data="genderData"
                  :selected="employeeDetailData.Gender"
                  @update:selectedItem="selectGender($event)"
                ></m-radio>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col w-60">
              <label>Số CMND</label>
              <m-input
                type="text"
                :modelValue="employeeDetailData.IdentityNumber"
                @update:modelValue="employeeDetailData.IdentityNumber = $event"
                :titleProp="fieldNameVnTxt.IdentityNumber"
              />
            </div>
            <div class="col w-40">
              <label>Ngày cấp</label>
              <el-date-picker
                v-model="employeeDetailData.IdentityDate"
                type="date"
                placeholder="DD/MM/YYYY"
                format="DD/MM/YYYY"
                :disabled-date="disableDate"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Nơi cấp</label>
              <m-input
                type="text"
                :modelValue="employeeDetailData.IdentityPlace"
                @update:modelValue="employeeDetailData.IdentityPlace = $event"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <label for="">Địa chỉ</label>
          <m-input
            type="text"
            :modelValue="employeeDetailData.Address"
            @update:modelValue="employeeDetailData.Address = $event"
          />
        </div>
      </div>
      <div class="row">
        <div class="col w-25">
          <label for="">ĐT di động</label>
          <m-input
            type="text"
            :modelValue="employeeDetailData.PhoneNumber"
            @update:modelValue="employeeDetailData.PhoneNumber = $event"
            :titleProp="fieldNameVnTxt.Phone"
          />
        </div>
        <div class="col w-25">
          <label for="">ĐT cố định</label>
          <m-input
            type="text"
            :modelValue="employeeDetailData.HomePhoneNumber"
            @update:modelValue="employeeDetailData.HomePhoneNumber = $event"
            :titleProp="fieldNameVnTxt.HomePhone"
          />
        </div>
        <div class="col w-25">
          <label for="">Email</label>
          <m-input
            type="email"
            :modelValue="employeeDetailData.Email"
            @update:modelValue="employeeDetailData.Email = $event"
          />
        </div>
      </div>
      <div class="row" style="margin-bottom: 30px">
        <div class="col w-25">
          <label for="">Tài khoàn ngân hàng</label>
          <m-input
            type="text"
            :modelValue="employeeDetailData.BankAccount"
            @update:modelValue="employeeDetailData.BankAccount = $event"
          />
        </div>
        <div class="col w-25">
          <label for="">Tên ngân hàng</label>
          <m-input
            type="text"
            :modelValue="employeeDetailData.BankName"
            @update:modelValue="employeeDetailData.BankName = $event"
          />
        </div>
        <div class="col w-25">
          <label for="">Chi nhánh</label>
          <m-input
            type="text"
            :modelValue="employeeDetailData.BankBranch"
            @update:modelValue="employeeDetailData.BankBranch = $event"
          />
          <input
            type="text"
            style="opacity: 0; cursor: context-menu"
            @keyup.tab="
              () => this.$nextTick(() => this.$refs.saveButton.focus())
            "
          />
        </div>
      </div>
    </template>
    <template #footer>
      <button class="button button--cancel" @click="closeDialog" tabindex="3">
        Huỷ
      </button>
      <input
        tabindex="4"
        type="text"
        style="opacity: 0; cursor: context-menu"
        @keyup.tab="() => this.$nextTick(() => this.$refs.EmployeeCode.focus())"
      />

      <div>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Cất (Ctrl + S)"
          placement="bottom"
        >
          <button
            @click="onSaveOnly"
            class="button button--saveonly"
            ref="saveButton"
            tabindex="1"
          >
            Cất
          </button>
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Cất và Thêm (Alt + Shift + S)"
          placement="bottom"
        >
          <button
            @click="saveAndContinue"
            class="button button__icon icon icon--save"
            tabindex="2"
          >
            Cất và Thêm
          </button>
        </el-tooltip>
      </div>
    </template>
  </m-popup>
  <m-warning
    v-if="isShowWarning"
    :text="warningText"
    :dialogType="dialogType.ASK_CANCELABLE"
    @close-warning="closeWarning"
    @ok-warning="okWarning"
    @denied-warning="deniedWarning"
  ></m-warning>
  <m-warning
    v-if="isShowError"
    :text="errorText"
    :dialogType="warningType"
    @close-warning="closeWarning"
  >
  </m-warning>
</template>
<script>
import { WARNING_TXT, FIELD_NAME_VN, INFO_TXT } from "../../resources.js";
import {
  DIALOG_TYPE,
  GENDER_RADIO_DATA,
  EMPLOYEE_FIELD_RULES,
  ERROR_CODE,
  DEFAULT_FIELD_VALID,
} from "../../enum.js";
import { toCamel } from "@/js/base.js";
import {
  getNextEmployee,
  postEmployee,
  putEmployee,
} from "@/axios/employeeController/employeeController.js";
import { getDepartments } from "@/axios/departmentController/departmentController.js";
import { getPositions } from "@/axios/positionController/positionController.js";

import { BaseValidateMixins } from "@/components/base/BaseValidateMixins.js";
import { AxiosError } from "axios";
import { cloneDeep } from "lodash";
import { formatDateInput } from "../../js/base.js";
import { ElNotification } from "element-plus";

export default {
  mixins: [BaseValidateMixins],
  name: "EmployeeDetail",
  data() {
    return {
      isEdit: false,
      employeeDetailData: {},
      departments: [],
      positions: [],
      bodyRequest: {},
      isLoading: false,
      isContinue: false,
      dialogType: DIALOG_TYPE,
      isShowWarning: false,
      isShowError: false,
      warningText: WARNING_TXT.DATA_CHANGED,
      genderData: GENDER_RADIO_DATA,
      fieldNameVnTxt: FIELD_NAME_VN,
      errorList: [],
      errorText: "",
      isFormTouched: false,
      fieldValid: {},
      warningType: DIALOG_TYPE.ALERT,
      isCloseDialogAfterWarning: false,
      infoTxt: INFO_TXT,
    };
  },
  props: {
    selectedEmployee: Object,
  },

  watch: {
    employeeDetailData: {
      handler() {
        if (this.isFormTouched) {
          this.updateValidateData();
          this.updateListError();
        }
        // console.log(this.employeeDetailData);
      },
      deep: true,
    },
  },

  methods: {
    selectGender(val) {
      this.employeeDetailData.Gender =
        val != null ? val : this.employeeDetailData.Gender;
    },
    /**
     * kích hoạt sự kiện đóng form chi tiết
     * author: vinhkt
     * created: 19/09/2022
     */
    closeDialog: function () {
      this.clearForm();
      this.$emit("close-dialog");
    },

    /**
     * khi đóng form kiểm tra dữ liệu có bị thay đổi không và hiện warning
     * author: vinhkt
     * created: 19/09/2022
     */
    buttonCloseDialogClicked() {
      try {
        if (
          JSON.stringify(this.employeeDetailData) ===
          JSON.stringify(this.selectedEmployee)
        ) {
          this.closeDialog();
        } else {
          this.isShowWarning = true;
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * hàm update data mixins dành cho việc validate
     * author: vinhkt
     * created: 24/09/2022
     */
    updateValidateData() {
      try {
        const fieldRules = EMPLOYEE_FIELD_RULES;
        for (const key of Object.keys(fieldRules)) {
          const obj = {
            rules: fieldRules[key],
            value: this.employeeDetailData[key],
          };
          this.needValidateData[key] = obj;
        }
        for (const key of Object.keys(this.employeeDetailData)) {
          const obj = {
            rules: fieldRules[key],
            value: this.employeeDetailData[key],
          };
          this.needValidateData[key] = obj;
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * hàm update listError để truyền vào component con
     * author: vinhkt
     * created: 21/09/2022
     */
    updateListError() {
      try {
        const listError = this.validateData();
        for (let key of Object.keys(this.fieldValid)) {
          if (listError[key]) {
            this.fieldValid[key].value = false;
            this.fieldValid[key].msg = listError[key];
          } else {
            this.fieldValid[key].value = true;
            this.fieldValid[key].msg = "";
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * hàm tương ứng với nút cất, sẽ đẩy thông tin lên server rồi đóng form
     * author: vinhkt
     * created: 21/09/2022
     */
    onSaveOnly: function () {
      try {
        this.isFormTouched = true;
        this.updateValidateData();
        this.updateListError();
        for (let key of Object.keys(this.fieldValid)) {
          if (!this.fieldValid[key].value) {
            this.errorText = this.fieldValid[key].msg;
            this.isShowError = true;
            return;
          }
        }
        if (this.errorList.length) {
          this.errorText = this.errorList[0];
          this.isShowError = true;
        } else {
          this.formatDateRequest();
          this.bodyRequest = toCamel(this.employeeDetailData);
          if (this.isEdit) {
            this.updateEmployee();
          } else {
            this.addNewEmployee();
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * hàm format date để gửi lên server
     * author: vinhkt
     * created: 11/10/2022
     */
    formatDateRequest() {
      this.employeeDetailData.DateOfBirth = formatDateInput(
        this.employeeDetailData.DateOfBirth
      );
      this.employeeDetailData.IdentityDate = formatDateInput(
        this.employeeDetailData.IdentityDate
      );
    },

    /**
     * hàm tương ứng với nút cất và thêm, sẽ đẩy thông tin lên server rồi clear form để thêm mới
     * author: vinhkt
     * created: 21/09/2022
     */
    saveAndContinue() {
      this.isContinue = true;
      this.onSaveOnly();
    },

    /**
     * làm mới form chi tiết để thêm mới
     * author: vinhkt
     * created: 16/09/2022
     */
    clearForm() {
      try {
        this.isEdit = false;
        this.employeeDetailData = {};
        this.bodyRequest = {};
        this.isContinue = false;
        this.errorList = [];
        this.isFormTouched = false;
        this.fieldValid = {
          EmployeeCode: {
            value: true,
            msg: "",
          },
          FullName: {
            value: true,
            msg: "",
          },
          DepartmentId: {
            value: true,
            msg: "",
          },
        };
        this.getNextEmpId();
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * api thêm mới nhân viên
     * author: vinhkt
     * created: 21/09/2022
     */
    addNewEmployee: async function () {
      this.isLoading = true;
      const body = this.bodyRequest;
      try {
        const response = await postEmployee(body);
        if (response) {
          console.log(response.data);
          this.isLoading = false;
          if (this.isContinue) {
            this.clearForm();
          } else {
            this.closeDialog();
          }
          ElNotification({
            // title: "Thông báo",
            message: this.infoTxt.ADD_SUCCESS,
            position: "bottom-right",
            type: "success",
            duration: 1000,
          });
          this.$emit("reload-data");
        }
      } catch (error) {
        this.handleError(error);
        this.isLoading = false;
      }
    },

    /**
     * api update nhân viên
     * author: vinhkt
     * created: 21/09/2022
     */
    updateEmployee: async function () {
      this.isLoading = true;
      const body = this.bodyRequest;
      const id = this.employeeDetailData.EmployeeId;
      try {
        const response = await putEmployee(id, body);
        if (response) {
          console.log(response.data);
          this.isLoading = false;
          if (this.isContinue) {
            this.clearForm();
          } else {
            this.closeDialog();
          }
          ElNotification({
            message: this.infoTxt.UPDATE_SUCCESS,
            position: "bottom-right",
            type: "success",
            duration: 1000,
          });
          this.$emit("reload-data");
        }
      } catch (error) {
        console.log(error);
        this.handleError(error);
        this.isLoading = false;
      }
    },

    /**
     * hàm disable ngày quá ngày hiện tại
     * @param {ngày truyền vào} date
     */
    disableDate(date) {
      if (date.getTime() <= new Date()) {
        return false;
      }
      return true;
    },

    /**
     * hàm xử lý lỗi trả về từ axios
     * author: vinhkt
     * created: 03/10/2022
     * @param {lỗi axios trả về} error
     */
    handleError(error) {
      try {
        const errorData = error.response.data;
        if (error.code === AxiosError.ERR_BAD_REQUEST) {
          if (errorData.Code === ERROR_CODE.DUPLICATE_INPUT) {
            (this.isShowError = true),
              (this.errorText =
                FIELD_NAME_VN[errorData.MoreInfo] +
                " <" +
                this.employeeDetailData[errorData.MoreInfo] +
                "> " +
                WARNING_TXT.EXISTED_IN_SYSTEM);
            this.warningType = DIALOG_TYPE.WARNING;
          } else if (errorData.Code === ERROR_CODE.INVALID_INPUT) {
            this.isShowError = true;
            this.errorText =
              WARNING_TXT.INVALID_INPUT + FIELD_NAME_VN[errorData.MoreInfo];
            this.warningType = DIALOG_TYPE.WARNING;
          }
        } else {
          this.isShowError = true;
          this.isCloseDialogAfterWarning = true;
          this.errorText = errorData.UserMsg | WARNING_TXT.DEFAULT_ERROR_MSG;
          this.warningType = DIALOG_TYPE.WARNING;
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * tắt popup cảnh báo
     * author: vinhkt
     * created: 21/09/2022
     */
    closeWarning() {
      this.isShowWarning = false;
      this.isShowError = false;
      this.$nextTick(() => {
        this.$refs.EmployeeCode.focus();
      });
      if (this.isCloseDialogAfterWarning) {
        this.closeDialog();
      }
    },

    /**
     * xác nhận người dùng đồng ý với popup cảnh báo
     * author: vinhkt
     * created: 21/09/2022
     */
    okWarning() {
      this.onSaveOnly();
      this.closeWarning();
    },

    /**
     * xác nhận người dùng đồng ý với popup cảnh báo
     * author: vinhkt
     * created: 16/09/2022
     */
    deniedWarning() {
      this.closeWarning();
      this.closeDialog();
    },

    /**
     * lấy mã nhân viên kế tiếp với form thêm mới bằng api
     * author: vinhkt
     * created: 16/09/2022
     */
    getNextEmpId: async function () {
      try {
        const response = await getNextEmployee();
        if (response) {
          this.employeeDetailData.EmployeeCode = response.data.toString();
          this.isLoading = false;
        }
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },

    /**
     * hàm thêm một lỗi của trường nhập liệu vào danh sách nếu chưa có
     * author: VinhKT
     * created: 21/09/2022
     */
    addError(title) {
      try {
        if (this.errorList.includes(title)) {
          return;
        } else {
          this.errorList.push(title);
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * hàm xoá một lỗi của trường nhập liệu khỏi danh sách
     * author: VinhKT
     * created: 21/09/2022
     */
    removeError(title) {
      try {
        if (this.errorList.includes(title)) {
          const index = this.errorList.indexOf(title);
          if (index > -1) {
            this.errorList.splice(index, 1);
          }
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
      }
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
        }
        if (positionResponse) {
          this.positions = positionResponse.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },

  /**
   * kiểm tra xem người dùng đang update hay thêm mới nhân viên
   * gán thông tin nhân viên được chọn để update vào data của component để có thể binding hai chiều
   * author: vinhkt
   * created: 18/09/2022
   */
  created() {
    try {
      this.fieldValid = cloneDeep(DEFAULT_FIELD_VALID);
      this.getDepartmentAndPositionData();
      if (
        Object.prototype.hasOwnProperty.call(
          this.selectedEmployee,
          "EmployeeCode"
        )
      ) {
        this.employeeDetailData = { ...this.selectedEmployee };
        this.isEdit = true;
      } else {
        this.isEdit = false;
        this.getNextEmpId();
      }
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
<style scoped>
@import url(../../css/page/employee_detail.css);
</style>
