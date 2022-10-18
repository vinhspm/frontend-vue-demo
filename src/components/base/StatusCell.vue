<template>
  <div class="status-cell" :class="className(cellData.value)">
    <div>{{cellText(cellData.value)}}</div>
  </div>
</template>
<script>
import { REQUEST_STATUS } from '../../enum.js';
export default {

  props: {
    cellData: {
      type: Object,
      default: () => { },
    },
  },
  methods: {
    className(value) {
      if (value === REQUEST_STATUS.DENINED) {
        return "status-denined";
      } else if (value === REQUEST_STATUS.WAITING) {
        return "status-waiting";
      } else {
        return "status-approved";
      }
    },
    cellText(value) {
      if (value === REQUEST_STATUS.DENINED) {
        return "Từ chối";
      } else if (value === REQUEST_STATUS.WAITING) {
        return "Chờ duyệt";
      } else {
        return "Đã duyệt";
      }
    },

  },
};
</script>
<style>
.status-cell {
  height: 33px;
  padding: 6px 8px;
  border-radius: 4px;
  text-align: center;
  width: fit-content;
}

.status-waiting {
  border: 1px solid #6153df;
  color: #6153df;
  background-color: #ebe9fb;
}

.status-denined {
  border: 1px solid #ef292f;
  color: #ef292f;
  background-color: #fee8e7;
}

.status-approved {
  border: 1px solid #11aa7a;
  color: #11aa7a;
  background-color: #b9f8e4;
}
</style>