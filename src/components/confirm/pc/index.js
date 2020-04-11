import Vue from 'vue'
import Main from './confirm.vue'

const Constructor = Vue.extend(Main)

let vm = null
// let fn = null

const $confirm = function (options = {}) {
  return new Promise((resolve, reject) => {
    vm = new Constructor({
      data: options
    })
    // fn = resolve
    vm.$mount()
    const target = document.getElementById(options.dom) || document.body
    target.appendChild(vm.$el)
    vm.show()
    vm.$on('ok', () => resolve(true))
    vm.$on('cancel', () => resolve(false))
  })
}

$confirm.close = function () {
  if (vm) {
    console.log('111111', vm)
    vm.handleOk()
  }
}

export default $confirm
