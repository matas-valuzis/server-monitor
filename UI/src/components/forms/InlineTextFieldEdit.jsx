import React, {Component} from 'react';

export default class InlineTextFieldEdit extends Component {
    constructor(props){
        super(props);
        this.state = {form: false};
    }

    toggleForm = (e) => {
        e.preventDefault();
        this.setState({form: !this.state.form});
    };

    changeValue = (e) => {
        e.preventDefault();
        this.props.onValueChange(this.input.value);
        this.toggleForm(e);
    };

    render() {
        const input = this.state.form ?
            (<form className="inline" onSubmit={this.changeValue}>
                <input
                    defaultValue={this.props.value}
                    type="text"
                    ref={(input) => this.input = input}
                />
            </form>)
            : null;

        return (
            <div className="item-edit-inline" onDoubleClick={this.toggleForm}>
                <span><b>{this.props.label}: </b></span>
                <span>{input || this.props.value}</span>
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
