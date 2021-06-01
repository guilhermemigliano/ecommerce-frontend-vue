import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Cliente from '../views/Cliente.vue'
import ClientePedidos from '../views/ClientePedidos.vue'
import store from '../store'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("user")).token && JSON.parse(localStorage.getItem("user")).autorizacao == "ROLE_ADMIN" )  {
        next()
      } else {
        next(false)
        router.push('/')
      }
    }
  },
  {
    path: '/pedidosAdm',
    name: 'PedidosAdmin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PedidosAdm.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("user")).token && JSON.parse(localStorage.getItem("user")).autorizacao == "ROLE_ADMIN" )  {
        next()
      } else {
        next(false)
        router.push('/')
      }
    }
  },
  {
    path: '/clientesAdm',
    name: 'ClientesAdmin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ClientesAdm.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("user")).token && JSON.parse(localStorage.getItem("user")).autorizacao == "ROLE_ADMIN" )  {
        next()
      } else {
        next(false)
        router.push('/')
      }
    }
  },
  {
    path: '/cliente',
    name: 'Cliente',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Cliente,
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("user")).token && JSON.parse(localStorage.getItem("user")).autorizacao == "ROLE_USER" )  {
        next()
      } else {
        next(false)
        router.push('/')
      }
    }
  },
  {
    path: '/clientePedidos',
    name: 'ClientePedidos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ClientePedidos,
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("user")).token && JSON.parse(localStorage.getItem("user")).autorizacao == "ROLE_USER" )  {
        next()
      } else {
        next(false)
        router.push('/')
      }
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (store.state.permiteNavegacao) {
    next()
  } else {
    next(false)
  }
})

export default router
