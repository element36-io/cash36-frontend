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

        const url = (process.env.NODE_ENV === 'development')
            ? 'http://localhost:8080/cash36'
            : 'https://cash36-backend.herokuapp.com/cash36';

        this.state = {
            backendUrl: url,
            message: 'I love snacks',
            messageColor: 'white',
            snackOpen: false,
            actionEnabled: false,
            autoHideDuration: null,
            drawerOpen: false,
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
