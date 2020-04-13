<template>
  <div class="voice_container" v-if="voicePanl">
    <div class="voice_box">
      <div class="voice">
        <div v-show="isVoice">
          <div class="voicelip">{{voiceMessage }}</div>
          <div class="siriware" id="siribox"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SiriWave from '@xes/siri'
import SpeechRecognition from '@xes/speech-recognition/index'
import $confirm from '../confirm/pc'

export default {
  data () {
    return {
      skinType: 2, // 初高中的皮肤
      voicePanl: false, // 语音面板是否开启
      microphone: false, // 麦克风是否开启
      isVoice: false, // 是否语音中
      isWriting: false, // 是否拼写
      isEnglist: false, // 是否为英语
      voiceMessage: '', // 提示信息
      isEnglistLip: false, // 是否展示英语的提示
      overTime: null, // 检测时间
      isContinueSend: true, // 是否可以继续发送
      reg: /.*[\u4e00-\u9fa5].*/, // 是否为英文
      stringTotalLength: 50, // 80: 英文 50 ：中文
      stringCurrentLength: 0, // 当前的字符串长度
      siri: null // siriware
    }
  },
  mounted () {
  },
  methods: {
    /**
     * @name open
     * @description 打开语音弹幕
     */
    open (params) {
      console.log('%c1、语音弹幕接受到的参数...', 'color: green', params)
      this.isEnglist = params.isEnglist || false
      this.stringTotalLength = this.isEnglist ? 80 : 50
      this.params = params
      this.initVoice()
        .then(() => {
          if (this.microphone) {
            this.recorder.start()
          }
        })
    },
    /**
     * @name close
     * @description 关闭语音弹幕
     */
    close () {
      this.voicePanl = false
      this.isVoice = false
      this.isEnglist = false
      this.siri.stop()
      this.recorder.stop()
      clearInterval(this.overTime)
    },
    /**
     * @name initVoice
     * @description 初始化接入语音
     */
    async initVoice () {
      if (SpeechRecognition.support) {
        this.microphone = true
        if (this.isEnglist) {
          this.voiceMessage = '语音录入中，大声说英语哦！'
        } else {
          this.voiceMessage = '语音录入中，大声开口说哦！'
        }
        this.voicePanl = true
        this.isVoice = true
        this.isWriting = false
        setTimeout(() => {
          this.initSiri()
        }, 0)
      } else {
        $confirm({
          message: '声音采集失败',
          content: '请检查你的麦克风是否正常工作',
          dom: 'module',
          skinType: this.skinType,
          showCancel: false,
          sureBtnName: '确认',
          cancelBtnName: '取消'
        }).then(type => {
          this.$emit('onMicrophone')
        })
      }
      this.recorder = SpeechRecognition.createRecorder({
        stuid: this.params.stuId || '',
        testid: this.params.testId || '',
        liveid: this.params.planId || '',
        wss: 'wss://asr.xueersi.com/wsh5', // ai 提供的接口地址 默认也是这个，可以不写
        mindb: -75, // 声音小于多少 db 触发声音太小回调
        // pid: this.isEnglist ? '1103714' : '1103113' // 1103714: 英文， 1103113：中文
        pid: this.params.pid || '1103113'
      })
      await this.recorder.init()

      this.recorder.on('onResult', data => {
        console.log(
          `%c语音弹幕通过ai接受到的消息`,
          `color: #ffffff; background: red; padding: 4px 6px; font-size: 20px; border-radius: 12px;`,
          data
        )
        let middleResult =
          data.data && data.data.imme_content && data.data.imme_content.nbest
        let finalResult =
          data.data && data.data.asr_content && data.data.asr_content.nbest
        if (middleResult) {
          this.$emit('onVoiceMessage', middleResult, false)
        }
        if (finalResult) {
          this.$emit('onVoiceMessage', finalResult, true)
        }
      })

      // 新增音量反馈用于波形图
      this.recorder.on('analysering', db => {
        this.siri.setAmplitude(db * 20)
        // console.log(db);
      })

      this.recorder.on('onVolumeDBTooSmall', db => {
        // db 为当前的分贝
        console.log(
          `%c说话声音过小`,
          `color: #ffffff; background: green; padding: 4px 6px; font-size: 20px; border-radius: 12px;`,
          db
        )
      })

      this.recorder.on('onInvalid', data => {
        // alert('当AI返回无效值的时候触发')
        this.recorder.start()
        console.log('当AI返回无效值的时候触发')
      })
    },
    /**
     * @name initSiri
     * @description 初始化siri
     */
    initSiri () {
      this.siri = new SiriWave({
        container: document.getElementById('siribox'),
        width: '300',
        height: 30,
        style: 'ios9',
        speed: '0.5',
        amplitude: 1,
        autostart: true
      })
      this.siri.start()
    }
  }
}
</script>

<style scoped lang="less">
.voice_container {
  // 高中语音弹幕样式
  .voice_box {
    width: 100%;
    position: absolute;
    bottom: 20px;
    padding: 0 20px;
    box-sizing: border-box;
    .voice {
      min-height: 60px;
      background: #1e1e26;
      border-radius: 30px;
      .voicelip {
        text-align: center;
        color: #fff;
        padding-top: 10px;
        font-size: 12px;
        height:20px;
      }
      .siriware {
        width: 300px;
        height: 25px;
        margin: 0 auto;
      }
      .repeatbtn {
        width: 68px;
        height: 26px;
        line-height: 26px;
        color: #fff;
        border: #fff solid 1px;
        text-align: center;
        border-radius: 13px;
        position: absolute;
        left: 85px;
        bottom: 20px;
        cursor: pointer;
      }
      .repeatbtndisable {
        border: rgba(#ffffff, 0.2) solid 1px;
        color: rgba(#ffffff, 0.2);
        cursor: not-allowed;
      }
      .nodisabled {
        &:hover {
          background: rgba(#ffffff, 0.1);
          border: #272734 solid 1px;
          color: #ff5e50;
        }
      }
      .sendbtn {
        width: 68px;
        height: 26px;
        line-height: 26px;
        color: #fff;
        border: #ff5e50 solid 1px;
        background: #ff5e50;
        text-align: center;
        border-radius: 13px;
        position: absolute;
        right: 85px;
        bottom: 20px;
        cursor: pointer;
      }
      .senddisabled {
        cursor: not-allowed;
        background: rgba(#ffffff, 0.1);
        border: rgba(#ffffff, 0.1) solid 1px;
        color: rgba(#ffffff, 0.2);
      }
      .textbox {
        padding: 20px 100px;
        .textcontent {
          min-height: 30px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          position: relative;
          textarea {
            display: block;
            resize: none;
            height: 30px;
            padding: 7px 10px;
            border-radius: 15px;
            border: none;
            box-shadow: none;
            box-sizing: border-box;
            background: transparent;
            color: #fff;
            box-sizing: border-box;
            width: 100%;
            padding-right: 80px;
          }
          textarea:focus {
            border: none;
            box-shadow: none;
          }
          span {
            position: absolute;
            color: rgba(#fff, 0.4);
            line-height: 30px;
            right: 10px;
          }
          i {
            color: rgba(#e1e1e1, 0.8);
          }
          label {
            width: 147px;
            height: 48px;
            position: absolute;
            background: url(./assets/lip_bj.png) no-repeat;
            display: block;
            color: #ffffff;
            text-align: center;
            line-height: 40px;
            left: 50%;
            transform: translateX(-50%);
            top: -68px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
