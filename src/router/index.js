import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index';
// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login';


// Pages
// Resume
import UserInfo from '@/pages/Resume/UserInfo';


Vue.use(Router)

const router =  new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      redirect: '/admin/dashboard',
      name: 'Home',
      component: Full,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'userinfo',
          name: 'UserInfo',
          component: UserInfo
        }

      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log(store.state.logged);
    if (!store.state.logged) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
});

export default router;
