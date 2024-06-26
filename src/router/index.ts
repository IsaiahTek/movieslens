import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: () => import('../views/MovieView.vue')
    },
    {
      path: '/movies',
      name: 'movies',
      // route level code-splitting
      // this generates a separate chunk (movies.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ExploreView.vue')
    }
  ]
})

export default router
