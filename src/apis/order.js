import httpInstance from "@/utils/http";

/* 获取我的订单数据
params: {
  orderState:0,
  page:1,
  pageSize:2
}
*/
export const getUserOrderAPI = (params) => {
  return httpInstance({
    url: '/member/order',
    params
  })
}