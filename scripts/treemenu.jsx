import React from 'react';
import ReactDOM from 'react-dom';
import AsTreeMenu from './components/AsTreeMenu/index';

ReactDOM.render(
  <AsTreeMenu url="/api/listCamera"/>,
  document.getElementById('treeMenu')
);
