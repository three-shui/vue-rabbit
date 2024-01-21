import httpInstance from "@/utils/http";

//生成-订单(结算页)
export const getCheckoutInfoAPI = () => {
  return httpInstance({
    url: '/member/order/pre'
  })
}

//创建订单
export const createOrderAPI = (data) => {
  return httpInstance({
    url: '/member/order',
    method: 'POST',
    data
  })
}