<template>
   <div class="header">
            <div class="header__left">
                <div class="header__sibar"></div>
                <div class="header__logo"></div>
                <div class="header__title">Chấm công</div>

            </div>
            <div class="header__right">
                    <ul  class="right__header__1">
                        <router-link to="/">Tổng quan</router-link>
                        <router-link to="/">Chấm công</router-link>
                        <router-link to="/">Ca làm việc</router-link>
                        <router-link to="/quan-li-don">Quản lý đơn</router-link>
                        <router-link to="/">Báo cáo</router-link>
                        <router-link to="/">Thiết lập</router-link>

                    </ul>
                <div class="account-box">
                    <div class="notification-button"></div>
                    <div class="question-button"></div>
                    <div class="moreinfo-button"></div>
                    <div class="user-avatar"></div>
                </div>
            </div>
        </div>
</template>
<style scoped>
   @import url(../../css/layout/header.css);
</style>