import Vue from 'vue'
import App from './app/App.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter);
import router from './app/router'

import {
    BootstrapVue,
    BootstrapVueIcons
} from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {
    ClientTable
} from 'vue-tables-2';
Vue.use(ClientTable)


export default new Vue({
    el: '#root',
    render: h => h(App),
    router
})
