import React from 'react';
import { connect } from 'react-redux';
import MainPage from '../components/layout/MainPage.jsx';
import ReducedAction, { extractValue } from 'reduced-actions-redux';

const mapStateToProps = (state) => {
    return {
        menu: state.menu.display
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMenu: () => {
            dispatch(new ReducedAction('TOGGLE_MENU_ACTION','menu.display', d => !d));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
