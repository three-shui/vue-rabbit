import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const addCart = (goods) => {
    //已添加过=》count+1
    //未添加过=》直接push
    //通过传过来的skuId来判断是否添加过
    const item = cartList.value.find((item) => item.skuId === goods.skuId)
    if (item) {
      item.count++
    } else {
      cartList.value.push(goods)
    }
  }

  //清除购物车的某一项
  //思路：先找到下标值 ==>  1.使用splice  2.使用filter
  const delCart = (skuId) => {
    const index = cartList.value.findIndex((item) => item.skuId === skuId)
    cartList.value.splice(index, 1)
  }

  //计算属性
  //总数量
  const allCount = computed(() => cartList.value.reduce((sum, c) => sum + c.count, 0))
  //总价格
  const allPrice = computed(() => cartList.value.reduce((sum, c) => sum + c.count * c.price, 0))

  return { cartList, addCart, delCart, allCount, allPrice }
},
  //持久化
  {
    persist: true,
  }
)