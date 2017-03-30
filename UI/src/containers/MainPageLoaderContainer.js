import React from 'react';
import { connect } from 'react-redux';
import MainPageLoader from '../components/loaders/MainPageLoader.jsx'
import {createUnresolvedAction as UA} from '../services/UnresolvedAction';


const mapStateToProps = (state) => {
    return {
      message: state.loader.message,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDidMount: () => dispatch(
      UA('FETCH_INITIAL_DATA')
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageLoader);
