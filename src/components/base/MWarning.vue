<template>
  <m-popup @close-dialog="onClose" componentWidth="444">
    <template #content>
      <div class="popup__content">
        <div class="icon icon-48 icon--alert" v-if="showDialogOnType.alert"></div>
        <div class="icon icon-48 icon--ask" v-if="showDialogOnType.ask"></div>
        <div class="icon icon-48 icon--warning" v-if="showDialogOnType.warning | showDialogOnType.selectable"></div>
        <div style="margin-left: 20px; word-wrap: break-word; max-width: 300px">
          {{ text }}
        </div>
      </div>
    </template>
    <template #footer>
      <div id="alert" v-if="showDialogOnType.alert">
        <m-button text="Đóng" @click="onClose"></m-button>
      </div>
      <div id="warning" v-if="showDialogOnType.warning">
        <m-button text="Đồng ý" @click="onClose"></m-button>
      </div>
      <div id="selectable" v-if="showDialogOnType.selectable">
        <button class="button--cancel" @click="onClose">Không</button>
        <m-button text="Đồng ý" @click="onOK"></m-button>
      </div>
      <div id="cancelable_selectable" v-if="showDialogOnType.ask">
        <button class="button--cancel" @click="onClose">Huỷ</button>
        <div>
          <button class="button--cancel" @click="onDenied">Không</button>
          <m-button text="Đồng ý" @click="onOK"></m-button>
        </div>
      </div>
    </template>
  </m-popup>
</template>
<script>
import { DIALOG_TYPE } from "../../enum.js";

export default {
  props: {
    text: String,
    dialogType: String,
  },
  data() {
    return {
      showDialogOnType: {
        alert: false,
        warning: false,
        selectable: false,
        ask: false,
      },
    };
  },

  /**
   * kiểm tra loại popup nào được sử dụng
   * author: vinhkt
   * created: 23/09/2022
   */
  created() {
    if (this.dialogType === DIALOG_TYPE.ALERT) {
      this.showDialogOnType.alert = true;
    } else if (this.dialogType === DIALOG_TYPE.WARNING) {
      this.showDialogOnType.warning = true;
    } else if (this.dialogType === DIALOG_TYPE.ASK_CANCELABLE) {
      this.showDialogOnType.ask = true;
    } else {
      this.showDialogOnType.selectable = true;
    }
  },

  methods: {
    
    /**
     * kích hoạt sự kiện đóng popup
     * author: vinhkt
     * created: 19/09/2022
     */
    onClose() {
      this.$emit("close-warning");
    },

    /**
     * kích hoạt sự kiện người dùng đồng ý
     * author: vinhkt
     * created: 19/09/2022
     */
    onOK() {
      this.$emit("ok-warning");
    },

    /**
     * kích hoạt sự kiện người dùng không đồng ý
     * author: vinhkt
     * created: 19/09/2022
     */
    onDenied() {
      this.$emit('denied-warning')
    }
  },

  name: "m-warning",
};
</script>
<style scoped>
@import url(../../css/base/icon.css);
#alert {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
}

#warning {
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  height: 32px;
}

#selectable {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
}

#cancelable_selectable {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
}

#cancelable_selectable div {
  display: flex;
  justify-content: space-between;

}

.dialog__body {
  padding: 0 !important;
  
}

.popup__content {
  display: flex;
  width: 100%;
  flex-direction: row;
  background-color: inherit;
  padding: 0;
  align-items: center;
}

button {
  height: 32px;
  min-width: 70px;
  padding: 4px 12px;
  border-radius: 4px;
}

button:hover {
  cursor: pointer;
}

.button--cancel {
  background-color: unset;
  color: #000;
  border: solid 1px #bbbbbb;
}

.button--cancel:hover {
  background-color: #ccc;
}
</style>
