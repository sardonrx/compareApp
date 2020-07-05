import React from 'react';

import { message, notification, Space, Spin, Form, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

class Compare extends React.Component<> {
	
	state={
		isLoading: false,
		studentMode: ''
	}
	
	onFinish = values => {
		
		this.setState({
			isLoading: true
		})
		
		setTimeout(() => {
			this.setState({
				isLoading: false
			})
			this.saveComparedData(values)
		}, 3000);
	};
	
	saveComparedData = (values) => {
		const comparedList = {
			data: {
				firstStudentName: values.firstStudentName.firstName,
				firstStudentFile: JSON.parse(localStorage.getItem('firstStudentFile')),
				secondStudentName: values.secondStudentName.firstName,
				secondStudentFile: JSON.parse(localStorage.getItem('secondStudentFile')),
				score: Math.ceil(Math.random() * 100)
			},
			message: 'Success',
			status: 200
		}
		if (comparedList.status === 200 ) {
			this.openNotification(comparedList.data.score)
			const retrievedComparedTable = localStorage.getItem('retrievedComparedTable');

			retrievedComparedTable === null
				? localStorage.setItem('retrievedComparedTable', JSON.stringify([comparedList.data]))
				: localStorage.setItem('retrievedComparedTable', JSON.stringify([...JSON.parse(retrievedComparedTable), comparedList.data]))
		} else {
			message.error('Invalid credentials')
		}
	}
	
	openNotification = (score) => {
		const args = {
			message: `Compare percentage is ${score}%`,
			description: 'Please note if compare percentage is greater than 50% percent then the both student copied each other.',
			duration: 0,
		};
		notification.open(args);
	};
	
	render() {
		const { isLoading, studentMode } = this.state
		
		const props = {
			name: 'file',
			action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
			headers: {
				authorization: 'authorization-text',
			},
			onChange(info) {
				if (info.file.status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if (info.file.status === 'done') {
					message.success(`${info.file.name} file uploaded successfully`);
					
					return studentMode === "first"
						? localStorage.setItem('firstStudentFile', JSON.stringify(info.file.name))
						: localStorage.setItem('secondStudentFile', JSON.stringify(info.file.name))
					
				} else if (info.file.status === 'error') {
					message.error(`${info.file.name} file upload failed.`);
				}
			},
		};
		
		const validateMessages = {
			required: '${label} is required!',
			types: {
				email: '${label} is not validate email!',
				number: '${label} is not a validate number!',
			},
			number: {
				range: '${label} must be between ${min} and ${max}',
			},
		};
		
		return(
			<div
				style={{
					width: '100%',
					height: '70%',
				}}
			>
				{
					isLoading
						?
						<div
							style={{
								marginTop: 20
							}}
						>
							<Space size="middle">
								<Spin size="small" />
								<Spin />
								<Spin size="large" />
							</Space>
						</div>
						:
						<div
							className="site-layout-content"
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								height: '100%',
								width: '100%',
							}}
						>
							<Form name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
								<Form.Item name={['firstStudentName', 'firstName']} rules={[{ required: true, message: 'First name is required' }]}>
									<Input placeholder={'First Student Name'}/>
								</Form.Item>
								
								<Upload {...props}>
									<Button
										onClick={() => this.setState({ studentMode: 'first' })}
									>
										<UploadOutlined /> Upload
									</Button>
								</Upload>
								
								<Form.Item
									style={{ marginTop: 20 }}
									name={['secondStudentName', 'firstName']} rules={[{ required: true }]}>
									<Input placeholder={'Second Student Name'}/>
								</Form.Item>
								
								<Upload {...props}>
									<Button
										onClick={() => this.setState({ studentMode: 'second' })}
									>
										<UploadOutlined /> Upload
									</Button>
								</Upload>
								
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										loading={isLoading}
										style={{
											marginLeft: 100,
											marginTop: 30,
											backgroundColor: '#011b33',
											alignSelf: "flex-end"
										}}
									>
										Compare
									</Button>
								</Form.Item>
							</Form>
						</div>
				}
			</div>
		)
	}
}


export default Compare