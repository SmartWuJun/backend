import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import TodoList from '@/components/TodoList'

Vue.use(Router)

const router=new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/todolist',
            name: 'todolist',
            component: TodoList
        },
        {
            path: '/*',
            component: Login
        },
    ]
})

router.beforeEach((to,from,next) =>{
    const token = sessionStorage.getItem('demo-token');
    if(to.path == '/'){ // 如果是跳转到登录页的
      if(token != 'null' && token != null){
        next('/todolist') // 如果有token就转向todolist不返回登录页
      }
      next(); // 否则跳转回登录页
    }else{
      if(token != 'null' && token != null){
        next() // 如果有token就正常转向
      }else{
        next('/') // 否则跳转回登录页
      }
    }
  })

export default router