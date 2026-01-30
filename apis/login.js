import request from '../utils/request'

export function checkToken (data) {
  return request.post("/checkToken", data)
}

export function loginApi (data) {
  return request.post("/login", data)
}