import httpInstance from "@/utils/http"

//登录
export function loginAPI({ account, password }) {
  return httpInstance({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}

//猜你喜欢
export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance({
    url: '/goods/relevant',
    params: {
      limit
    }
  })
}