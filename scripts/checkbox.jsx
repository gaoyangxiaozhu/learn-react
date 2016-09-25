import React from 'react';
import ReactDOM from 'react-dom';
import AsCheckbox from './components/AsCheckbox/checkbox';
import AsRadio from './components/AsCheckbox/radio';

ReactDOM.render(
  <div>
    <div>
      <AsCheckbox checked>Checkbox</AsCheckbox>
      <AsCheckbox>Checkbox</AsCheckbox>
    </div>
    <div>
      <AsRadio checked name="radio">RadioBox</AsRadio>
      <AsRadio name="radio">RadioBox</AsRadio>
    </div>
</div>,
  document.getElementById('checkbox')
);
