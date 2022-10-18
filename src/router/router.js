import { createRouter, createWebHistory } from 'vue-router';
import TableCoins from '../components/TableCoins.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
       { path: "/", component: TableCoins},
       { path: "/coin/", component: TableCoins,},
       { path: "/coin/:id", name: "Coin", component: () => import("../components/Coin.vue"),}
    ]
})

export default router;