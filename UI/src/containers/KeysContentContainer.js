import React from 'react';
import { connect } from 'react-redux';
import KeyContent from '../domainComponents/mainContent/KeyContent.jsx'
import {createUnresolvedAction as UA} from '../services/UnresolvedAction';
import ReducedAction, { extractValue } from 'reduced-actions-redux';

const mapStateToProps = (state) => {
    return {
        keys: state.servers.key_files,
        upload_error: state.servers.new_key_file.error,
        uploaded: state.servers.new_key_file.uploaded
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (key) => {
            dispatch(UA('DELETE_KEY', key));
        },
        onUpload(file){
            dispatch(UA('UPLOAD_KEY', file));
        },
        onReject(file){
            dispatch(new ReducedAction('REJECT_NEW_KEY_ACTION','servers.new_key_file', {uploaded: false, error: 'Max file size is 5KB'}));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KeyContent);
