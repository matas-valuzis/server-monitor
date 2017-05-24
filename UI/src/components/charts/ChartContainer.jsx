import React, { Component } from 'react';

export default class ChartContainer extends Component {



    render(){
        let tabs = this.props.tabs.map((t, i) => {
            let active = this.props.current.id == t.id ? 'active' : '';
            return (
                <li className="nav-item" key={i}>
                    <a
                        className={"nav-link chart-container-tab " + active}
                        onClick={(e) => {
                            e.preventDefault();
                            this.props.onTabClick(t);
                        }}
                    >{t.name}</a>
                </li>
            )
        });
        return (
            <div className="container chart-container">
                <h5>{this.props.header}</h5>
                <ul  className="nav nav-tabs">
                    {tabs}
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active">
                        {this.props.current.content}
                    </div>
                </div>
            </div>
        )
    }
}
