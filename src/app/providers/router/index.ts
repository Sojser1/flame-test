import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
    { path: '/', component: () => import('../../../pages/HomePage/HomePage.vue') },
    { path: '/peoples', component: () => import('../../../pages/PeopleList/PeoplesList.vue') },
    { path: '/peoples/:id', component: () => import('../../../pages/PeopleCard/PeopleCard.vue') },
    { path: '/favorites', component: () => import('../../../pages/FavoriteList/FavoritesList.vue') },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})