import React from "react";
import "./ListView.css";
import { getData } from "../login/loginService";

const getKeys = (props) => {
  const keys = Object.keys(props);
  return keys;
};

const Header = (props) => {
  const keys = getKeys(props.data);
  return keys.map((key) => {
    return (
      <th key={key} onClick={() => props.onSort(key)}>
        {key.toUpperCase()}
        {/* {props[`${key}SortAsc`] ? (<span>⏷</span>) : (<span className='rotate'>⏷</span>)} */}
      </th>
    );
  });
};

const getRowsData = (props) => {
  const data = props;
  return data.map((item) => {
    const col = getKeys(item);
    return (
      <tr key={item.name + item.distance}>
        {col.map((val) => {
          return <td key={val}>{item[val]}</td>;
        })}
      </tr>
    );
  });
};

export class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      servers: [],
      nameSortAsc: false,
      distanceSortAsc: false,
    };
  }

  async componentDidMount() {
    const token = this.props.token;
    const data = await getData(token);
    this.setState({
      servers: data,
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
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h3>A List of Servers</h3>
          <table className="servers-table" border="1">
            <caption className="caption">
              Click on collumn header to sort data
            </caption>
            <thead>
              <tr>
                <Header
                  data={this.state.servers[0]}
                  onSort={(key) => this.sortServers(key)}
                />
              </tr>
            </thead>
            <tbody>{getRowsData(this.state.servers)}</tbody>
          </table>
        </div>
      );
    }
  }
}
