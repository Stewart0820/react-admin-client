// 发生异步ajax请求的函数模块
import axios from 'axios'
// 统一处理请求异常
import {message} from 'antd'
//优化：统一处理请求异常
  // 在外层包一个自己创建的promise对象
  // 在请求出错是,不去reject() 而是显示错误提示


export default function ajax(url, data = {}, type = 'GET') {
	return new Promise((resolve, reject) => {
		let promise
		//1:执行异步ajax请求
		if (type === 'GET') {
			promise = axios.get(url, {
				params: data,
			})
		} else {
			promise = axios.post(url, data)
		}
		// 2：成功，调用resolve
    promise.then(response=>{
      resolve(response.data)
		// 3:失败，不调用reject，而是提示异常的信息
    }).catch(error=>{
      message.error('请求出错了：'+error.message)
    })
	})
}
