//封装倒计时函数
import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  let timer = null
  const time = ref(0)
  //1.格式化时间
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  //2.开启倒计时函数
  const start = (currentTime) => {
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000);
  }

  //3.组件销毁时清除定时器
  onUnmounted(() => {
    timer && clearInterval(timer)  //这句代码太优雅了
  })

  return { formatTime, start }
}