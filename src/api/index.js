// 包含应用中所有接口请求的函数
// 每个函数的返回值都是promise

import ajax from './ajax'
// const BASE = 'http://120.55.193.14:5000'
const BASE = ''

// 登录
export const reqLogin = (username, password) =>
	ajax(BASE+'/login', { username, password }, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(BASE+'/manage/user/add', user, 'POST')
