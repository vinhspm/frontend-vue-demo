//dữ liệu giới tính
export const GENDER_DATA = {
  0: "Nam",
  1: "Nữ",
  2: "Khác",
};

//dữ liệu radio input giới tính
export const GENDER_RADIO_DATA = [
  {
    value: 0,
    name: "cbxGender",
    labelTxt: "Nam",
  },
  {
    value: 1,
    name: "cbxGender",
    labelTxt: "Nữ",
  },
  {
    value: 2,
    name: "cbxGender",
    labelTxt: "Khác",
  },
];

// giá trị mặc định của phân trang
export const DEFAULT_PARAMS = {
  pageSize: 20,
  pageNumber: 1,
  employeeFilter: "",
};


// rules validate của các trường
export const EMPLOYEE_FIELD_RULES = {
  EmployeeCode: ["require"],
  FullName: ["require"],
  DepartmentId: ["require"],
};

// code các rules validate
export const RULE_CODES = {
  REQUIRE: "require",
};

// code các rules validate
export const TIME_OUT_VALUE = 10000;

// enum error code
export const ERROR_CODE = {
  EXCEPTION: 1,
  INVALID_INPUT: 2,
  NOTNULL_INPUT: 3,
  DUPLICATE_INPUT: 4,
};

// GIÁ TRỊ VALID BAN ĐẦU CỦA CÁC TRƯỜNG CẦN VALIDATE BẢNG NHÂN VIÊN
export const DEFAULT_FIELD_VALID = {
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
}

// loại popup cảnh báo
export const DIALOG_TYPE = {
  ALERT: "alert",
  WARNING: "warning",
  SELECTABLE: "selectable",
  ASK_CANCELABLE: "ask",
};

//lựa chọn số bản ghi trên 1 trang
export const PAGING_OPTION = [
  { Value: "15", Name: "15 bản ghi trên 1 trang" },
  { Value: "25", Name: "25 bản ghi trên 1 trang" },
  { Value: "50", Name: "50 bản ghi trên 1 trang" },
  { Value: "100", Name: "100 bản ghi trên 1 trang" },
];

// độ dài tối đa của input 
export const MAX_LENGTH = {
  EMPLOYEE_CODE: 25,
  EMPLOYEE_NAME: 100
}