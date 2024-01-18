import { useIntersectionObserver } from '@vueuse/core'

//自定义懒加载插件
export const lazyPlugin = {
  install(app) {
    app.directive('img-lazy', {
      //el:指令绑定的那个元素 img
      //binding: binding.value 代表等于号右边绑定的表达式的值  图片url
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            //判断是否进入视口区域
            if (isIntersecting) {
              el.src = binding.value
              stop()
            }
          }
        )
      }
    }
    )

  }
}