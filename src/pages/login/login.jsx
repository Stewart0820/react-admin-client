import React from 'react'
import './login.less'
import logo from './images/logo.png'
import { Form, Input, Button,message } from 'antd'
import { reqLogin } from '../../api/index.js'
import memoryUtils from '../../utils/memoryUtils.js'

class Login extends React.Component {
	handleSubmit = (event) => {
		//阻止事件的默认行为
		event.preventDefault()
		this.props.form.validateFields(async (err, values) => {
			//可以对所有结果校验，并返回结果
			if (!err) {
				const { username, password } = values
				const result = await reqLogin(username, password) // {status:0,data:user}  {status:1,msg:'xxx}
        // 直接得到result
        if (result.status===0){
          //登录成功
          message.success('登录成功')

          // 保存user数据
          const user = result.user
          memoryUtils.user = user
          console.log(memoryUtils.user)
          // 跳转页面
          this.props.history.replace('/')
        }else{
          // 提示错误信息
          message.error(result.msg)
        }
			}
		})
		// 获取form对象
		// const form = this.props.form
		// // 获取表单项输入的值
		// const values = form.getFieldsValue()
		// console.log(values)
	}

	//  对密码自定义验证
	validatePwd = (rule, value, callback) => {
		if (!value) {
			callback('密码必须输入')
		} else if (value.length < 4 || value.length > 12) {
			callback('密码长度不能小于4位或大于12位')
		} else {
			callback()
		}
	}
	render() {
		// 得到具有强大功能的form对象
		const form = this.props.form
		// getFieldDecorator操作表单的数据
		const { getFieldDecorator } = form
		return (
			<div className="login">
				<header className="login-header">
					<img src={logo} alt="logo" />
					<h1>后台管理项目</h1>
				</header>
				<section className="login-content">
					<h2>用户登录</h2>
					<Form onSubmit={this.handleSubmit} className="login-form">
						<Form.Item>
							{getFieldDecorator('username', {
								rules: [
									{
										required: true,
										whitespace: true,
										message: '请输入用户名',
									},
									{
										min: 4,
										max: 12,
										message: '用户名大于4位或小于12位',
									},
									{
										pattern: /^[a-zA-Z0-9_]+$/,
										message:
											'用户名必须是英文、数字或下划线组成',
									},
								],
								initialValue: 'admin', // 初始值
							})(<Input placeholder="Username" />)}
						</Form.Item>

						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
						>
							{getFieldDecorator('password', {
								rules: [
									{
										validator: this.validatePwd,
									},
								],
								initialValue: 'admin', // 初始值
							})(<Input.Password placeholder="Password" />)}
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
								onClick={this.onSubmit}
							>
								登录
							</Button>
						</Form.Item>
					</Form>
				</section>
			</div>
		)
	}
}

/** 
    1：高阶函数
      1）一类特别的函数
        a:接受函数类型的参数
        b:返回值是函数
      2）常见
        a:定时器  setTimeout()/setInterval()
        b:Promise: promise(()=>{}) then(value=>{},reason=>{})
        c:数组遍历的方法forEach()  filter() map() reduce() find() findIndex()
        d:函数对象的bind()
        e:Form.create() / getFieldDecorator()()
      3)高阶函数更新动态，更加有拓展性

    
    2：高阶组件
      1）本质就是一个函数
      2）接收一个组件（被包装的组件），返回一个新的组件（包装组件），包装组件会向被组件传入特定属性
      3）作用，拓展组建的功能
      4）高阶组件也是一个高阶函数，接收一个组件函数，返回一个新的组件函数

    包装form组件生成一个新的组件
    新组件会像form组件传递一个强大的对象属性：form
*/
const WrapLogin = Form.create()(Login)
export default WrapLogin
