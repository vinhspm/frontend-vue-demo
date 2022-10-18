import axios from "../baseAxios.js";
import {ENDPOINTS} from '../endpoints.js'

/**
 * hàm lấy danh sách toàn bộ phòng ban bằng api
 * author: vinhkt (22/09/2022)
 * @returns danh sách toàn bộ phòng ban
 */
export async function getDepartments() {
  const endpoint = ENDPOINTS.DEPARTMENTS;
  return await axios.getAxios(endpoint);
}