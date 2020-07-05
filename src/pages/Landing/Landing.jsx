import React from 'react';

import { Layout, Menu } from 'antd';

import Compare from "../../components/Compare/Compare";
import TableList from "../../components/TableList/TableList";

const { Header, Content, Footer } = Layout;

class Landing extends React.Component {
	
	state={
		isLoading: false,
		studentMode: '',
		selectedMenu: 'compare',
	}
	
	onLogoutClicked = () =>{
		localStorage.removeItem('userObject')
		this.props.history.push('/')
	}
	
	render() {
		const { selectedMenu } = this.state
		
		return(
			<Layout
				className="layout"
				style={{
					width: window.innerWidth || document.body.clientWidth,
					height: window.innerHeight || document.body.clientHeight,
				}}
			>
				<Header>
					<div className="logo" />
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
						<Menu.Item disabled key="0">Welcome {JSON.parse(localStorage.getItem('userObject')).email}</Menu.Item>
						<Menu.Item onClick={() => this.setState({ selectedMenu: 'compare' })} key="1">Compare</Menu.Item>
						<Menu.Item onClick={() => this.setState({ selectedMenu: 'history' })} key="2">History</Menu.Item>
						<Menu.Item onClick={() => this.onLogoutClicked()} key="3">Log Out</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					{ selectedMenu === 'compare' && <Compare /> }
					{ selectedMenu === 'history' && <TableList /> }
					
					
				</Content>
				<Footer style={{ textAlign: 'center' }}>Task App ©2020 Created by Susan Adesoji</Footer>
			</Layout>
		)
	}
}


export default Landing