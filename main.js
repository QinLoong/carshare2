import App from './App'
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import toast from '@/common/utils/toast'
import store from './store'
import ScrollTolower from '@/components/scroll-tolower/index.vue'
import moment from 'moment'
// import useMqtt from './useMqtt'

Vue.use(uView)
uni.$u.config.unit = 'rpx'

Vue.prototype.$toast = toast
Vue.prototype.$moment = moment
Vue.prototype.$format = val => moment(val).format('YYYY-MM-DD HH:mm:ss')
Vue.prototype.$global = {baseUrl:'http://127.0.0.1:8901/api'}
// Vue.prototype.$global = {baseUrl:'http://192.168.17.170:8901/api'}
// Vue.prototype.$global = {baseUrl:'http://192.168.1.102:8901/api'}

Vue.component('ScrollTolower', ScrollTolower) 

// useMqtt(Vue)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
