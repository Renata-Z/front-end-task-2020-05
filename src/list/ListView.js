import React, { useState, useContext, useEffect } from "react";
import "./ListView.css";
import { getServers } from "../login/tesonetAPI";
import { TokenContext } from "../context/TokenContext";

const getKeys = (arr) => {
  const keys = Object.keys(arr);
  return keys;
};

const getRowsData = (arr) => {
  return arr.map((item) => {
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

export const Table = () => {
  const [servers, setServers] = useState([]);
  const [nameSortAsc, setNameSortAsc] = useState(false);
  const [distanceSortAsc, setDistanceSortAsc] = useState(false);
  const [errMessage, setErrMessage] = useState(null);

  const tokenContext = useContext(TokenContext);

  useEffect(() => {
    let token = tokenContext.token;
    const fetchData = async (token) => {
      try {
        const data = await getServers(token);
        setServers(data);
      } catch (error) {
        setErrMessage(error.message);
      }
    };
    fetchData(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const header = () => {
    const headers = getKeys(servers[0]);
    let classes;

    return headers.map((el) => {
      if (el === "name") {
        nameSortAsc ? (classes = "rotate") : (classes = null);
      }
      if (el === "distance") {
        distanceSortAsc ? (classes = "rotate") : (classes = null);
      }
      return (
        <th key={el} onClick={() => sortServers(el)}>
          {el.toUpperCase()}
          <span className={classes}>⏷</span>
        </th>
      );
    });
  };

  const sortServers = (key) => {
    const sortFunction = {
      name: (a, b) => a.name.localeCompare(b.name),
      distance: (a, b) => a.distance - b.distance,
    };
    const dataCopy = [...servers];
    dataCopy.sort(sortFunction[key]);
    if (key === "name") {
      if (nameSortAsc) {
        dataCopy.reverse();
      }
    }
    if (key === "distance") {
      if (distanceSortAsc) {
        dataCopy.reverse();
      }
    }
    setServers(() => dataCopy);
    key === "name"
      ? setNameSortAsc(() => !nameSortAsc)
      : setDistanceSortAsc(() => !distanceSortAsc);
  };

  if (!servers.length) {
    return (
      <>
        {!errMessage && <div className="loading-message">Loading...</div>}
        {errMessage && <div className="list-error-message">{errMessage}</div>}
      </>
    );
  } else {
    return (
      <div className="servers-container">
        <h3>A List of Servers</h3>
        <table className="servers-table" border="1">
          <caption className="caption">
            Click on the collumn header to sort data
          </caption>
          <thead>
            <tr>{header()}</tr>
          </thead>
          <tbody>{getRowsData(servers)}</tbody>
        </table>
      </div>
    );
  }
};
