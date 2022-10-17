<template>
  <div class="table__paging">
    <div class="table__paging--left">
      Tổng số: <b>{{ totalRecord }}</b> bản ghi
    </div>

    <div class="table__paging--right">
      <div class="paging-container">
        <m-combobox width="200" :data="pagingOptions" fieldKey="Value" :modelValue="recordPerPage" :readOnly="true"
          :top="true" @update:modelValue="recordPerPage = $event">
        </m-combobox>
      </div>

      <div class="table__paging--center">
        <button :disabled="currentPageProp === 1 || !totalPage" class="paging__button" @click="toPrevPage">Trước</button>
        <div class="paging__button--group">
          <button :disabled="pageIndex === '...'" v-for="(pageIndex, index) in pageArray" :key="pageIndex+index"
            class="paging__number" :class="{'paging__number--selected': pageIndex === currentPage}"
            @click="changePage(pageIndex)">{{pageIndex}}</button>
        </div>
        <button :disabled="currentPageProp === totalPage || !totalPage" class="paging__button" @click="toNextPage">Sau</button>
      </div>
    </div>
  </div>
</template>
<script>
import { PAGING_OPTION } from '@/enum.js'
export default {
  created() {
    this.recordPerPage = this.recordPerPageProps.toString();
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
      recordPerPage: '',
      pagingOptions: PAGING_OPTION,
      currentPage: 1,
      pageArray: [],
      maxPage: 5
    }
  },
  methods: {

    /**
     * kích hoạt sự kiện thay đổi trang 
     * author: vinhkt
     * created: 22/09/2022
     * @param {index of page} index 
     */
    changePage(index) {
      this.$emit('update:currentPage', index);
    },

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
     * thay đổi mảng chứa các trang được hiển thị tới người dùng
     * author: vinhkt
     * created: 22/09/2022
     */
    changePageArray() {
      try {
        const firstPage = 1;
        const lastPage = this.totalPage;
        const nextPage = this.currentPageProp + 1;
        const prevPage = this.currentPageProp - 1;
        if (lastPage <= this.maxPage) {
          this.pageArray = Array.from({ length: lastPage }, (_, i) => i + 1);
        } else {
          if (this.currentPageProp === firstPage || this.currentPageProp === firstPage + 1) {
            this.pageArray = ([firstPage, firstPage + 1, firstPage + 2, '...', lastPage - 1, lastPage]);
          } else if (this.currentPageProp === lastPage || this.currentPageProp === lastPage - 1) {
            this.pageArray = ([firstPage, firstPage + 1, '...', lastPage - 2, lastPage - 1, lastPage]);
          } else if (this.currentPageProp === firstPage + 2) {
            this.pageArray = ([firstPage, firstPage + 1, firstPage + 2, firstPage + 3, '...', lastPage]);
          } else if (this.currentPageProp === lastPage - 2) {
            this.pageArray = ([firstPage, '...', lastPage - 3, lastPage - 2, lastPage - 1, lastPage]);
          } else {
            this.pageArray = ([firstPage, '...', prevPage, this.currentPageProp, nextPage, '...', lastPage]);
          }
        }
      } catch (err) {
        console.log(err);
      }

    }
  },

  watch: {

    /**
     * theo dõi tổng số trang thay đổi để thay đổi mảng pageArray
     * author: vinhkt
     * created: 22/09/2022
     */
    totalPage: {
      handler() {
        this.changePageArray()
      },
      immediate: true
    },

    /**
     * theo dõi prop trang hiện tại để cập nhật trên component
     * author: vinhkt
     * created: 22/09/2022
     */
    currentPageProp: {
      handler(val) {
        this.currentPage = val;
        this.changePageArray();
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
        this.$emit('update:recordPerPage', parseInt(val))

        //chuyển trang hiện tại về 1 khi thay đổi số bản ghi trên 1 trang
        this.$emit('update:currentPage', 1);

      },
    },

    /**
     * theo dõi prop số bản ghi một trang để cập nhật trên component 
     * author: vinhkt
     * created: 22/09/2022
     */
    recordPerPageProps: {
      handler(val) {
        this.recordPerPage = val.toString();
      }
    }

  }
}
</script>
<style scoped>
@import url(@/css/base/mpaging.css);
</style>