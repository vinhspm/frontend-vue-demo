import {GENDER_DATA} from './enum.js'
// route path và data của menu
export const MENU_ITEMS = [
  {
    text: "Tổng quan",
    iconCoordinates: [29, 1628],
    activeClass: "dashboard_icon__active",
    route: "/tong-quan",
  },
  {
    text: "Tiền mặt",
    iconCoordinates: [73, 1629],
    activeClass: "cash_icon__active",
    route: "/nhan-vien",
  },
  {
    text: "Tiền gửi",
    iconCoordinates: [117, 1630],
    activeClass: "deposit_icon__active",
    route: "/tien-gui",
  },
  {
    text: "Mua hàng",
    iconCoordinates: [161, 1631],
    activeClass: "buy_icon__active",
    route: "/mua-hang",
  },
  {
    text: "Bán hàng",
    iconCoordinates: [206, 1628],
    activeClass: "sell_icon__active",
    route: "/ban-hang",
  },
  {
    text: "Quản lý hoá đơn",
    iconCoordinates: [249, 1629],
    activeClass: "bill_icon__active",
    route: "/quan-ly-hoa-don",
  },
  {
    text: "Kho",
    iconCoordinates: [291, 1630],
    activeClass: "warehouse_icon__active",
    route: "/kho",
  },
  {
    text: "Công cụ dụng cụ",
    iconCoordinates: [336, 1630],
    activeClass: "tool_icon__active",
    route: "/cong-cu-dung-cu",
  },
  {
    text: "Tài sản cố định",
    iconCoordinates: [380, 1630],
    activeClass: "static_asset_icon__active",
    route: "/tai-san-co-dinh",
  },
  {
    text: "Tiền lương",
    iconCoordinates: [471, 1661],
    activeClass: "salary_icon__active",
    route: "/tien-luong",
  },
  {
    text: "Thuế",
    iconCoordinates: [425, 1631],
    activeClass: "tax_icon__active",
    route: "/thue",
  },
  {
    text: "Giá thành",
    iconCoordinates: [470, 1630],
    activeClass: "price_icon__active",
    route: "/gia-thanh",
  },
  {
    text: "Tổng hợp",
    iconCoordinates: [514, 1629],
    activeClass: "summary_icon__active",
    route: "/tong-hop",
  },
  {
    text: "Ngân sách",
    iconCoordinates: [381, 1659],
    activeClass: "budget_icon__active",
    route: "/ngan-sach",
  },
  {
    text: "Báo cáo",
    iconCoordinates: [551, 1631],
    activeClass: "report_icon__active",
    route: "/bao-cao",
  },
  {
    text: "Phân tích tài chính",
    iconCoordinates: [207, 1664],
    activeClass: "analyze_icon__active",
    route: "/phan-tich-tai-chinh",
  },
];

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
export const EMPLOYEE_HEADER = [
  {
    Class: "text-align--left sticky_header_left_1",
    CellClass: "sticky_body_left_1",
    Caption: "Mã nhân viên",
    Field: "EmployeeCode",
    Width: "100",
  },
  {
    Class: "text-align--left",
    CellClass: "text-align--left",
    Caption: "Tên nhân viên",
    Field: "FullName",
    Width: "150",
  },
  {
    Class: "text-align--left",
    CellClass: "text-align--left",
    Caption: "Giới tính",
    Field: "Gender",
    dataFormat: (genderEnum) => {
      return GENDER_DATA[genderEnum];
    },
    Width: "70",
  },
  {
    Class: "text-align--center",
    CellClass: "text-align--center",
    Caption: "Ngày sinh",
    dataFormat: (date) => {
      return formatDate(date);
    },
    Field: "DateOfBirth",
    Width: "100",
  },
  {
    Class: "text-align--left",
    CellClass: "text-align--left",
    Caption: "số cmnd",
    Field: "IdentityNumber",
    Width: "120",
    title: "Số chứng minh nhân dân"
  },
  {
    Class: "text-align--left",
    CellClass: "text-align--left",
    Caption: "chức danh",
    Field: "PositionName",
    Width: "150",
  },
  {
    Class: "text-align--left",
    CellClass: "text-align--left",
    Caption: "tên đơn vị",
    Field: "DepartmentName",
    Width: "200",
  },
  {
    Class: "text-align--left",
    CellClass: "text-align--left",
    Caption: "số tài khoản",
    Field: "BankAccount",
    Width: "150",
  },
  {
    Class: "text-align--left",
    CellClass: "text-align--left",
    Caption: "tên ngân hàng",
    Field: "BankName",
    Width: "150",
  },
  {
    Class: "text-align--left",
    CellClass: "text-align--left",
    Caption: "chi nhánh tk ngân hàng",
    Field: "BankBranch",
    Width: "300",
    title: "Chi nhánh tài khoản ngân hàng"
  },
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

