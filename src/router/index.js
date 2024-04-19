import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ChangePassword from '@/views/ChangePassword.vue'
import AdministratorRegisterView from '@/views/AdministratorRegisterView.vue'
import RootView from '@/views/RootView.vue'
import SendConfirmationView from '@/views/SendConfirmationView.vue'
import AddBookView from '@/views/AddBookView.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/',
    redirect: '/login', // Redirige /about a /login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView
  },
  {
    path: '/about',
    redirect: '/login', // Redirige /about a /login
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: ChangePassword
  },
  {
    path: '/administrator-register',
    name: 'administrator-register',
    component: AdministratorRegisterView
  },
  {
    path: '/root',
    name: 'root',
    component: RootView
  },

  {
    path: '/send-confirmation',
    name: 'send-confirmation',
    component: SendConfirmationView
  },

  {
    path: '/add-book',
    name: 'add-book',
    component: AddBookView
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
