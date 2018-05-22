import React, { Component } from 'react';
import * as _ from 'lodash';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './components/Header';
import Main from './containers/Main';
import Footer from './components/Footer';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import NotificationList from "./components/NotificationList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./actions/user";
import { withRouter } from "react-router-dom";

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

function TransitionUp(props) {
    return <Slide {...props} direction="up"/>;
}

class App extends Component {

    constructor(props) {
        super(props);

        const url = (process.env.NODE_ENV === 'development')
            ? 'http://localhost:8080/cash36'
            : 'https://cash36-backend.herokuapp.com/cash36';

        this.state = {
            backendUrl: url,
            notifications: [],
            notificationsBadge: 0,
            message: 'I love snacks',
            messageColor: 'white',
            snackOpen: false,
            actionEnabled: false,
            autoHideDuration: null,
            drawerOpen: false,
        }

        this.stompClient = null;
    }

    componentDidMount() {
        fetch(`${this.state.backendUrl}/notifications/${this.props.loggedInAddress}`)
            .then((response) => {
                return response.json();
            }).then((data) => {
            this.setState({ notifications: data });
        });

        let socket = new SockJS(`${this.state.backendUrl}/ws`);
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({userId: '0x123456'}, (frame) => {
            this.stompClient.subscribe('/topics/updates/'+ this.props.loggedInAddress, (messageOutput) => {
                let notifications = this.state.notifications;
                notifications.push(JSON.parse(messageOutput.body));
                notifications = _.orderBy(notifications, [ 'creationDate' ], [ 'desc' ]);
                let count = this.state.notificationsBadge + 1;
                this.setState({
                    message: 'New Notification',
                    snackOpen: true,
                    autoHideDuration: 5000,
                    notifications: notifications,
                    notificationsBadge: count
                });
            })
        }, (e) => {
            console.error(e, "Connection lost");
            if (e.startsWith("Whoops!")) {
                this.setState({ message: e, snackOpen: true, actionEnabled: true, autoHideDuration: null });
            }
        });
    }

    componentWillUnmount() {
        if (this.stompClient != null) {
            this.stompClient.disconnect();
        }
    }

    handleReload = () => {
        window.location.reload()
    }

    handleCloseSnack = () => {
        this.setState({ snackOpen: false });
    };

    resetBadge() {
        this.setState({ notificationsBadge: 0 });
    }

    openDrawer = () => {
        this.setState({ drawerOpen: true });
    };

    closeDrawer = () => {
        this.setState({ drawerOpen: false });
    };

    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Header openDrawer={this.openDrawer.bind(this)} notificationsBadge={this.state.notificationsBadge}
                            reset={this.resetBadge.bind(this)}/>
                    <Snackbar
                        TransitionComponent={TransitionUp}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={this.state.snackOpen}
                        onClose={this.handleCloseSnack}
                        autoHideDuration={this.state.autoHideDuration}
                    >
                        <SnackbarContent
                            message={<span style={{ color: this.state.messageColor }}>{this.state.message}</span>}
                            action={this.state.actionEnabled &&
                            <Button style={{ color: 'white', backgroundColor: '#313131' }}
                                    onClick={this.handleReload} size="small">
                                Reload
                            </Button>
                            }
                        />
                    </Snackbar>
                    <NotificationList drawerOpen={this.state.drawerOpen} notifications={this.state.notifications} closeDrawer={this.closeDrawer.bind(this)}/>
                    <Main/>
                    <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
    credentials: state.user.credentials,
    loggedIn: state.user.loggedIn,
    loggedInAddress: state.user.loggedInAddress,
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
