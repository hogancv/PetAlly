// 引入axios
import axios from 'axios'
import { MessagePlugin } from 'tdesign-mobile-vue'
// 定义baseURL和过期时间
axios.defaults.timeout = 2000
// 添加拦截器interceptor
axios.interceptors.request.use(
    function (config) {
        // 处理token
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    function (response) {
        if (response?.data?.code) {
            return response.data.data
        } else {
            return response
        }
    },
    function (error) {
        MessagePlugin.error('网络错误')
        return Promise.reject(error)
    }
)
// 导出axios使用
export default axios
