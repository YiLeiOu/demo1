import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// 点击下一页回到顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
