import axios from "../baseAxios.js";
import {ENDPOINTS} from '../endpoints.js'

/**
 * hàm gọi api lấy danh sách toàn bộ vị trí
 * author: vinhkt (22/09/2022)
 * @returns danh sách toàn bộ vị trí
 */
export async function getPositions() {
  const endpoint = ENDPOINTS.POSITIONS;
  return await axios.getAxios(endpoint);
}
