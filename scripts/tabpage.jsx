import React from 'react';
import ReactDOM from 'react-dom';
import AsTabPage from './components/AsTabPage/index';

//测试
var tabHeadList = ['视频浓缩', '视频转码', '越界检测'];

ReactDOM.render(
    <AsTabPage headList={ tabHeadList }>
        <div>tab1 for 视频浓缩</div>
        <div>tab2 for 视频转码</div>
        <div>tab3 for 越界检测</div>
    </AsTabPage>,
    document.getElementById('tab')
)
