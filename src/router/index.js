import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/layout/App.vue'),
    children: [
      {
        path: '/',
        redirect: {
          name: 'home'
        }
      },

      {
        path: '/dashboard',
        name: 'home',
        component: () => import('../views/Dashboard.vue')
      },  

      {
        path: '/crop',
        name: 'crop',
        component: () => import('../views/crop/Index.vue'),
      },

      {
        path: '/crop/:id/show',
        name: 'cropShow',
        component: () => import('../views/crop/Show.vue'),
        props: true
      },
    
      {
        path: '/crop/:id/edit',
        name: 'cropEdit',
        component: () => import('../views/crop/Edit.vue'),
        props: true
      },

      {
        path: '/crop/create',
        name: 'cropCreate',
        component: () => import('../views/crop/Create.vue'),
      },

      {
        path: '/crop/trash',
        name: 'cropTrash',
        component: () => import('../views/crop/Trash.vue'),
      },

            
      {
        path: '/crop-measurement-condition',
        name: 'cropMeasurementCondition',
        component: () => import('../views/crop_measurement_condition/Index.vue')
      },        
      
      {
        path: '/crop-measurement-condition/:id/show',
        name: 'cropMeasurementConditionShow',
        component: () => import('../views/crop_measurement_condition/Show.vue'),
        props: true
      },
          
      {
        path: '/crop-measurement-condition/:id/edit',
        name: 'cropMeasurementConditionEdit',
        component: () => import('../views/crop_measurement_condition/Edit.vue'),
        props: true
      },

      {
        path: '/crop-measurement-condition/create',
        name: 'cropMeasurementConditionCreate',
        component: () => import('../views/crop_measurement_condition/Create.vue'),
      },

      {
        path: '/crop-measurement/trash',
        name: 'cropMeasurementConditionTrash',
        component: () => import('../views/crop_measurement_condition/Trash.vue'),
      },

      {
        path: '/crop-disease',
        name: 'cropDisease',
        component: () => import('../views/crop_disease/Index.vue'),
      },
      
      {
        path: '/crop-disease/:id/show',
        name: 'cropDiseaseShow',
        component: () => import('../views/crop_disease/Show.vue'),
        props: true
      },
      
      {
        path: '/crop-disease/:id/edit',
        name: 'cropDiseaseEdit',
        component: () => import('../views/crop_disease/Edit.vue'),
        props: true
      },

      {
        path: '/crop-disease/create',
        name: 'cropDiseaseCreate',
        component: () => import('../views/crop_disease/Create.vue'),
      },

      {
        path: '/crop-disease/trash',
        name: 'cropDiseaseTrash',
        component: () => import('../views/crop_disease/Trash.vue'),
      },

      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/Index.vue'),
      },
          
      {
        path: '/user/:id/show',
        name: 'userShow',
        component: () => import('../views/user/Show.vue'),
        props: true
      },
          
      {
        path: '/user/:id/edit',
        name: 'userEdit',
        component: () => import('../views/user/Edit.vue'),
        props: true
      },
          
      {
        path: '/user/create',
        name: 'userCreate',
        component: () => import('../views/user/Create.vue'),
      },

      {
        path: '/setting',
        name: 'setting',
        component: () => import('../views/Setting.vue'),
      }
    ]
  },

  {
    path: '/guest',
    component: () => import('../views/layout/Guest.vue'),
    children: [
      {
        path: '/guest',
        redirect: {
          name: 'login',
        }
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/Register.vue')
      },
      {
        path: '/reset',
        name: 'reset',
        component: () => import('../views/auth/Reset.vue')
      },
      {
        path: '/forget',
        name: 'forget',
        component: () => import('../views/auth/Forget.vue')
      }
    ]
  },

  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const guestRoute = ['login', 'register', 'forget', 'reset'];
  let authenticated = window.localStorage.getItem("authenticated");
  if(authenticated == 1) {
    if (guestRoute.includes(to.name)) {
      next({
        name: 'home'
      })
    } else {
      next()
    } 
  } else if(authenticated == 0){
    if (guestRoute.includes(to.name)) {
      next()
    } else {
      next({name: 'login'})
    }
  } else {
    if (guestRoute.includes(to.name)) {
      next()
    } else {
      next({name: 'login'})
    }
  }
})

export default router
