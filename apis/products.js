import request from '../utils/request'

// 轮播图
export function bannerList () {
  return request.get("/bannerList")
}

// 金刚区
export function category () {
  return request.get('/category')
}

// 购买记录接口
export function goodsDynamic () {
  return request.get('/goodsDynamic')
}