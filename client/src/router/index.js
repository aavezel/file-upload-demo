import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PageNotFound from '../views/PageNotFound';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/add',
    name: 'AddFile',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddFile.vue')
  },
  {
    path: '/upload/:file_id',
    name: 'UploadFile',
    component: () => import(/* webpackChunkName: "about" */ '../views/UploadFile.vue')
  },
  { path: "*", component: PageNotFound }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
