import 'whatwg-fetch';
import React from 'react';
import { Link } from 'react-router';
import BaseComponent from '../BaseComponent';

require('./index.scss');

class TabPageHead extends BaseComponent {
    constructor(props){
        super(props);
        this._bind('handleClickNavTab');
    }
    handleClickNavTab(e){
        //TODO why getElementById is undefined
        var that         = e.currentTarget;
        var parentLiDOM  = that.parentNode;
        var parentUlDOM  = parentLiDOM.parentNode;
        var tabContent   = parentUlDOM.parentNode.nextElementSibling;
        var siblingsDOMs = [];
        var classList    = that.classList;
        if(!classList.contains('active')){
            var currentActiveTab = parentUlDOM.getElementsByClassName('tab-item active')[0];
            var id = currentActiveTab.dataset.id;
            currentActiveTab.classList.remove('active');

            tabContent.querySelector("#tab-"+id).classList.remove('active');

            parentLiDOM.classList.add('active');
            id = parentLiDOM.dataset.id;
            tabContent.querySelector("#tab-"+id).classList.add('active');


        }
        e.preventDefault();
        e.stopPropagation();
    }
    render(){
        var headList = this.props.headList;
        var lisDOM = headList.map((title, index)=>{
            if(index==0){
                return (<li key={index} className="tab-item active" data-id={index}><a href="javascript:void(0);" onClick={ this.handleClickNavTab }>{title}</a></li>);
            }else{
                return (<li key={index} className="tab-item" data-id={index}><a href="javascript:void(0);" onClick={ this.handleClickNavTab }>{title}</a></li>);
            }
        });
        return (
            <div className="tab tab-header">
                <ul className="tab nav-tabs">
                    { lisDOM }
                </ul>
            </div>
        )
    }
}

class TabPageContent extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        var active = this.props.index == 0 ? 'active': '';
        return (
            <div id={this.props.id} className={ ['tab-pane', active].join(" ")}>
                { this.props.children }
            </div>
        )
    }
}

export default class TabPage extends BaseComponent {
    //constructor function
    constructor(props){
        super(props);
        //init state
        this.state = {
            data:[]
        }
    }
    componentDidMount(){

    }
    render(){
        var TabContentDOMList = React.Children.map(this.props.children, (child, index)=>{
            return (
                <TabPageContent key={index} id={ ['tab', index].join('-')} index={index}>{ child }</TabPageContent>
            );
        });
        return (
            <div className="tab tab-page">
                <TabPageHead headList={ this.props.headList }></TabPageHead>
                <div className="tab-content">
                    { TabContentDOMList }
                </div>

            </div>
        )
    }
}
