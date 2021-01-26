import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'
// 应用 的根组件

export default class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch> {/* 只匹配其中一个页面 */}
					<Route path="/login" component={Login}></Route>
					<Route path="/" component={Admin}></Route>
				</Switch>
			</BrowserRouter>
		)
	}
}
