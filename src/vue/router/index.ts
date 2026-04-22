import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import BlogView from '../views/BlogView.vue'
import PostView from '../views/PostView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LandingView },
    { path: '/blog', component: BlogView },
    { path: '/blog/:slug', component: PostView },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
