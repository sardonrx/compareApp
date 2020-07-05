import React from 'react';

import { Form, Input, Button, Checkbox, Typography, message } from 'antd';

const { Title } = Typography;

class Login extends React.Component<> {
	
	state={
		isLoading: false
	}
	
	componentDidMount() {
		const retrievedUserObject = localStorage.getItem('userObject');
		retrievedUserObject !== null && this.props.history.push('/index')
	}
	
	onFinish = values => {
		this.setState({
			isLoading: true
		})
		
		setTimeout(() => {
			this.setState({
				isLoading: false
			})
			this.onLoginInUser(values.email)
		}, 3000);
	};
	
	onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};
	
	onLoginInUser = (email) => {
		const user = {
			data: {
				email,
			},
			message: 'User logged in successfully',
			status: 200
		}
		
		if (user.status === 200 ) {
			message.success(`${user.message}`)
			localStorage.setItem('userObject', JSON.stringify(user.data));
			this.props.history.push('/index')
		} else {
			message.error('Invalid credentials')
		}
	}
	
	render() {
		const { isLoading } = this.state
		const layout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		};
		const tailLayout = {
			wrapperCol: { offset: 8, span: 16 },
		};
		
		return(
			<div
				style={{
					backgroundColor: '#011b33',
					width: window.innerWidth || document.body.clientWidth,
					height: window.innerHeight || document.body.clientHeight,
					display: 'flex',
					justifyContent: "center",
					alignItems: "center",
					overflow: 'hidden'
				}}
			>
				
				<div
					style={{
						backgroundColor: '#fff',
						display: 'flex',
						justifyContent: "center",
						alignItems: "center",
						borderRadius: 5,
						flexDirection: "column",
					}}
				>
					<Title
						level={4}
						style={{
							marginTop: 10
						}}
					>
						Task App
					</Title>
					<div
						style={{
							margin: 20
						}}
					>
						<Form
							{...layout}
							name="basic"
							initialValues={{ remember: true }}
							onFinish={this.onFinish}
							onFinishFailed={this.onFinishFailed}
						>
							<Form.Item
								name="email"
								label="E-mail"
								rules={[
									{
										type: 'email',
										message: 'The input is not valid E-mail!',
									},
									{
										required: true,
										message: 'Please input your E-mail!',
									},
								]}
							>
								<Input />
							</Form.Item>
							
							<Form.Item
								name="password"
								label="Password"
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}
								hasFeedback
							>
								<Input.Password />
							</Form.Item>
							
							<Form.Item {...tailLayout} name="remember" valuePropName="checked">
								<Checkbox>Remember me</Checkbox>
							</Form.Item>
							
							<Form.Item {...tailLayout}>
								<Button
									type="primary"
									htmlType="submit"
									loading={isLoading}
									style={{
										backgroundColor: '#011b33'
									}}
								>
									Submit
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			
			</div>
		)
	}
}


export default Login