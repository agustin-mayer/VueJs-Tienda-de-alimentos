import Vue from 'vue'
import VueRouter from 'vue-router'
const filterView = () => import(/* webpackChunkName: "filterView" */'./views/filterView.vue');
const ProductView = () => import(/* webpackChunkName: "productView" */'./views/ProductView.vue');
const mainView = () => import(/* webpackChunkName: "mainView" */'./views/mainView.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '/filters',
    name: 'filterView',
    component: filterView
  },
  {
    path: '/product/:id',
    name: 'ProductView',
    component: ProductView
  },
  {
    path: '/',
    name: 'mainView',
    component: mainView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router