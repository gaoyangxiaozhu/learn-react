
import { Link } from 'react-router';
import BaseComponent from '../BaseComponent';


import React, { PropTypes, Component } from 'react';
import Column from './Column';
import './index.scss';

const getStyle = ({ width, align }) => {
  const style = {};

  if (width) {
    style.width = width;
  }
  if (align) {
    style.textAlign = align;
  }

  return style;
};

const renderTds = (data, entry, columns, rowIndex) => (
  columns.map((col, index) => {
    const { dataKey, className } = col.props;
    const value = entry[dataKey];
    return (
      <td
        key={`td-${index}`}
        style={getStyle(col.props)}
        className={`react-smart-table-td col-${index} col-${dataKey} ${className || ''}`}
      >
        {value}
      </td>
    );
  })
);

const renderRows = (data, columns) => {
  if (!data || !data.length) {return null;}

  return data.map((entry, index) => (
    (
      <tr key={`tr-${index}`} className="table-tr">
        {
            renderTds(data, entry, columns, index)
        }
      </tr>
    )
  ));
};

function Table(props) {
  const { children, data, className } = props;
  const columns = children;

  return (
    <div className={`table-container ${className || ''}`}>
      <table className="table">
          <thead className="table-thead">
            <tr className="table-tr">
                {
                    columns.map((col, index) => {
                      const { name, dataKey, className } = col.props;
                      return (
                        <th
                          key={`th-${index}`}
                          style={getStyle(col.props)}
                          className={`table-th col-${index} col-${dataKey} ${className || ''}`}
                        >
                          {name}
                        </th>
                      );
                    })
                }

            </tr>
          </thead>
        <tbody className="tbody">
          {renderRows(data, columns)}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
