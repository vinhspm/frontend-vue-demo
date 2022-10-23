<template>
  <div class="table__paging">
    <div class="table__paging--left">
      Tổng số bản ghi: <b>{{ totalRecord }}</b>
    </div>

    <div class="table__paging--right">
      <div class="paging-container">
        <DxSelectBox :data-source="pagingOptions" :value="recordPerPage" @value-changed="changePageSize" display-expr="Value" value-expr="Value" />
      </div>
      <div class="paging--pageinfo">
        <span>Từ <b>{{firstPageRecordIndex}}</b> đến <b>{{lastPageRecordIndex}}</b> bản ghi</span>
      </div>
      <div class="table__paging--center">
        <button :disabled="currentPageProp === 1 || !totalPage" class="paging__number paging__button--prev"
          @click="toPrevPage"></button>

        <button :disabled="currentPageProp === totalPage || !totalPage" class="paging__number paging__button--next"
          @click="toNextPage"></button>
      </div>
    </div>
  </div>
</template>
<script>
import { PAGING_OPTION } from '../../../enum.js'
import DxSelectBox from 'devextreme-vue/select-box';
export default {
  components: {DxSelectBox},
  created() {
    this.recordPerPage = this.recordPerPageProps;
    this.getFirstAndLastRecordIndex();
  },

  props: {
    totalRecord: {
      Type: Number,
      default: 100,
    },
    totalPage: {
      Type: Number,
      default: 100,
    },
    recordPerPageProps: {
      Type: Number,
    },
    currentPageProp: {
      Type: Number,
      default: 1,
    },
  },

  data() {
    return {
      recordPerPage: 15,
      pagingOptions: PAGING_OPTION,
      currentPage: 1,
      firstPageRecordIndex: 1,
      lastPageRecordIndex: 15,
    }
  },
  methods: {

    /**
     * kích hoạt sự kiện thay đổi về trang trước
     * author: vinhkt
     * created: 22/09/2022
     * @param {index of page} index 
     */
    toPrevPage() {
      this.$emit('update:currentPage', this.currentPageProp - 1);
    },

    /**
     * kích hoạt sự kiện thay đổi tới trang sau
     * author: vinhkt
     * created: 22/09/2022
     * @param {index of page} index 
     */
    toNextPage() {
      this.$emit('update:currentPage', this.currentPageProp + 1);
    },

        /**
     * kích hoạt sự kiện thay đổi tới trang sau
     * author: vinhkt
     * created: 22/09/2022
     */
    changePageSize(value) {
      this.$emit('update:recordPerPage', value.value);
    },

    getFirstAndLastRecordIndex() {
      if(this.totalRecord < this.recordPerPageProps * this.currentPageProp) {
        this.firstPageRecordIndex = (this.currentPage - 1) * this.recordPerPage + 1;
        this.lastPageRecordIndex = this.firstPageRecordIndex + this.totalRecord - (this.currentPage - 1) * this.recordPerPage - 1;
      } else {
        this.firstPageRecordIndex = (this.currentPage - 1) * this.recordPerPage + 1;
        this.lastPageRecordIndex = this.currentPage * this.recordPerPage;
      }
    }
  },

  watch: {

    /**
     * theo dõi prop trang hiện tại để cập nhật trên component
     * author: vinhkt
     * created: 22/09/2022
     */
    currentPageProp: {
      handler(val) {
        this.currentPage = val;
        this.getFirstAndLastRecordIndex();
      },
      immediate: true
    },

    /**
     * theo dõi số bản ghi một trang để cập nhật trên component cha và gán trang hiện tại về 1 - trang đầu tiên
     * author: vinhkt
     * created: 22/09/2022
     */
    recordPerPage: {
      handler(val) {
        this.getFirstAndLastRecordIndex();
        this.$emit('update:recordPerPage', val)
        //chuyển trang hiện tại về 1 khi thay đổi số bản ghi trên 1 trang
        this.$emit('update:currentPage', 1);

      },
      immediate: true,
    },

    /**
     * theo dõi prop số bản ghi một trang để cập nhật trên component 
     * author: vinhkt
     * created: 22/09/2022
     */
    recordPerPageProps: {
      handler(val) {
        this.getFirstAndLastRecordIndex();
        this.recordPerPage = val;
      },
      immediate: true
    },

    totalRecord: {
      handler() {
        this.getFirstAndLastRecordIndex();
      },
      immediate: true
    }

  }
}
</script>
<style scoped>
@import url(@/css/base/mpaging.css);
</style>