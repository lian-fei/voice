import Vue from 'vue'
import index from './index.vue'

const component = (options = {}) => {
  const Constructor = Vue.extend(index)
  const vm = new Constructor({
    data: options
  })
  vm.$mount()
  document.querySelector(options.moduleSelector).appendChild(vm.$el)
  return vm
}
export default component
