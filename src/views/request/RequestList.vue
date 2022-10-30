<template>
  <div class="page__header flex">
    <div class="page__header--title heading">Đăng ký làm thêm</div>
    <div class="flex items-center">
      <button class="add-button" @click="toggleDialog(null)">
        <span class="add-icon"></span> <span>Thêm</span>
      </button>
      <div class="flex items-center div-division">
        <div class="div-division-child"></div>
      </div>
      <button class="dropdown-button">
        <span class="dropdown-icon"></span>
      </button>
    </div>
  </div>

  <div class="page__table" id="request-list">
    <div class="page__toolbar" v-if="!selectedRowKeys.length">
      <div class="page__toolbar--left-container">
        <div class="page__toolbar--left" tabindex="0">
          <i></i>
          <input type="text" placeholder="Tìm kiếm" v-model="params.requestFilter" />
        </div>
      </div>

      <div class="page__toolbar--right">
        <button class="toolbar__dropdown">
          <div>
            <span>Trạng thái</span>
            <DxSelectBox :data-source="statuses" v-model="params.status" @value-changed="onValueChanged"
              display-expr="txt" value-expr="value">
            </DxSelectBox>
          </div>
        </button>
        <div class="department__selectbox">
          <DxDropDownBox v-model:value="params.departmentId" v-model:opened="isTreeBoxOpened" :show-clear-button="true"
            :data-source="departments" value-expr="DepartmentId" display-expr="DepartmentName"
            placeholder="Tất cả đơn vị">
            <template #content="{ data }">
              <DxTreeView ref="treeView" :items="departmentDataSource" :select-by-click="true" :search-enabled="true"
                value-expr="DepartmentId" display-expr="DepartmentName" search-mode="contains" selection-mode="single"
                @content-ready="$event.component.selectItem(params.departmentId)" :width="400"
                @item-selection-changed="treeView_itemSelectionChanged($event)" @item-click="onTreeItemClick($event)">
                <DxSearchEditorOptions placeholder="Tìm kiếm" />
              </DxTreeView>
            </template>
          </DxDropDownBox>

        </div>

        <div class="btn-sidebar" @click="refreshData">
          <div class="mi-refresh"></div>
        </div>
        <div class="btn-sidebar">
          <div class="mi-filter"></div>
        </div>
        <div class="btn-sidebar" @click="exportAllFilterData">
          <div class="mi-export"></div>
        </div>
        <div class="btn-sidebar">
          <div class="mi-setting"></div>
        </div>
      </div>
    </div>
    <div class="page__toolbar" v-if="selectedRowKeys.length">
      <div class="flex align-center table-selected-toolbar">
        <span>Đã chọn <strong>{{ selectedRowKeys.length }}</strong></span>
        <span class="f-z-14 c-red" style="padding-left: 8px; cursor: pointer;" @click="deSelectRows">Bỏ chọn</span>
        <button class="denine-button" @click="multipleDenine"><i class="denine-icon"></i> <span>Từ chối</span></button>
        <button class="approve-button" @click="multipleApprove"><i class="approve-icon"></i><span>Duyệt</span></button>
        <button class="export-button"><i class="export-icon"></i> <span>Xuất khẩu</span></button>
        <button class="delete-all-button" @click="multipleDelete"><i
            class="delete-all-icon"></i><span>Xoá</span></button>

      </div>
    </div>
    <m-table :dataSource="requestLists" @toggle-dialog="toggleDialog($event)" @delete-request="deleteRequest($event)"
      @update:selectedRowKeys="updateSeletectedRows" :selectedRowKeysProp="selectedRowKeys"
      @update:departments="event => this.departments = event"></m-table>
    <m-paging :recordPerPageProps="params.pageSize" :totalRecord="totalRecord" :currentPageProp="params.pageNumber"
      @update:recordPerPage="params.pageSize = $event" @update:currentPage="params.pageNumber = $event"
      :totalPage="totalPage"></m-paging>
  </div>
  <RequestDetail v-if="isShowDetail" @close-dialog="toggleDialog" @open-dialog="openDialog($event)"
    :viewType="detailViewType" :selectedRequestId="selectedRequestId"></RequestDetail>
  <DxLoadPanel :position="{ of: '#request-list' }" :visible="isLoading" :shading="true"
    shading-color="rgba(0,0,0,0.2)" />
</template>
<script>
import { DxSelectBox, DxDropDownOptions } from "devextreme-vue/select-box";
import { DxLoadPanel } from "devextreme-vue/load-panel";
import {
  deleteRequest,
  getRequestsFilter,
  deleteMultipleRequests,
  denineMultipleRequests,
  approveMultipleRequests,
  exportAllRequestsFilter
} from "../../assets/axios/requestController/requestController.js";
import lodash from "lodash";
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import DxTreeView, { DxSearchEditorOptions } from 'devextreme-vue/tree-view';
import {
  DEFAULT_PARAMS,
  DETAIL_VIEW_TYPE,
  REQUEST_STATUS_ARRAY,
  NOTIFY_TYPE,
  DEFAULT_DEPARTMENT_LIST,
} from "../../enum.js";
import RequestDetail from "./RequestDetail.vue";
import { custom } from "devextreme/ui/dialog";
import notify from "devextreme/ui/notify";
export default {
  name: "RequestList",
  components: { RequestDetail, DxSelectBox, DxLoadPanel, DxDropDownBox, DxTreeView, DxDropDownOptions, DxSearchEditorOptions },
  data() {
    return {
      requestLists: [],
      departments: [],
      positions: [],
      employees: [],
      params: lodash.cloneDeep(DEFAULT_PARAMS),
      detailViewType: DETAIL_VIEW_TYPE.ADDNEW,
      isShowDetail: false,
      selectedRequestId: 0,
      statuses: REQUEST_STATUS_ARRAY,
      totalRecord: 0,
      totalPage: 0,
      isLoading: false,
      selectedRowKeys: [],
      departmentDataSource: null,
      isTreeBoxOpened: false,
    };
  },
  created() {
    this.departmentDataSource = DEFAULT_DEPARTMENT_LIST
    this.getData();

  },
  watch: {
    "params.requestFilter": {
      handler() {
        this.getDataSearch();
      },
    },
    "params.status": {
      handler() {
        this.getData();
      },
    },
    "params.pageNumber": {
      handler() {
        this.getData();
      },
    },

    "params.pageSize": {
      handler() {
        this.getData();
      },
    },
    "params.departmentId": {
      handler() {
        this.getData();
      },
    },
  },
  methods: {
    async getData() {
      const requests = await getRequestsFilter(this.params);
      if (requests.status == 200) {
        this.requestLists = requests.data.Data;
        this.totalRecord = requests.data.TotalRecord;
        this.totalPage = requests.data.TotalPage;
      }
    },
    getDataSearch: lodash.debounce(function () {
      this.params.pageNumber = 1;
      this.getData();
    }, 500),
    refreshData() {
      this.params = lodash.cloneDeep(DEFAULT_PARAMS);
      this.getData();
    },
    toggleDialog(paramsObj) {
      try {
        if (!paramsObj) {
          this.detailViewType = DETAIL_VIEW_TYPE.ADDNEW;
        } else if (paramsObj.type === DETAIL_VIEW_TYPE.EDIT) {
          this.detailViewType = DETAIL_VIEW_TYPE.EDIT;
          this.selectedRequestId = paramsObj.selectedRequestId;
        } else {
          this.detailViewType = DETAIL_VIEW_TYPE.DETAIL;
          this.selectedRequestId = paramsObj.selectedRequestId;
        }
        this.isShowDetail = !this.isShowDetail;
        if(!this.isShowDetail) {
          this.getData();
        }
      } catch (err) {
        console.log(err);
      }
    },
    updateSeletectedRows(event) {
      this.selectedRowKeys = event;
    },
    openDialog(params) {
      this.isShowDetail = false;
      if (params && params.type === DETAIL_VIEW_TYPE.EDIT) {
        this.detailViewType = DETAIL_VIEW_TYPE.EDIT;
        this.selectedRequestId = params.selectedRequestId;
      }
      this.isShowDetail = true;
    },
    treeView_itemSelectionChanged(e) {
      this.params.departmentId = e.itemData.DepartmentId;
    },
    onTreeItemClick() {
      this.isTreeBoxOpened = false;
    },
    deSelectRows() {
      this.selectedRowKeys = [];
    },
    async exportAllFilterData() {
      this.isLoading = true;
      try {
        const response = await exportAllRequestsFilter({
          requestFilter: this.params.requestFilter,
          status: this.params.status,
          departmentId: this.params.departmentId
        });
        if (response) {
          const url = URL.createObjectURL(
            new Blob([response.data], {
              type: "application/vnd.ms-excel",
            })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `Danh sách yêu cầu_${Date.now()}.xlsx`
          );
          document.body.appendChild(link);
          link.click();
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    multipleDenine() {
      this.$nextTick(function () {
        let myDialog = custom({
          title: "Cảnh báo",
          messageHtml: "Bạn có chắc muốn từ chối những đơn đã chọn không?",
          buttons: [
            {
              text: "Huỷ",
              onClick: (e) => {
                return { buttonText: e.component.option("text") };
              },
            },
            {
              text: "Từ chối",
              type: "success",
              onClick: (e) => {
                return { buttonText: e.component.option("text") };
              },
            },
          ],
        });
        myDialog.show().then(async (dialogResult) => {
          if (dialogResult.buttonText === "Từ chối") {
            this.isLoading = true;
            try {
              const res = await denineMultipleRequests(Object.values(this.selectedRowKeys));
              this.getData();
              if (res.status === 200) {
                this.notifyMsg(NOTIFY_TYPE.SUCCESS, "Từ chối thành công");
              } else {
                this.notifyMsg(NOTIFY_TYPE.ERROR, "Từ chối thất bại");
              }
            } catch (error) {
              console.log(error);
            } finally {
              this.selectedRowKeys = [];
              this.isLoading = false;
            }
          } else {
            return;
          }
        });
      });
    },
    multipleApprove() {
      this.$nextTick(function () {
        let myDialog = custom({
          title: "Cảnh báo",
          messageHtml: "Bạn có chắc muốn duyệt những đơn đã chọn không?",
          buttons: [
            {
              text: "Huỷ",
              onClick: (e) => {
                return { buttonText: e.component.option("text") };
              },
            },
            {
              text: "Duyệt",
              type: "success",
              onClick: (e) => {
                return { buttonText: e.component.option("text") };
              },
            },
          ],
        });
        myDialog.show().then(async (dialogResult) => {
          if (dialogResult.buttonText === "Duyệt") {
            this.isLoading = true;
            try {
              const res = await approveMultipleRequests(Object.values(this.selectedRowKeys));
              this.getData();
              if (res.status === 200) {
                this.notifyMsg(NOTIFY_TYPE.SUCCESS, "Duyệt thành công");
              } else {
                this.notifyMsg(NOTIFY_TYPE.ERROR, "Duyệt thất bại");
              }
            } catch (error) {
              console.log(error);
            } finally {
              this.selectedRowKeys = []
              this.isLoading = false;
            }
          } else {
            return;
          }
        });
      });
    },
    multipleDelete() {
      this.$nextTick(function () {
        let myDialog = custom({
          title: "Cảnh báo",
          messageHtml: "Bạn có chắc muốn xoá những đơn đã chọn không?",
          buttons: [
            {
              text: "Huỷ",
              onClick: (e) => {
                return { buttonText: e.component.option("text") };
              },
            },
            {
              text: "Xoá",
              type: "danger",
              onClick: (e) => {
                return { buttonText: e.component.option("text") };
              },
            },
          ],
        });
        myDialog.show().then(async (dialogResult) => {
          if (dialogResult.buttonText === "Xoá") {
            this.isLoading = true;
            try {
              const res = await deleteMultipleRequests(Object.values(this.selectedRowKeys));
              this.getData();
              if (res.status === 200) {
                this.notifyMsg(NOTIFY_TYPE.SUCCESS, "Xoá thành công");
              } else {
                this.notifyMsg(NOTIFY_TYPE.ERROR, "Xoá thất bại");
              }
            } catch (error) {
              console.log(error);
            } finally {
              this.isLoading = false;
            }
          } else {
            return;
          }
        });
      });
    },
    deleteRequest(requestId) {
      this.$nextTick(function () {
        let myDialog = custom({
          title: "Cảnh báo",
          messageHtml: "Bạn có chắc muốn xoá đơn này không?",
          buttons: [
            {
              text: "Huỷ",
              onClick: (e) => {
                return { buttonText: e.component.option("text") };
              },
            },
            {
              text: "Xoá",
              type: "danger",
              onClick: (e) => {
                return { buttonText: e.component.option("text") };
              },
            },
          ],
        });
        myDialog.show().then(async (dialogResult) => {
          if (dialogResult.buttonText === "Xoá") {
            this.isLoading = true;
            const res = await deleteRequest(requestId);
            this.isLoading = false;
            this.getData();
            if (res.status === 200) {
              this.notifyMsg(NOTIFY_TYPE.SUCCESS, "Xoá thành công");
            } else {
              this.notifyMsg(NOTIFY_TYPE.ERROR, "Xoá thất bại");
            }

          } else {
            return;
          }
        });
      });
    },
    notifyMsg(type, message) {
      notify(
        {
          message: message,
          width: 230,
          height: 36,
          position: {
            at: "bottom right",
            my: "bottom right",
          },
        },
        type,
        500
      );
    },
  },
};
</script>
<style scoped>
@import url(../../css/page/requestlist.css);

.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #0000005b;
}
</style>
