import request from '@/utils/request'

const userApi = {
  Captcha: '/api/v1/captcha',
  Login: '/api/v1/login',
  Logout: '/api/v1/logout',
  UserInfo: '/api/v1/getinfo'
}

export function captcha () {
  return request({
    url: userApi.Captcha,
    method: 'get'
  })
}

export function login (data) {
  return request({
    url: userApi.Login,
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    params: { token },
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}
