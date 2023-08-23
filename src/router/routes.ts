import { RouteRecordRaw} from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import PeoplesList from '../pages/PeoplesList.vue';
import PeopleCard from '../pages/PeopleCard.vue';
import FavoritesList from '../pages/FavoritesList.vue';

const routes: Readonly<RouteRecordRaw[]> = [
    { path: '/', component: HomePage },
    { path: '/peoples', component: PeoplesList },
    { path: '/peoples/:id', component: PeopleCard },
    { path: '/favorites', component: FavoritesList },
];

export default routes;