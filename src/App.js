import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './components/Header';
import Main from './containers/Main';
import Footer from './components/Footer';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./actions/user";
import { withRouter } from "react-router-dom";
import NotificationList from "./components/NotificationList";
import { resetBadgeCount } from "./actions/notification";
import { API_ROOT } from "./config/Api";
import Chip from "@material-ui/core/Chip";

const theme = createMuiTheme({
    palette: {
        type: 'light'
    },
    overrides: {
        MuiButton: {
            root: {
                backgroundColor: '#67B6F4',
                borderRadius: 30,
                height: 30,
                color: 'black',
                '&:hover': {
                    backgroundColor: '#67B6F4',
                    color: 'white'
                }
            },
        },
    },
});

class App extends Component {

    constructor(props) {
        super(props);

        let env = 'local';
        if (process.env.NODE_ENV === 'staging') env = 'dev';
        if (process.env.NODE_ENV === 'production') env = 'test';

        this.state = {
            backendUrl: `${API_ROOT}/cash36`,
            message: 'I love snacks',
            messageColor: 'white',
            snackOpen: false,
            actionEnabled: false,
            autoHideDuration: null,
            drawerOpen: false,
            env: env,
        };
    }

    openDrawer = () => {
        this.setState({ drawerOpen: true });
    };

    closeDrawer = () => {
        this.setState({ drawerOpen: false });
        this.props.resetBadgeCount();
        localStorage.setItem('lastRead', new Date());
    };

    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Header location={this.props.location} openDrawer={this.openDrawer.bind(this)}/>
                    <Chip label={this.state.env} style={{ position: 'absolute',
                            right: 0,
                            top: 80,
                            zIndex: 5000,
                            borderRadius: 2,
                            backgroundColor: 'green',
                            opacity: 0.9,
                            color: '#CCCCCC',
                            textTransform: 'uppercase',
                            fontSize: '80%',
                        }} />
                    <Main/>
                    <NotificationList drawerOpen={this.state.drawerOpen} notifications={this.props.notifications} closeDrawer={this.closeDrawer.bind(this)}/>
                    <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
    loggedInAddress: state.user.loggedInAddress,
    notifications: state.notification.notifications,
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
        resetBadgeCount: bindActionCreators(resetBadgeCount, dispatch),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
