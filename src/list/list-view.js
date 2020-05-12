import React from 'react';
import './list-view.css';
import { getData } from '../login/loginService';
//import { ReactComponent as Triangle } from '../images/triangleup.svg';

const getKeys = (props) => {
    const keys = Object.keys(props);
    return keys;
};

const GetHeader = (props) => {
  const keys = getKeys(props.data);
  return keys.map((key) => {
    if (key === 'name') {
      return <th key={key} onClick={props.clickedName}>{key.toUpperCase()}</th>;
    }
    if (key === 'distance') {
      return <th key={key} onClick={props.clickedDistance}>{key.toUpperCase()}</th>;
    }
    return <th key={key}>{key.toUpperCase()}</th>
  });
};

const getRowsData = (props) => {
  const data = props;
  return data.map((item) => {
    const col = getKeys(item);
  //  console.log(item); // {name: "Latvia #60", distance: 952}
      return (
        <tr key={item.name}>
          {col.map((val) => {
        //    console.log(val); // name, distance
        //    console.log(item[col[index]]); // kaip iššifruoti? Kodėl jis === (item[val])
        //    console.log(item[val]); // Latvia #60, 952
          
            return <td key={val}>{item[val]}</td>
          })}
        </tr>
      );
    })
  }

class Table extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      servers: [],
      nameOrderAsc: false,
      distanceOrderAsc: false
    }

 //   this.getKeys = this.getKeys.bind(this);
 //   this.getHeader = this.getHeader.bind(this);
  //  this.getRowsData = this.getRowsData.bind(this);
    this.setSortingByName = this.setSortingByName.bind(this);
    this.setSortingByDistance = this.setSortingByDistance.bind(this);
  }

  async componentDidMount() {
    const token = this.props.token;
    const data = await getData(token);
    this.setState({ servers: data });
  }

  // getKeys() {
  //   const keys = Object.keys(this.state.servers[0]);
  //   return keys;
  // }
  
  // getHeader() {
  //   const keys = getKeys(this.state.servers[0]);
  //   return keys.map((key, index) => {
  //     return <th key={key+index}>{key.toUpperCase()}</th>;
  //   });
  // }

  // getRowsData() {
  //   const data = this.state.servers;
  //   return data.map((item, index) => {
  //     const col = Object.keys(item)
  //       return (
  //         <tr key={index+item}>
  //           {col.map((val, index) => {
  //             return <td key={index+item}>{item[col[index]]}</td>
  //           })}
  //         </tr>
  //       );
  //   })
  // }

  setSortingByName() {
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

  setSortingByDistance() {
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
            <table className='servers-table' border='1'>
            <caption className='caption'>Click on collumn header to sort data</caption>
              <thead>
                <tr>
                  <GetHeader 
                    data={this.state.servers[0]} 
                    clickedName={this.setSortingByName} 
                    clickedDistance={this.setSortingByDistance} />
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

export default Table;
