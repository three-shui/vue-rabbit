import httpInstance from "@/utils/http";

//加入购物车
export const addCartAPI = ({ skuId, count }) => {
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count //商品数量
    }
  })
}

//获取最新购物车列表
export const findNewCartListAPI = () => {
  return httpInstance({
    url: '/member/cart'
  })
}

//删除购物车商品
export const delCartAPI = (ids) => {
  return httpInstance({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

//合并购物车
//这里的data需要传过来一个数组
export const mergeCartAPI = (data) => {
  return httpInstance({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}