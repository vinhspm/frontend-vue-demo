<template>
  <div class="page__header flex">
    <div class="page__header--title heading">Đăng ký làm thêm</div>
    <div class="flex items-center">
      <button class="add-button" @click="toggleDialog">
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

  <div class="page__table">
    <div class="page__toolbar">
      <div class="page__toolbar--left-container">
        <div class="page__toolbar--left" tabindex="0">
          <i></i>
          <input type="text" placeholder="Tìm kiếm" />
        </div>
      </div>

      <div class="page__toolbar--right">
        <button class="toolbar__dropdown">
          <div>
            <span>Trạng thái</span>
            <b>Tất cả</b>
            <div class="mi-chevron-down-small"></div>
          </div>
        </button>
        <div class="department__selectbox">
          <input disabled type="text" placeholder="Tất cả đơn vị" />
          <div class="dropdown-icon-container">
            <div class="mi-chevron-down"></div>
          </div>
        </div>
        <div class="btn-sidebar">
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
    <m-table :dataSource="requestLists"></m-table>
    <m-paging
      :recordPerPageProps="15"
      :totalRecord="20"
      :totalPage="2"
      :currentPageProp="1"
    ></m-paging>
  </div>
  <RequestDetail
    v-if="isShowDetail"
    @close-dialog="toggleDialog"
    :viewType="detailViewType"
    :selectedRequestId="selectedRequestId"
  ></RequestDetail>
</template>
<script>
import { getRequestsFilter } from "../../assets/axios/requestController/requestController.js";
import lodash from "lodash";
import { DEFAULT_PARAMS, DEFAULT_REQUEST_LIST, DETAIL_VIEW_TYPE } from "../../enum.js";
import RequestDetail from './RequestDetail.vue'
export default {
  name: "RequestList",
  components: {RequestDetail},
  data() {
    return {
      requestLists: DEFAULT_REQUEST_LIST.Data,
      params: lodash.cloneDeep(DEFAULT_PARAMS),
      detailViewType: DETAIL_VIEW_TYPE.ADDNEW,
      isShowDetail: false,
      selectedRequestId: 0
    };
  },
  created() {
    // this.getData();
  },
  methods: {
    async getData() {
      const res = await getRequestsFilter(this.params);
    },
    toggleDialog() {
      try {
        this.isShowDetail = !this.isShowDetail;
      } catch (err) {
        console.log(err);
      }
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
