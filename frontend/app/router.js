import VueRouter from 'vue-router';

import Home from './views/Home.vue';
import Actors from './views/Actors.vue';

const routes = [
    {
        path: '/coursework/',
        component: Home
    },
    {
        path: '/coursework/actors',
        component: Actors
    },
];

export default new VueRouter({
    mode: 'history',
    routes
});
