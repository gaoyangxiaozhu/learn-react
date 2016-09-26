import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/AsTable/index';
import Column from './components/AsTable/Column';

const data = [
  {containerID: '01', type: '浓缩', progess: '30%'},
  {containerID: '02', type: '浓缩', progess: '35%'},
  {containerID: '03', type: '浓缩', progess: '40%'},
  {containerID: '04', type: '浓缩', progess: '80%'},
];
const keys = Object.keys(data[0]);
ReactDOM.render(
  <Table data={data}>
      {
          keys.map(entry => (
              <Column dataKey={entry} name={entry} key={`col-${entry}`}/>
          ))
      }
  </Table>,
  document.getElementById('table')
);
