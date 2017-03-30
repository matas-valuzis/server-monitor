import React, { Component } from 'react';

export default class MainPageLoader extends Component {
    componentDidMount(){
        if(this.props.onDidMount){
            this.props.onDidMount();
        }
    }

    render() {
        const message = this.props.message || 'Loading...';
        return (
            <div className="main-loader">
                {message}
            </div>
        );
    }
}

