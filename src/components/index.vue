<template>
  <div class="voice_container" >
    <div class="typelist">
      <RadioGroup v-model="language">
        <Radio label="false">Chinese</Radio>
        <Radio label="true">Englist</Radio>
      </RadioGroup>
    </div>
    <textarea v-model="finalleMessage" placeholder="最终录音显示内容，请尽情的施展你的才华......" ></textarea>
    <textarea v-model="middleMessage" placeholder="中间录音内容显示....." ></textarea>
    <div class="voice_box">
      <div class="startbtn" @click="start" v-if="!isStart" >开始</div>
    </div>
  </div>
</template>

<script>
import Voice from './voicebarrage/index.js'

export default {
  name: 'index',
  data () {
    return {
      message: '',
      language: 'false',
      isStart: false, // 是否开始
      middleMessage: '', // 中间显示内容
      finalleMessage: '' // 最终显示内容
    }
  },
  methods: {
    start () {
      this.isStart = true
      this.voicebox = new Voice({
        moduleSelector: '.voice_box'
      })
      // 语音测评模块打开
      this.voicebox.open({
        isEnglist: false,
        useSendTime: 0, // 点击发送按钮之后，多少秒之后可以继续使用
        stuId: '',
        testId: '',
        planId: '',
        pid: this.language === 'true' ? '1103714' : '' // 不传默认走中文
      })

      this.voicebox.$on('onVoiceMessage', (data, type) => {
        this.middleMessage = data
        if (type) {
          this.isStart = false
          this.finalleMessage += data
          this.voicebox.close()
        }
        console.log('成功发送的回调,接收到的消息', data)
      })

      this.voicebox.$on('onMicrophone', () => {
        this.isStart = false
        console.log('检查麦克风是否可用...')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.voice_container{
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background: url(../assets/bj.jpg) no-repeat center;
  .typelist{
    text-align: center;
    padding:20px;
  }
  textarea{
    height: 35%;
    width: 100%;
    resize: none;
    background: transparent;
    border: solid 1px #b07a3c;
    font-size: 16px;
    padding: 20px;
    box-sizing: border-box;
    display: block;
    border: 0;
    color:#757575;
  }
  .voice_box{
    position: absolute;
    bottom:0;
    width:100%;
    height:20%;
    .startbtn{
      width: 100px;
      height: 100px;
      line-height: 100px;
      background: #a47237;
      border-radius: 50%;
      margin: 0 auto;
      position: relative;
      top: 20%;
      color: #fff;
      font-size: 23px;
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>
