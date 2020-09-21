import Vue from 'vue'
import Vuetify from 'vuetify'
import theme from './theme'
import es from 'vuetify/es5/locale/es'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme,
  lang: {
    locales: { es },
    current: 'es'
  }
})
