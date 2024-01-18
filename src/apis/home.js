import httpInstance from "../utils/http";

//获取轮播图
export function getBannerAPI() {
  return httpInstance({
    url: '/home/banner'
  })
}

//获取新鲜好物
export function getNewAPI() {
  return httpInstance({
    url: '/home/new'
  })
}

//获取人气推荐
export function getHotAPI() {
  return httpInstance({
    url: '/home/hot'
  })
}