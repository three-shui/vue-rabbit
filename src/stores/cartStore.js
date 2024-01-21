import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { addCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
import { useUserStore } from '@/stores/userStore'

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const userStore = useUserStore()
  //获取token来判断是否登录
  const isLogin = computed(() => userStore.userInfo.token)

  const updateNewList = async () => {
    //2.获取最新的购物车数据
    const res = await findNewCartListAPI()
    //3.用最新的购物车数据更新pinia中的数据
    cartList.value = res.data.result
  }

  //加入购物车
  const addCart = async (goods) => {
    if (isLogin.value) { //已经登录，走接口
      const { skuId, count } = goods
      //1.先加入购物车
      await addCartAPI({ skuId, count })
      updateNewList()
    } else {
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
  }

  //清空购物车
  const clearCart = () => {
    cartList.value = []
  }

  //单选
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  //是否全选
  const isAll = computed(() => cartList.value.every(item => item.selected))

  //全选
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  //清除购物车的某一项
  //思路：先找到下标值 ==>  1.使用splice  2.使用filter
  const delCart = async (skuId) => {
    if (isLogin.value) { //走接口
      //1.删除
      await delCartAPI([skuId])
      updateNewList()
    } else {
      const index = cartList.value.findIndex((item) => item.skuId === skuId)
      cartList.value.splice(index, 1)
    }
  }

  //计算属性
  //总数量
  const allCount = computed(() => cartList.value.reduce((sum, c) => sum + c.count, 0))
  //总价格
  const allPrice = computed(() => cartList.value.reduce((sum, c) => sum + c.count * c.price, 0))

  //已选择商品数量
  //filter返回的是一个数组，所以可以链式调用
  const selectCount = computed(() => cartList.value.filter(item => item.selected).reduce((sum, c) => sum + c.count, 0))

  //已选择商品价格
  const selectPrice = computed(() => cartList.value.filter(item => item.selected).reduce((sum, c) => sum + c.count * c.price, 0))

  return { cartList, addCart, delCart, allCount, allPrice, singleCheck, isAll, allCheck, selectCount, selectPrice, clearCart, updateNewList }
},
  //持久化
  {
    persist: true,
  }
)