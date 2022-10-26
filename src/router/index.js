import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ImageUpload from '../views/UploadImageView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {auth: true}
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {auth: false}
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {auth: false}
  },
  {
    path: '/imageUpload',
    name: 'ImageUpload',
    component: ImageUpload,
    meta: {auth: false}
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})




router.beforeEach(function(from,to,next){
  const bool = localStorage.getItem('login') == null
  console.log(bool)
  console.log(from.meta.auth)
  if(from.meta.auth && localStorage.getItem('login') == null){
    console.log('1')
    next('/login')

  //}else if(from.meta.auth && localStorage.getItem('login') == null){

  
  } else {
    console.log('3')
    next()
  }
  
  
})

export default router
