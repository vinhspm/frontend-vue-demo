<template>
  <div
    class="table__content"
  >
    <div class="table__content_body">
      <DxDataGrid id="dataGrid" :data-source="dataSource"
            key-expr="EmployeeID">>
            <!-- Configuration goes here -->
      </DxDataGrid>
    </div>
  </div>
</template>
<script>
import { DxDataGrid } from 'devextreme-vue/data-grid';
export default {
  components: {
        DxDataGrid
    },
    props: {
        dataSource: {
          type: Object,
          default: []
        }
    }
};
</script>
<style scoped>
@import url(../../css/page/requestlist.css);
</style>
