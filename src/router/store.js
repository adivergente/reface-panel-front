import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
    key: 'reface',
    storage: window.localStorage
})

const store = new Vuex.Store({
    state: {
        token: null,
        settings: null,
        userdata: null,
        sales: null
    },
    mutations: {
        setToken(state, t) {
            //console.log('setoken')
            state.token = t
        },
        setSettings(state, d) {
            state.settings = d
        },
        setUserData(state, a) {
            state.userdata = a
        },
        setSales(state, a) {
            state.sales = a
        }
    },
    getters: {
        getToken: state => () => {
            //console.log('setoken',state.token)
            return state.token
        },
        getSettings: state => () => {
            return state.settings
        },
        getUserData: state => () => {
            return state.userdata
        },
        getSales: state => () => {
            return state.sales
        }
    },
    plugins: [vuexLocal.plugin]
})

export default store