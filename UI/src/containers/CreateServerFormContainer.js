import React from 'react';
import { connect } from 'react-redux';
import CreateServerForm from '../domainComponents/forms/CreateServerForm.jsx'
import {createUnresolvedAction as UA} from '../services/UnresolvedAction';
const mapStateToProps = (state) => {
    return {
        keys: state.servers.key_files,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (data) => {
            dispatch(UA('ADD_SERVER', data));
        },
        onFormLoad: () => {
            dispatch(UA('FETCH_KEYS'));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateServerForm);
