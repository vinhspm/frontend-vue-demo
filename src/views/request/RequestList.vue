<template >
  <div class="page__header flex">
    <div class="page__header--title heading">Đăng ký làm thêm</div>
    <div class="flex items-center">
      <button class="add-button"><span class="add-icon"></span> <span>Thêm</span></button>
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
      <div class="page_toolbar_container--left">
        <div class="page__toolbar--left">

        </div>

      </div>
      <div class="page__toolbar--right">
        
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "RequestList",
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
