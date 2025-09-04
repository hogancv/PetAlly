import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router/index'
import pinia from './store/index'
// 全量引入
import TDesign from 'tdesign-mobile-vue';
import 'tdesign-mobile-vue/es/style/index.css';
import '@/assets/style/global.css'
import {
    lazyPlugin
} from "@/directive";
import Message from '@/components/Message'


const app = createApp(App);
app.use(lazyPlugin);
app.use(TDesign);
app.use(pinia);
app.use(router);
app.config.globalProperties.$message = Message
app.mount('#app');