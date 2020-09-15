/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'
import VueJWT from 'vuejs-jwt'
//import store from './store'
import LayoutPage from '../components/core/LayoutPage'

Vue.use(VueJWT,{
  "signKey":"c,3Y>sS;8}5[ubec",
  "store":"localStorage",
  "keyName":"reface"
})
// Routes
import paths from './paths'
import Login from '@/views/Login'
function route (path, view, name) {
  return {
    name: name || view,
    path,
    component: (resolve) => import(
      `../views/${view}.vue`
    ).then(resolve)
  }
}

Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
       {
      path: '/panel',
      component: LayoutPage,
      children: paths.map(path => route(path.path, path.view, path.name)).concat([
          { path: '*', redirect: '/dashboard' }
        ])
    },
    {
      path: '/',
      component: LayoutPage,
      children: paths.map(path => route(path.path, path.view, path.name)).concat([
          { path: '*', redirect: '/dashboard' }
        ])
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
  /*routes: paths.map(path => route(path.path, path.view, path.name)).concat([
    { path: '*', redirect: '/dashboard' }
  ]),*/
  /*scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }*/
})
router.beforeEach((to, from, next) => {
  validRole(to, from, next)
})
const validRole = function (to, from, next) {
  console.log('viene de : ',to.name)
  let token = localStorage.getItem('reface')
  console.log('token: ',token)
  //= store.getters.getToken();
  /*if(token != null){
    token = localStorage.getItem('reface')
  }else{
    token = null
  }*/
  if (to.name == "panel" ) {
    next();
  } else if (token == null) {
    console.log('no token')
      if (to.name == "Login") {
        console.log('next')
          next();
      } else {
        console.log('exit')
          logout(next);
      }
  } else {
    console.log('si token')
      if (to.name == "Login") {
        console.log('login')
          next();
      } else {
          if(validToken(token)){
            console.log('no login')
            next();
          }else{
              logout(next);
          }
      }
  }
};
const validToken = function(token){
  try {
    //const playload = Vue.$jwt.decode(token)
    const playload = true
    if(playload == null){
      return false;
    }else{
      return true;
    }
  } catch (error) {
    return false;
  }
}
const logout = function (next) {
  console.log('logaut')
  localStorage.removeItem('Reface')
  //store.commit("setToken", null);

  next({ name: "Login" });
};
Vue.use(Meta)

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.GOOGLE_ANALYTICS) {
  Vue.use(VueAnalytics, {
    id: process.env.GOOGLE_ANALYTICS,
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development'
    }
  })
}

export default router
