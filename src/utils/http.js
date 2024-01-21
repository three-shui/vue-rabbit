import axios from "axios";
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// 添加请求拦截器
httpInstance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //在请求头中携带token
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
        //注意:这里有个空格
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
httpInstance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    const userStore = useUserStore()
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElMessage({
        type: 'warning',
        message: error.response.data.message
    })
    //401 token失效后的操作
    if (error.response.status === 401) {
        //1.清除token
        userStore.clearUserInfo()
        //2.跳转到登录页
        //注意：这里不能使用userouter  而应该直接导入router文件。不然无法跳转登录页面
        router.push('/login')
    }
    return Promise.reject(error);
});

export default httpInstance;