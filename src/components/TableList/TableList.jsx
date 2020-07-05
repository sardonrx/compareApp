import React from 'react';

import { Table } from 'antd';

const { Column, ColumnGroup } = Table;

class TableList extends React.Component<> {
	
	state={
		isLoading: false,
		studentMode: '',
		selectedMenu: 'history',
	}
	
	render() {
		
		const tableData = localStorage.getItem('retrievedComparedTable')
		
		return(
			<div
				style={{
					width: '100%',
					height: '70%',
					marginTop: 30
				}}
			>
				<Table dataSource={JSON.parse(tableData)}>
					<ColumnGroup title="Fist Student">
						<Column title="First Name" dataIndex="firstStudentName" key="firstStudentName" />
						<Column title="File" dataIndex="firstStudentFile" key="firstStudentFile" />
					</ColumnGroup>
					
					<ColumnGroup title="Second Student">
						<Column title="First Name" dataIndex="secondStudentName" key="secondStudentName" />
						<Column title="File" dataIndex="secondStudentFile" key="secondStudentFile" />
					</ColumnGroup>
					
					<Column title="Percentage (%)" dataIndex="score" key="score" />
				</Table>
			</div>
		)
	}
}


export default TableList