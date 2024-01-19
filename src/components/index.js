import XtxImageView from './imageView/index.vue'
import XtxSku from './XtxSku/index.vue'

// 把components中的所组件都进行全局化注册
// 通过插件的方式
export const componentPlugin = {
  install(app) {
    // app.component('组件名字'，组件配置对象)
    app.component('XtxImageView', XtxImageView)
    app.component('XtxSku', XtxSku)
  }
}