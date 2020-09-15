// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'

// Sync store with router
sync(store, router)

Vue.config.productionTip = false

/*Vue.use(VueJWT,{
  "signKey":"c,3Y>sS;8}5[ubec",
  "store":"localStorage",
  "keyName":"reface"
})*/

/*Vue.prototype.$decodeToken = function(token, sign){
  if(typeof token == "undefined" || typeof sign == "undefined"){
    return this.$jwt.decode(JSON.parse(this.$jwt.getToken()).token)
  }else{
    return this.$jwt.decode(token, sign)
  }
}*/
/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
