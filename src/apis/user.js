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