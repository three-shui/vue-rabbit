import { onBeforeRouteUpdate } from 'vue-router'
import { getCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export function useCategory() {
  //后端返回的category是一个对象
  const category = ref({})

  //获取路径参数
  const route = useRoute()

  //route.params.id 为id的默认参数，当下面的onMounted调用时使用
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    category.value = res.data.result
  }

  onMounted(() => getCategory())

  //解决路由缓存
  //这里的to指的是目标路由
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })

  return { category }
}