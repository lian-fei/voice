webpackJsonp([1],{"/Oh2":function(e,t){},BbUB:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]},a=n("VU/8")({name:"App"},s,!1,null,null,null).exports,o=n("/ocq"),r=n("Xxa5"),c=n.n(r),l=n("exGp"),d=n.n(l),u=n("9x5a"),v=n("YEeb"),m=n("//Fk"),h=n.n(m),f={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"confirm-fade"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"confirm-container"},[n("div",{staticClass:"confirm-box"},[n("div",{staticClass:"info"},[e._v(e._s(e.message))]),e._v(" "),n("div",{staticClass:"smallinfo"},[e._v(e._s(e.content))]),e._v(" "),n("div",{staticClass:"btns",class:{"show-cancel":e.showCancel}},[e.showCancel?n("div",{staticClass:"btn cancel",on:{click:e.handleCancel}},[e._v(e._s(e.cancelBtnName||"取消"))]):e._e(),e._v(" "),n("div",{staticClass:"btn ok",on:{click:e.handleOk}},[e._v(e._s(e.sureBtnName||"好的"))])])])])])},staticRenderFns:[]};var p=n("VU/8")({data:function(){return{visible:!1,showCancel:!1,message:"",sureBtnName:"",cancelBtnName:"",content:""}},methods:{afterLeave:function(){this.$el.parentNode.removeChild(this.$el),this.$destroy(!0)},show:function(){this.visible=!0},hidden:function(){this.visible=!1},handleCancel:function(){this.hidden(),this.$emit("cancel")},handleOk:function(){this.hidden(),this.$emit("ok")}}},f,!1,function(e){n("XQ3+")},null,null).exports,g=i.default.extend(p),_=null,x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new h.a(function(t,n){(_=new g({data:e})).$mount(),(document.getElementById(e.dom)||document.body).appendChild(_.$el),_.show(),_.$on("ok",function(){return t(!0)}),_.$on("cancel",function(){return t(!1)})})};x.close=function(){_&&(console.log("111111",_),_.handleOk())};var b=x,w={data:function(){return{skinType:2,voicePanl:!1,microphone:!1,isVoice:!1,isWriting:!1,isEnglist:!1,voiceMessage:"",isEnglistLip:!1,overTime:null,isContinueSend:!0,reg:/.*[\u4e00-\u9fa5].*/,stringTotalLength:50,stringCurrentLength:0,siri:null}},mounted:function(){},methods:{open:function(e){var t=this;console.log("%c1、语音弹幕接受到的参数...","color: green",e),this.isEnglist=e.isEnglist||!1,this.stringTotalLength=this.isEnglist?80:50,this.params=e,this.initVoice().then(function(){t.microphone&&t.recorder.start()})},close:function(){this.voicePanl=!1,this.isVoice=!1,this.isEnglist=!1,this.siri.stop(),this.recorder.stop(),clearInterval(this.overTime)},initVoice:function(){var e=this;return d()(c.a.mark(function t(){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return v.a.support?(e.microphone=!0,e.isEnglist?e.voiceMessage="语音录入中，大声说英语哦！":e.voiceMessage="语音录入中，大声开口说哦！",e.voicePanl=!0,e.isVoice=!0,e.isWriting=!1,setTimeout(function(){e.initSiri()},0)):b({message:"声音采集失败",content:"请检查你的麦克风是否正常工作",dom:"module",skinType:e.skinType,showCancel:!1,sureBtnName:"确认",cancelBtnName:"取消"}).then(function(t){e.$emit("onMicrophone")}),e.recorder=v.a.createRecorder({stuid:e.params.stuId||"",testid:e.params.testId||"",liveid:e.params.planId||"",wss:"wss://asr.xueersi.com/wsh5",mindb:-75,pid:e.params.pid||"1103113"}),t.next=4,e.recorder.init();case 4:e.recorder.on("onResult",function(t){console.log("%c语音弹幕通过ai接受到的消息","color: #ffffff; background: red; padding: 4px 6px; font-size: 20px; border-radius: 12px;",t);var n=t.data&&t.data.imme_content&&t.data.imme_content.nbest,i=t.data&&t.data.asr_content&&t.data.asr_content.nbest;n&&e.$emit("onVoiceMessage",n,!1),i&&e.$emit("onVoiceMessage",i,!0)}),e.recorder.on("analysering",function(t){e.siri.setAmplitude(20*t)}),e.recorder.on("onVolumeDBTooSmall",function(e){console.log("%c说话声音过小","color: #ffffff; background: green; padding: 4px 6px; font-size: 20px; border-radius: 12px;",e)}),e.recorder.on("onInvalid",function(t){e.recorder.start(),console.log("当AI返回无效值的时候触发")});case 8:case"end":return t.stop()}},t,e)}))()},initSiri:function(){this.siri=new u.a({container:document.getElementById("siribox"),width:"300",height:30,style:"ios9",speed:"0.5",amplitude:1,autostart:!0}),this.siri.start()}}},C={render:function(){var e=this.$createElement,t=this._self._c||e;return this.voicePanl?t("div",{staticClass:"voice_container"},[t("div",{staticClass:"voice_box"},[t("div",{staticClass:"voice"},[t("div",{directives:[{name:"show",rawName:"v-show",value:this.isVoice,expression:"isVoice"}]},[t("div",{staticClass:"voicelip"},[this._v(this._s(this.voiceMessage))]),this._v(" "),t("div",{staticClass:"siriware",attrs:{id:"siribox"}})])])])]):this._e()},staticRenderFns:[]};var M=n("VU/8")(w,C,!1,function(e){n("BbUB")},"data-v-9339beaa",null).exports,$=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=new(i.default.extend(M))({data:e});return t.$mount(),document.querySelector(e.moduleSelector).appendChild(t.$el),t},k={name:"index",data:function(){return{message:"",language:"false",isStart:!1,middleMessage:"",finalleMessage:""}},methods:{start:function(){var e=this;this.isStart=!0,this.voicebox=new $({moduleSelector:".voice_box"}),this.voicebox.open({isEnglist:!1,useSendTime:0,stuId:"",testId:"",planId:"",pid:"true"===this.language?"1103714":""}),this.voicebox.$on("onVoiceMessage",function(t,n){e.middleMessage=t,n&&(e.isStart=!1,e.finalleMessage?e.finalleMessage+=","+t:e.finalleMessage+=t,e.voicebox.close()),console.log("成功发送的回调,接收到的消息",t)}),this.voicebox.$on("onMicrophone",function(){e.isStart=!1,console.log("检查麦克风是否可用...")})}}},E={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"voice_container"},[n("div",{staticClass:"typelist"},[n("RadioGroup",{model:{value:e.language,callback:function(t){e.language=t},expression:"language"}},[n("Radio",{attrs:{label:"false"}},[e._v("Chinese")]),e._v(" "),n("Radio",{attrs:{label:"true"}},[e._v("English")])],1)],1),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.finalleMessage,expression:"finalleMessage"}],attrs:{placeholder:"最终录音显示内容，请尽情的施展你的才华......"},domProps:{value:e.finalleMessage},on:{input:function(t){t.target.composing||(e.finalleMessage=t.target.value)}}}),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.middleMessage,expression:"middleMessage"}],attrs:{placeholder:"中间录音内容显示....."},domProps:{value:e.middleMessage},on:{input:function(t){t.target.composing||(e.middleMessage=t.target.value)}}}),e._v(" "),n("div",{staticClass:"voice_box"},[e.isStart?e._e():n("div",{staticClass:"startbtn",on:{click:e.start}},[e._v("开始")])])])},staticRenderFns:[]};var V=n("VU/8")(k,E,!1,function(e){n("yGJU")},"data-v-aed0475c",null).exports;i.default.use(o.a);var y=new o.a({routes:[{path:"/",name:"index",component:V}]}),B=n("c4OW"),N=n.n(B);n("/Oh2");i.default.config.productionTip=!1,i.default.use(N.a),new i.default({el:"#app",router:y,components:{App:a},template:"<App/>"})},"XQ3+":function(e,t){},yGJU:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.f1032c1657c89586973e.js.map