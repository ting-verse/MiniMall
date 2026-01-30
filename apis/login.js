import request from '../utils/request'

// 校验token有效性
export function checkToken (data) {
  return request.post("/checkToken", data)
}

// 小程序静默登录接口
export function loginApi (data) {
  return request.post("/login", data)
}

// 解密用户信息
export function encrypt (data) {
  return request.post("/encrypt", data)
}

// 获取手机号
export function getPhone (data) {
  return request.get(`/getPhone?code=${data}`)
}