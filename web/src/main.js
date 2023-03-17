import {createRouter, createWebHashHistory} from 'vue-router'
import {createApp} from 'vue'
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import App from './App.vue'
import Home from './views/Chat.vue'
import NotFound from './views/404.vue'
import './utils/prototype'
import "./assets/css/bootstrap.min.css"


const routes = [
    {
        name: 'home', path: '/', component: Home, meta: {
            title: 'ChatGPT-Console'
        }
    },
    {
        name: 'NotFound', path: '/:all(.*)', component: NotFound, meta: {
            title: '页面没有找到'
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

// dynamic change the title when router change
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

const app = createApp(App)
app.use(router).use(ElementPlus).mount('#app')


