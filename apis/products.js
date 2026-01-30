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

// 资讯公告
export function notice (pageSize=5) {
  return request.get(`/notice?pageSize=${pageSize}`)
}

// 限时秒杀
export function seckill() {
  return request.get('seckill')
}

// 爆品推荐
export function hotGoods() {
  return request.get('/hotGoods')
}

// 疯狂砍价
export function discount() {
  return request.get('./discount')
}

// 全民拼团
export function collage() {
  return request.get('./collage')
}