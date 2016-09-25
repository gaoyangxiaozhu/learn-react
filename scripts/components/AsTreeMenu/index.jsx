import 'whatwg-fetch';
import React from 'react';
import { Link } from 'react-router';
import BaseComponent from '../BaseComponent';

require('./flex.scss');
require('./index.scss');


class TreeFolderItem extends React.Component {
    constructor() {
        super();
    }

    render(){
        return (
                <div className="tree-item">
                    <div className="tree-item-name">
                        <i className="fa fa-video-camera"></i>
                        <span> { this.props.month } </span>
                    </div>
                </div>
        )
    }
}
class TreeFolder extends BaseComponent {
    constructor(props){
        super(props);
        this.state = {
            months: []
        }
        this._bind('handleClickFolderHeader');

    }
    handleClickFolderHeader(e){

        const iconPlusClass = "fa-plus-square-o";
        const iconMinusClass = "fa-minus-sqare-o";

        var that = e.currentTarget;

        var parentDOM = that.parentNode;
        var loaderDOM = parentDOM.getElementsByClassName("tree-loader")[0];
        var iElement = that.getElementsByTagName("i")[0];
        var iClassList = iElement.classList;

        var year = this.props.name;

        var treeFolderContentDOM = parentDOM.getElementsByClassName("tree-folder-content")[0]; //default block is none
        var displayAttr = treeFolderContentDOM.style.display;

        if(!displayAttr || displayAttr === 'none'){
            loaderDOM.style.display = "block";
            var url = '/api/years/';
            fetch(url)
            .then(res=>res.json())
            .then((body)=>{
                this.setState({ months: body });
                loaderDOM.style.display = "none";
                treeFolderContentDOM.style.display = "block";

            }).catch(ex=>{
                loaderDOM.style.display = "none";
                console.log('parsing failed.', ex);
            });
        }else{
            treeFolderContentDOM.style.display = "none";
            iClassList.add(iconPlusClass);
            iClassList.remove(iconMinusClass);
        }
    }
    render() {

        var TreeFolderItemsNodes = this.state.months.map((item)=>{
            return (
                <TreeFolderItem key={ item.id } month={ item.month } ></TreeFolderItem>
            )
        });
        return (
            <div className="tree-folder">
                <div className="tree-folder-header" onClick={ this.handleClickFolderHeader }>
                    <i className="fa fa-plus-square-o"></i>
                     <div className="tree-folder-name" > { this.props.name }年</div>
                </div>
                <div className="tree-folder-content">
                    { TreeFolderItemsNodes }
                </div>
                <div className="tree-loader">
                    <div className="tree-loading">
                        <i className="fa fa-refresh fa-spin"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default class TreeMenu extends BaseComponent {
    //constructor function
    constructor(props){
        super(props);
        //init state
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        var url = this.props.url;
        fetch(url)
        .then(res=>res.json()) //json format
        .then((body)=>{
            this.setState({data : body});
        });
    }

    render(){
        var treeFolderNodes = this.state.data.map((item)=>{
            return (
                <TreeFolder key={ item.id } name={ item.year } ></TreeFolder>
            )
        });
        return (
            <div className="tree">
                { treeFolderNodes }
            </div>
        )
    }
}
