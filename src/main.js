'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
// import App from './App'

import { configRouter } from './route-config'

require('es6-promise').polyfill()
/* eslint-disable no-new */

// 安装路由
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueValidator)

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
var router = new VueRouter({
  history: true,
  saveScrollPosition: true
})

configRouter(router)

// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由

// router.map({
//   '/foo': {
//     component: Foo
//   },
//   '/bar': {
//     component: Bar
//   }
// })

const App = Vue.extend(require('./App.vue'))

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app')
