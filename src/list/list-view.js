import React from 'react';
import './list-view.css';
import { getData } from '../login/loginService';

class Table extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      servers: [],
      nameOrderAsc: false,
      distanceOrderAsc: false
    }

    this.getKeys = this.getKeys.bind(this);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.setSortedByName = this.setSortedByName.bind(this);
    this.setSortedByDistance = this.setSortedByDistance.bind(this);
  }

  async componentDidMount() {
    const token = this.props.token;
    const data = await getData(token);
    this.setState({ servers: data });
  }

  getKeys() {
    const keys = Object.keys(this.state.servers[0]);
    return keys;
  }
  
  getHeader() {
    const keys = this.getKeys();
    return keys.map((key, index) => {
      return <th key={key+index}>{key.toUpperCase()}</th>;
    });
  }

  getRowsData() {
    const data = this.state.servers;
    return data.map((item, index) => {
      return (
        <tr key={index+item}>
            <td>{item.name}</td>
            <td>{item.distance}</td>
        </tr>
      );
    })
  }

  setSortedByName() {
    const dataCopy = [...this.state.servers];
    dataCopy.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (!this.state.nameOrderAsc) {
        this.setState(
          {nameOrderAsc: true}
        );
        if (nameA < nameB) {
          return -1; // ascending order
        }
        if (nameA > nameB) { // descending order
          return 1;
        }
        return 0; //equal
      } else {
        this.setState(
          {nameOrderAsc: false}
        );
        if (nameA < nameB) {
          return 1; // descending order
        }
        if (nameA > nameB) { // asscending order
          return -1;
        }
        return 0; //equal
      }
    });
    this.setState(
      {servers: dataCopy}
    );
  }

  setSortedByDistance() {
   // console.log(this.state.distanceOrderAsc);
    const dataCopy = [...this.state.servers];
    dataCopy.sort((a, b) => {
      if (!this.state.distanceOrderAsc) {
        this.setState(
          {distanceOrderAsc: true}
        );
        return a.distance - b.distance;
      } else {
        this.setState(
          {distanceOrderAsc: false}
        );
        return b.distance - a.distance;
      }
    });
    this.setState(
      {servers: dataCopy}
    );
  }

  render() {
    if (!this.state.servers.length) {
      return (
      <div>Loading...</div>
      );
    } else {
      return (
          <div>
          <h3>A List of Servers</h3>
            <table className='servers-list' border='1'>
            <caption className='caption'>Sort by: <span className='clickable-text' onClick={this.setSortedByName}>name</span> | <span className='clickable-text' onClick={this.setSortedByDistance}>distance</span></caption>
              <thead>
                <tr>
                  {this.getHeader()}
                </tr>
              </thead>
              <tbody>
                {this.getRowsData()}
              </tbody>
            </table>
          </div>
      );
    }
  }
};

export default Table;
