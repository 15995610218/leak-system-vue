import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/index'
import Login from '../views/login'
import Home from '../views/home/home'
import store from "@/store";

//异步
const Beijing = ()=>import('../views/beiing/beijing.vue')
const Kunshan = ()=>import('../views/kunshan/kunshan.vue')
const Hefei = ()=>import('../views/hefei/hefei.vue')
const Xian = ()=>import('../views/xian/xian.vue')
const Ksleak = ()=>import('../views/kunshan/leakManagement/leak.vue')
const Ksrisk = ()=>import('../views/kunshan/riskManagement/risk.vue')
const Bjleak = ()=>import('../views/beiing/leakManagement/bjleak.vue')
const Bjrisk =()=>import('../views/beiing/riskManagement/bjrisk.vue')
const Hfleak =()=>import('../views/hefei/leakManagement/hfleak.vue')
const Hfrisk = ()=>import('../views/hefei/riskManagement/hfrisk')
const Xaleak = ()=>import('../views/xian/leakManagement/xaleak')
const Xarisk = ()=>import('../views/xian/riskManagement/xarisk')
const Addksleak = ()=>import('../views/kunshan/leakManagement/Addleak.vue')
const Editksleak = ()=>import('../views/kunshan/leakManagement/editleak.vue')
const Systemmanagement = ()=>import('../views/systemmanagement/systemmanagement.vue')
const Usermanagement = ()=>import('../views/systemmanagement/usermanagement/usermanagement.vue')

Vue.use(VueRouter)

  //初始化路由
const routes = [
  {
    path:'/login',
    name:'Login',
    component: Login
  },
  {
    path:'',
    component: Layout,
    meta:{
      title:"首页"
    },
    children:[
      {
        path: '/',
        name:'home',
        meta:{
          requireAuth:true,
          title:"首页"
        },
        component: Home
      },
      {
        path:'/beijing',
        name:'beijing',
        component: Beijing,
        meta: {
          title:"北京中心"
        },
        redirect:'/beijing/bjleak',
        children: [
          {
            path: 'bjleak',
            meta:{
              requireAuth:true,
              title: "北京漏洞"
            },
            component:Bjleak
          },
          {
            path:'bjrisk',
            meta:{
              requireAuth:true,
              title: "北京风险"
            },
            component:Bjrisk
          }
        ]
      },
      {
        path:'/kunshan',
        name:'kunshan',
        meta:{
          requireAuth:true,
          title:"昆山中心"
        },
        component:Kunshan,
        redirect:'/kunshan/ksleak',
        children:[
          {
            path:'ksleak',
            meta:{
              requireAuth:true,
              title: "昆山漏洞"
            },
            component:Ksleak
          },
          {
            path:'ksrisk',
            meta:{
              requireAuth:true,
              title: "昆山风险"
            },
            component:Ksrisk
          },
          {
            path: 'addksleak',
            name: 'addksleak',
            //设置路由元信息
            meta:{
              activeMenu:'/kunshan/ksleak'
            },
            component:Addksleak,
          },
          {
            path: 'editksleak',
            name: 'editksleak',
            //设置路由元信息
            meta:{
              activeMenu: '/kunshan/ksleak',
            },
            component:Editksleak
          }

        ]
      },
      {
        path:'/xian',
        name:'xian',
        meta:{
          requireAuth:true,
          title: "西安中心"
        },
        component: Xian,
        redirect:'/xian/xaleak',
        children:[
          {
            path:'xaleak',
            meta:{
              requireAuth:true,
              title: "西安漏洞"
            },
            component:Xaleak
          },
          {
            path:'xarisk',
            meta:{
              requireAuth:true,
              title:"西安风险"
            },
            component:Xarisk
          }
        ]
      },
      {
        path:'/hefei',
        name:'hefei',
        meta:{
          requireAuth:true,
          title:"合肥中心"
        },
        component: Hefei,
        redirect: '/hefei/hfleak',
        children: [
          {
            path:'hfleak',
            meta:{
              requireAuth:true,
              title: "合肥漏洞"
            },
            component:Hfleak
          },
          {
            path:'hfrisk',
            meta:{
              requireAuth:true,
              title: "合肥风险"
            },
            component:Hfrisk
          }
        ]
      },
      {
        path: '/systemmanagement',
        name: 'systemmanagement',
        meta:{
          requireAuth:true,
          title: "系统管理"
        },
        component: Systemmanagement,
        redirect: '/systemmanagement/usermanagement',
        children: [
          {
            path: 'usermanagement',
            meta:{
              requireAuth:true,
              title: "用户管理"
            },
            component:Usermanagement
          }
        ]
      }
    ]
  }
]
  //准备动态加载的路由
// export const DynamicRoutes = [
//   {
//     path:"",
//     component:Layout,
//     redirect:"home",
//     meta:{
//       requiresAuth:true,
//       name:"首页"
//     },
//     children:[
//       {
//         path:"home",
//         component:Home,
//         name:"home",
//         meta:{
//           //匹配规则
//           name:"首页",
//           icon:"icon-name"
//         }
//       }
//     ]
//   },
//   {
//     path:'/403',
//     component: Forbidden
//   },
//   {
//     path:'*',
//     component: NotFound
//   }
// ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to,from,next) => {
  if (to.meta.requireAuth){
    if (store.state.UserToken){

      next()
    }else {
      next({
        path:'/login'
      })
    }
  }else {
    next()
  }
})