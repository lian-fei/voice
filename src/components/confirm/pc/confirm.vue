<template>
  <transition name="confirm-fade">
    <div class="confirm-container" v-show="visible">
      <div class="confirm-box">
        <div class="info">{{ message }}</div>
        <div class="smallinfo" >{{content}}</div>
        <div class="btns" :class="{ 'show-cancel': showCancel }">
          <div class="btn cancel" @click="handleCancel" v-if="showCancel">{{cancelBtnName || '取消'}}</div>
          <div class="btn ok" @click="handleOk">{{sureBtnName || '好的'}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      showCancel: false,
      message: '',
      sureBtnName: '',
      cancelBtnName: '',
      content: ''
    }
  },
  methods: {
    afterLeave () {
      this.$el.parentNode.removeChild(this.$el)
      this.$destroy(true)
    },
    show () {
      this.visible = true
    },
    hidden () {
      this.visible = false
    },
    handleCancel () {
      this.hidden()
      this.$emit('cancel')
    },
    handleOk () {
      this.hidden()
      this.$emit('ok')
    }
  }
}
</script>

<style lang="less">
.confirm-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 99999;

  .confirm-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    box-sizing: border-box;
    padding: 28px 16px 16px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 8px;

    .info {
      color: #212831;
      font-size: 16px;
    }

    .smallinfo{
      color: #858C96;
      padding-top: 10px;
    }

    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top:30px;

      &.show-cancel .btn {
        width: 126px;
      }
      .btn {
        width: 160px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
        border-radius: 30px;
      }
      .btn + .btn {
        margin-left: 16px;
      }
      .btn.ok {
        background-color: #FF5E50;
        &:hover {
          // background-color: rgb(197, 63, 50);
        }
      }
      .btn.cancel {
        background-color: #F9F9FC;
        color: #858C96;
        &:hover {
          // background-color: rgb(228, 228, 230);
        }
      }
    }
  }
}
.confirm-fade-enter-active, .confirm-fade-leave-active {
  transition: opacity .3s;
}

.confirm-fade-enter, .confirm-fade-leave-to {
  opacity: 0;
}

</style>
