import React from 'react';

class Table extends React.Component {
    constructor(props){
        super(props);
        this.getKeys = this.getKeys.bind(this);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
    }

    getKeys() {
        const keys = Object.keys(this.props.servers[0]);
        return keys;
      }
    
    getHeader() {
        const keys = this.getKeys();
        return keys.map((key, index) => {
          return <th key={key+index}>{key.toUpperCase()}</th>;
        })
      }

    getRowsData() {
        const data = this.props.servers;
        return data.map((item, index) => {
            return (
                <tr key={index+item}>
                    <td>{item.name}</td>
                    <td>{item.distance}</td>
                </tr>
            )
        })
      }

    render() {
        return (
          <div>
          <h3>A List of Servers</h3>
            <table className='servers-list' border='1'>
            <caption>Sort by: <span className='clickable-text' onClick={this.props.setSortedByName}>name</span> | <span className='clickable-text' onClick={this.props.setSortedByDistance}>distance</span></caption>
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
        )
      }
};

export default Table;
