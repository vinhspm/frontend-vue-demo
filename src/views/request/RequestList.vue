<template>
  <div class="page__header flex" >
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
    <div class="page__toolbar">
      <div class="page__toolbar--left-container">
        <div class="page__toolbar--left" tabindex="0">
          <i></i>
          <input
            type="text"
            placeholder="Tìm kiếm"
            v-model="params.requestFilter"
          />
        </div>
      </div>

      <div class="page__toolbar--right">
        <button class="toolbar__dropdown">
          <div>
            <span>Trạng thái</span>
            <DxSelectBox
              :data-source="statuses"
              v-model="params.status"
              @value-changed="onValueChanged"
              display-expr="txt"
              value-expr="value"
            >
            </DxSelectBox>
          </div>
        </button>
        <div class="department__selectbox">
          <input disabled type="text" placeholder="Tất cả đơn vị" />
          <div class="dropdown-icon-container">
            <div class="mi-chevron-down"></div>
          </div>
        </div>
        <div class="btn-sidebar" @click="refreshData">
          <div class="mi-refresh"></div>
        </div>
        <div class="btn-sidebar">
          <div class="mi-filter"></div>
        </div>
        <div class="btn-sidebar">
          <div class="mi-export"></div>
        </div>
        <div class="btn-sidebar">
          <div class="mi-setting"></div>
        </div>
      </div>
    </div>
    <m-table
      :dataSource="requestLists"
      @toggle-dialog="toggleDialog($event)"
      @delete-request="deleteRequest($event)"
    ></m-table>
    <m-paging
      :recordPerPageProps="params.pageSize"
      :totalRecord="totalRecord"
      :currentPageProp="params.pageNumber"
      @update:recordPerPage="params.pageSize = $event"
      @update:currentPage="params.pageNumber = $event"
      :totalPage="totalPage"
    ></m-paging>
  </div>
  <RequestDetail
    v-if="isShowDetail"
    @close-dialog="toggleDialog"
    @open-dialog="openDialog($event)"
    :viewType="detailViewType"
    :selectedRequestId="selectedRequestId"
  ></RequestDetail>
  <DxLoadPanel
    :position="{ of: '#request-list' }"
    :visible="isLoading"
    :shading="true"
    shading-color="rgba(0,0,0,0.2)"
  />
</template>
<script>
import { DxSelectBox } from "devextreme-vue/select-box";
import { DxLoadPanel } from "devextreme-vue/load-panel";
import {
  deleteRequest,
  getRequestsFilter,
} from "../../assets/axios/requestController/requestController.js";
import lodash from "lodash";
import {
  DEFAULT_PARAMS,
  DETAIL_VIEW_TYPE,
  REQUEST_STATUS_ARRAY,
  NOTIFY_TYPE,
} from "../../enum.js";
import RequestDetail from "./RequestDetail.vue";
import { custom } from "devextreme/ui/dialog";
import notify from "devextreme/ui/notify";
export default {
  name: "RequestList",
  components: { RequestDetail, DxSelectBox, DxLoadPanel },
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
    };
  },
  created() {
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
      } catch (err) {
        console.log(err);
      }
    },
    openDialog(params) {
      this.isShowDetail = false;
      if (params && params.type === DETAIL_VIEW_TYPE.EDIT) {
        this.detailViewType = DETAIL_VIEW_TYPE.EDIT;
        this.selectedRequestId = params.selectedRequestId;
      }
      this.isShowDetail = true;
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
