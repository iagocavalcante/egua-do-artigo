import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  mode: 'history',
}).$mount('#app')
