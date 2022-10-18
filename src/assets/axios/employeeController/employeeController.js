import axios, { multiplePutAxios, getAxiosBlob } from "../baseAxios.js";
import {ENDPOINTS} from '../endpoints.js'

/**
 * hàm gọi api lấy danh sách toàn bộ nhân viên
 * @returns danh sách toàn bộ nhân viên
 * author: vinhkt (22/09/2022)
 */
export async function getEmployees() {
  const endpoint = ENDPOINTS.EMPLOYEES;
  return await axios.getAxios(endpoint);
}

/**
 * hàm lấy danh sách nhân viên theo filter
 * author: vinhkt (22/09/2022)
 * created: 22/09/2022 4h utc
 * @param {params: {pageSize, pageNumber, employeeFilter} } params
 * @returns
 */
export async function getEmployeesFilter(params) {
  const endpoint = ENDPOINTS.EMPLOYEES_FILTER;
  return await axios.getAxios(endpoint, params);
}

/**
 * hàm xoá nhân viên theo id
 * author: vinhkt
 * created: 22/09/2022 4h utc
 * @param {id} params 
 * @returns 1 nếu thành công
 */
export async function deleteEmployee(id) {
  const endpoint = ENDPOINTS.EMPLOYEES + '/' + id;
  return await axios.deleteAxios(endpoint);
}

/**
 * hàm lấy mã nhân viên kế tiếp
 * author: vinhkt(22/09/2022)
 * @returns mã của nhân viên kế tiếp
 */
export async function getNextEmployee() {
  const endpoint = ENDPOINTS.NEW_EMPLOYEE_CODE;
  return await axios.getAxios(endpoint);
}

/**
 * call api thêm mới nhân viên
 * @param {json body} body 
 * @returns id của nhân viên được thêm mới
 * author: vinhkt(22/09/2022)
 */
export async function postEmployee(body) {
  const endpoint = ENDPOINTS.EMPLOYEES;
  return await axios.postAxios(endpoint, body);
}

/**
 * call api sửa nhân viên
 * @param {id của nhân viên cần sửa} id 
 * @param {json body} body 
 * @returns 1 nếu thành công
 * author: vinhkt (22/09/2022)
 */
export async function putEmployee(id, body) {
  const endpoint = ENDPOINTS.EMPLOYEES + '/' + id;
  return await axios.putAxios(endpoint, body);
}

/**
 * xoá hàng loạt nhân viên
 * @param {mảng id cần xoá} ids 
 * @returns 
 */
export async function deleteMultipleEmployee(ids) {
  const endpoint = ENDPOINTS.MULTIPLE_DELETE_EMPLOYEE;
  return await multiplePutAxios(endpoint, ids);
}


/**
 * xuất file excel các nhân viên theo filter
 * @param {filter} employeeFilter
 * @returns 
 */
 export async function exportAllEmployeesFilter(employeeFilter) {
  const endpoint = ENDPOINTS.EXPORT_EMPLOYEE_FILTER;
  return await getAxiosBlob(endpoint, employeeFilter);
}