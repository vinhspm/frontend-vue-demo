<template>
  <div class="flex cell-wrapper" @mouseenter="togglePinButton" @mouseleave="togglePinButton">
    <span>
      {{cellData.column.caption}}
    </span>
    <button class="pin-button" v-show="isShow || isPin" :class="{pinActive: isPin }" v-on:click.prevent.stop="pinColumn($event)">

    </button>
  </div>
</template>
<script>
export default {

  props: {
    cellData: {
      type: Object,
      default: () => { },
    },
    isPinProps: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false,
      isPin: false,
    }
  },
  watch: {
    isPinProps: {
      handler() {
        this.isPin = this.isPinProps;
      },
      immediate: true
    }
  },
  methods: {
    togglePinButton() {
      this.isShow = !this.isShow;
      
    },
    pinColumn(event) {
      // this.isPin = !this.isPin;
      // console.log(event.path[3].getAttribute('aria-colindex'));
      if(!this.isPin) {
        this.$emit('pin-column', {index: event.path[3].getAttribute('aria-colindex') - 2, showPin: true});
      }
      else {
        this.$emit('pin-column', {index: event.path[3].getAttribute('aria-colindex') - 2, showPin: false});
      }
    }
  },
};
</script>
<style>
.pin-button {
  width: 24px;
  height: 24px;
  position: absolute;
  transform: translate(100px, 0px);
  background-color: #686c7b;
  -webkit-mask-image: url(../../assets/Icon.ad7c4b8.svg);
  -webkit-mask-position: -216px -120px;
  outline: none;
}

.pinActive {
  background-color: #ec5504!important;

}

.cell-wrapper {
  min-width: 100px;
  height: 100%;
  align-items: center;
  
}
</style>