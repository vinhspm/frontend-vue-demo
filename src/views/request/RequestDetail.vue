<template>
  <div class="detail-form-wrapper">
    <div class="form-header">
      <div class="flex align-center">
        <div class="button-back"></div>
        <div>
          <h2>{{formTitle}}</h2>
        </div>
      </div>
      <div class="flex align-center">
        <button class="btn btn--cancel">Huỷ</button>
        <button class="btn btn--save">Lưu</button>
      </div>
    </div>
    <div class="form-body"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formTitle: 'Thêm mới đăng ký làm thêm'
      }
    }
  }
</script>
<style scoped>
@import url(../../css/page/employee_detail.css);
</style>
