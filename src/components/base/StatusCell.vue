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
      if (value === REQUEST_STATUS.DENINED.value) {
        return "status-denined";
      } else if (value === REQUEST_STATUS.WAITING.value) {
        return "status-waiting";
      } else {
        return "status-approved";
      }
    },
    cellText(value) {
      if (value === REQUEST_STATUS.DENINED.value) {
        return REQUEST_STATUS.DENINED.txt;
      } else if (value === REQUEST_STATUS.WAITING.value) {
        return REQUEST_STATUS.WAITING.txt;
      } else {
        return REQUEST_STATUS.APPROVED.txt;
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