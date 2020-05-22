import React from "react";
import "./ListView.css";
import { getServers } from "../login/tesonetAPI";
import { TokenContext } from '../context/TokenContext';

const getKeys = (props) => {
  const keys = Object.keys(props);
  return keys;
};

const getRowsData = (props) => {
  const data = props;
  return data.map((item) => {
    const col = getKeys(item);
    return (
      <tr key={item.name + item.distance}>
        {col.map((val) => {
          return <td key={val}>{item[val]}</td>;
        })
        }
      </tr>
    );
  });
};

export class Table extends React.Component {
  state = {
    servers: [],
    nameSortAsc: false,
    distanceSortAsc: false,
    errMessage: null,
  };

  static contextType = TokenContext;

  async componentDidMount() {
    let token = this.context.token;
    try {
      const data = await getServers(token);
      this.setState({
        servers: data,
      });
    } catch (error) {
      this.setState({
        errMessage: error.message,
      });
    }
  }
  
  header = () => {
    const keys = getKeys(this.state.servers[0]);
    let classes = null;
    return keys.map((key) => {
      if (this.state[`${key}SortAsc`]) {
        classes = "rotate";
      };
      return (
        <th key={key} onClick={() => this.sortServers(key)}>
          {key.toUpperCase()}
          <span className={classes}>⏷</span>
        </th>
      );
    });
  }

  sortServers(key) {
    const sortFunction = {
      name: (a, b) => a.name.localeCompare(b.name),
      distance: (a, b) => a.distance - b.distance,
    };
    const dataCopy = [...this.state.servers];
    const sortAsc = this.state[`${key}SortAsc`];
    dataCopy.sort(sortFunction[key]);
    if (sortAsc) {
      dataCopy.reverse();
    }
    this.setState({
      servers: dataCopy,
      [`${key}SortAsc`]: !sortAsc,
    });
  }

  render() {
    if (!this.state.servers.length) {
      return (
        <>
          {!this.state.errMessage && (
            <div className="loading-message">Loading...</div>
          )}
          {this.state.errMessage && (
            <div className="list-error-message">{this.state.errMessage}</div>
          )}
        </>
      );
    } else {
      return (
        <div>
          <h3>A List of Servers</h3>
          <table className="servers-table" border="1">
            <caption className="caption">
              Click on the collumn header to sort data
            </caption>
            <thead>
              <tr>{this.header()}</tr>
            </thead>
            <tbody>{getRowsData(this.state.servers)}</tbody>
          </table>
        </div>
      );
    }
  }
};