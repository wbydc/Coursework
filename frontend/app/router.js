import VueRouter from 'vue-router';

import Home from './views/Home.vue';
import Actors from './views/Actors.vue';
import Plays from './views/Plays.vue';
import Shows from './views/Shows.vue';
import Roles from './views/Roles.vue';
import Works from './views/Works.vue';

const routes = [
    {
        path: '/coursework/',
        component: Home
    },
    {
        path: '/coursework/actors',
        component: Actors
    },
    {
        path: '/coursework/plays',
        component: Plays
    },
    {
        path: '/coursework/shows',
        component: Shows
    },
    {
        path: '/coursework/roles',
        component: Roles
    },
    {
        path: '/coursework/works',
        component: Works
    },
];

export default new VueRouter({
    mode: 'history',
    routes
});
