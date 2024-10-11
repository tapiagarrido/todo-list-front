import MainLayout from '@/layout/MainLayout.vue'
import Information from '@/views/Information.vue'
import TodoList from '@/views/TodoList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children:[
        {
          path:'todo-list',
          name:'todo-list',
          component:TodoList
        },
        {
          path: 'information',
          name: 'information',
          component: Information
        }
      ]
    }
  ]
})

export default router
