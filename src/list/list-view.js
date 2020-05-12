import React from 'react';
import './list-view.css';
import { getData } from '../login/loginService';


const getKeys = (props) => {
	const keys = Object.keys(props);
	return keys;
};

const Header = (props) => {
	const keys = getKeys(props.data);
	return keys.map((key) => {
		if (key === 'name') {
			return <th key={key} onClick={props.clickedName}>{key.toUpperCase()}</th>;
		}
		if (key === 'distance') {
			return <th key={key} onClick={props.clickedDistance}>{key.toUpperCase()}</th>;
		}
		return <th key={key}> {key.toUpperCase()}</th>
	});
};

const getRowsData = (props) => {
	const data = props;
	return data.map((item) => {
		const col = getKeys(item);
		return (
			<tr key={item.name + item.distance}>{col.map((val) => {	
				return <td key = {val}>{item[val]}</td>
				})
			}
			</tr>
		);
	})
}

export class Table extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			servers: [],
			nameSortAsc: false,
			distanceSortAsc: false
		}

		this.setSortingByName = this.setSortingByName.bind(this);
		this.setSortingByDistance = this.setSortingByDistance.bind(this);
	}

	async componentDidMount() {
		const token = this.props.token;
		const data = await getData(token);
		this.setState({
			servers: data
		});
	}

	setSortingByName() {
		const dataCopy = [...this.state.servers];
		const sortAsc = this.state.nameSortAsc;
		dataCopy.sort((a, b) => {
			const nameA = a.name.toUpperCase();
			const nameB = b.name.toUpperCase();
			if (!sortAsc) {
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			} else {
				if (nameA < nameB) {
					return 1;
				}
				if (nameA > nameB) {
					return -1;
				}
				return 0;
			}
		});
		this.setState({
			servers: dataCopy,
			nameSortAsc: !sortAsc
		});
	}

	setSortingByDistance() {
		const dataCopy = [...this.state.servers];
		const sortAsc = this.state.distanceSortAsc;
		dataCopy.sort((a, b) => {
			if (!sortAsc) {
				return a.distance - b.distance;
			} else {
				return b.distance - a.distance;
			}
		});
		this.setState({
			servers: dataCopy,
			distanceSortAsc: !sortAsc
		});
	}

	render() {
		if (!this.state.servers.length) {
			return <div>Loading...</div>
		} else {
			return ( 
				<div>
					<h3>A List of Servers</h3> 
					<table className='servers-table' border='1'>
						<caption className='caption'>Click on collumn header to sort data</caption> 
							<thead>
								<tr>
									<Header 
										data={this.state.servers[0]}
										clickedName={this.setSortingByName}
										clickedDistance={this.setSortingByDistance}/> 
								</tr>
							</thead> 
							<tbody>
								{getRowsData(this.state.servers)}
							</tbody> 
					</table>
				</div>
			);
		}
	}
};