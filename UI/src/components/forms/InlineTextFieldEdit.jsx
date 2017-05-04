import React, {Component} from 'react';

export default class InlineTextFieldEdit extends Component {
    onLinkClick = (e) => {
        e.preventDefault();

    };
    render() {
        return (
            <div className="item-edit-inline">
                <span>{this.props.label}: </span>
                <span>{this.props.value}</span>
            </div>
        );
    }
}

InlineTextFieldEdit.propTypes = {
    label: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string,
    isChanging: React.PropTypes.func,
    onValueChange: React.PropTypes.func
};
