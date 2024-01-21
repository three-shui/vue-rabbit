import httpInstance from "@/utils/http";

//获取商品详情
export const getOrderAPI = (id) => {
  return httpInstance({
    url: `/member/order/${id}`
  })
}