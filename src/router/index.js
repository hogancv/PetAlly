import { createWebHistory, createRouter } from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                top: 0
            }
        }
    }
})

router.afterEach(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
})

export default router
