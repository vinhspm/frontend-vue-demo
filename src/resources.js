// text cảnh báo
export const WARNING_TXT = {
  DELETE: "Bạn có thực sự muốn xoá ",
  DATA_CHANGED: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
  REQUIRE: " không được để trống",
  dataNotInList: (fieldName) => {
    return "Dữ liệu <" + fieldName + "> không tồn tại trong danh mục";
  },
  EXISTED_IN_SYSTEM: "đã tồn tại trong hệ thống, vui lòng kiểm tra lại.",
  INVALID_INPUT: "Dữ liệu đầu vào không hợp lệ, vui lòng nhập lại trường ",
  DEFAULT_ERROR_MSG: "Có lỗi xảy ra, vui lòng liên hệ với MISA"
};

//text thông tin
export const INFO_TXT = {
  DELETE_SUCCESS: "Xoá thành công",
  DELETE_FAIL: "Xoá thất bại",
  ADD_SUCCESS: "Thêm mới thành công",
  ADD_FAIL: "Thêm mới thất bại",
  UPDATE_SUCCESS: "Sửa thành công",
  UPDATE_FAIL: "Sửa thất bại"

};

// dữ liệu các header của bảng nhân viên
export const REQUEST_LIST_HEADER = [
  {
    dataField: "EmployeeCode",
    caption: "Mã nhân viên",
    width: 120,
  },
  {
    dataField: "FullName",
    caption: "Người nộp đơn",
    width: 220,
    cellTemplate: 'cell-avatar-name'
  },
  {
    dataField: "PositionName",
    caption: "Vị trí công việc",
    width: 170,
  },
  {
    dataField: "DepartmentName",
    caption: "Đơn vị công tác",
    width: 220,

  },
  {
    dataField: "ApplyDate",
    caption: "Ngày nộp đơn",
    width: 150,
    dataType: "datetime",
    alignment: "center",
    format: "dd/MM/yyyy HH:mm"
  },
  {
    dataField: "FromDate",
    caption: "Làm thêm từ",
    width: 150,
    dataType: "datetime",
    alignment: "center",
    format: "dd/MM/yyyy HH:mm"
  },
  {
    dataField: "ToDate",
    caption: "Làm thêm đến",
    width: 150,
    dataType: "datetime",
    alignment: "center",
    format: "dd/MM/yyyy HH:mm"
  },
  {
    dataField: "OverTimeInWorkingShift",
    caption: "Thời điểm làm thêm",
    width: 120,
    cellTemplate: 'cell-overtimeworkshift-name',
    alignment: "left",
  },
  {
    dataField: "WorkingShift",
    caption: "Ca làm thêm",
    width: 150,
    cellTemplate: 'cell-workingshift-name',
    alignment: "left",
  },
  {
    dataField: "Reason",
    caption: "Lý do làm thêm",
    width: 220,
  },
  {
    dataField: "ApprovalToName",
    caption: "Người duyệt",
    width: 150,
  },
  {
    dataField: "Description",
    caption: "Ghi chú",
    width: 220,
  }
];


//text tiếng việt của các trường
export const FIELD_NAME_VN = {
  CODE: "Mã nhân viên",
  FULLNAME: "Họ và tên",
  DEPARTMENT: "Đơn vị",
  DepartmentId: "Đơn vị",
  POSITION: "Vị trí",
  EMPLOYEE: "Nhân viên",

  EmployeeCode: "Mã nhân viên",
  FullName: "Họ và tên",
  PositionId: "Vị trí",
  Gender: "Giới tính",
  Email: "Email",
  IdentityNumber: "Số chứng minh nhân dân",
  IdentityPlace: "Nơi cấp",
  Address: "Địa chỉ",
  Phone: "Điện thoại di động",
  HomePhone: "Điện thoại cố định",
  BankAccount: "Tài khoản ngân hàng",
  BankName: "Tên ngân hàng",
  BankBranch: "Chi nhánh"

};

// field name tiếng anh
export const FIELD_NAME_EN = {
  DepartmentId: "DepartmentId",
  PositionId: "PositionId",
};

// message validate cho custom rule 
export const CUSTOM_VALIDATE_MSG = {
  BREAKTIME_FROM: {
    NOT_NULL: 'Nghỉ giữa ca từ không được để trống khi đã nhập Nghỉ giữa ca đến',
    INVALID_INPUT: 'Nghỉ giữa ca từ phải lớn hơn hoặc bằng Làm thêm từ'
  },
  BREAKTIME_TO: {
    NOT_NULL: 'Nghỉ giữa ca đến không được để trống khi đã nhập Nghỉ giữa ca từ',
    INVALID_INPUT: 'Nghỉ giữa ca đến phải lớn hơn hoặc bằng Nghỉ giữa ca từ'
  },
  TO_DATE: {
    INVALID_INPUT: 'Làm thêm đến phải lớn hơn hoặc bằng Nghỉ giữa ca đến'
  },
}
