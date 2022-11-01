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

//data department
export const DEFAULT_DEPARTMENT_LIST = [
  {
    DepartmentId: '',
    DepartmentName: "Khối kĩ thuật",
    expanded: true,
    items: [
      {
        DepartmentId: '11452b0c-768e-5ff7-0d63-eeb1d8ed8cef',
        DepartmentName: " Phòng công nghệ thông tin ",
      },
      {
        DepartmentId: '469b3ece-744a-45d5-957d-e8c757976496',
        DepartmentName: " Phòng nghiên cứu và phát triển ",
      }

    ]
  },
  {
    DepartmentId: '',
    DepartmentName: "Khối quản trị kinh doanh",
    expanded: true,
    items: [
      {
        DepartmentId: '17120d02-6ab5-3e43-18cb-66948daf6128',
        DepartmentName: " Phòng marketing ",
      },
      {
        DepartmentId: '4e272fc4-7875-78d6-7d32-6a1673ffca7c',
        DepartmentName: "Phòng hành chính ",
      },
      {
        DepartmentId: '768f8e64-7d10-20c9-967d-e8c757976496',
        DepartmentName: "Phòng kế toán",
      }
    ]
  },
  {
    DepartmentId: '',
    DepartmentName: "Khối nhân sự điều hành",
    expanded: true,
    items: [
      {
        DepartmentId: '142cb08f-7c31-21fa-8e90-67245e8b283e',
        DepartmentName: " Phòng truyền thông nội bộ ",
      },
      {
        DepartmentId: '4577565a-7e3e-493a-74dd-867949feb8b5',
        DepartmentName: " Phòng nhân sự ",
      }

    ]
  }
]

// thời điểm làm việc
export const WORK_TIME = [
  {
    value: 1,
    txt: "Trước ca",
  },
  {
    value: 2,
    txt: "Sau ca",
  },
  {
    value: 3,
    txt: "Nghỉ giữa ca",
  },
  {
    value: 4,
    txt: "Ngày nghỉ",
  },
];

// ca làm việc
export const WORK_SHIFT = 
[
  {
    value: 1,
    txt: "Ca chấm 1 lần",
  },
];
//date time options
export const DATETIME_OPTIONS = {
  cancelButtonText: "Huỷ",
  applyButtonText: "Lưu",
  dateOutOfRangeMessage: "Giá trị không hợp lệ",
  displayFormat: "dd/MM/yyyy HH:mm",
  invalidDateMessage: "Giá trị không hợp lệ",
  type: "datetime",
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
  INVALId_INPUT: 2,
  NOTNULL_INPUT: 3,
  DUPLICATE_INPUT: 4,
};

// GIÁ TRỊ VALId BAN ĐẦU CỦA CÁC TRƯỜNG CẦN VALIdATE BẢNG NHÂN VIÊN
export const DEFAULT_FIELD_VALId = {
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

// loại popup cảnh báo
export const DIALOG_TYPE = {
  ALERT: "alert",
  WARNING: "warning",
  SELECTABLE: "selectable",
  ASK_CANCELABLE: "ask",
};

//lựa chọn số bản ghi trên 1 trang
export const PAGING_OPTION = [
  { Value: 15, Name: "15 bản ghi trên 1 trang" },
  { Value: 25, Name: "25 bản ghi trên 1 trang" },
  { Value: 50, Name: "50 bản ghi trên 1 trang" },
  { Value: 100, Name: "100 bản ghi trên 1 trang" },
];

// độ dài tối đa của input
export const MAX_LENGTH = {
  EMPLOYEE_CODE: 25,
  EMPLOYEE_NAME: 100,
};

//trạng thái đơn
export const REQUEST_STATUS = {
  APPROVED: {
    value: 1,
    txt: "Đã duyệt",
  },
  WAITING: {
    value: 2,
    txt: "Chờ duyệt",
  },
  DENINED: {
    value: 3,
    txt: "Từ chối",
  },
  ALL: {
    value: -1,
    txt: "Tất cả",
  },
};

// giá trị mặc định của phân trang
export const DEFAULT_PARAMS = {
  pageSize: 15,
  pageNumber: 1,
  departmentId: "",
  status: REQUEST_STATUS.ALL.value,
};

export const REQUEST_STATUS_ARRAY = [
  {
    value: -1,
    txt: "Tất cả",
  },
  {
    value: 1,
    txt: "Đã duyệt",
  },
  {
    value: 2,
    txt: "Chờ duyệt",
  },
  {
    value: 3,
    txt: "Từ chối",
  },
];

export const NUM_PIN_COLUMNS = 12;

// enum phân biệt loại form detail
export const DETAIL_VIEW_TYPE = {
  DETAIL: 1,
  EDIT: 2,
  ADDNEW: 3,
};

// enum cho toast type
export const NOTIFY_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
}