import React, { Component } from 'react';
import WalletNav from "./WalletNav";
import BuyTokens from "./BuyTokens";
import SellTokens from "./SellTokens";
import History from "./History";
import { connect } from "react-redux";
import Overview from "./Overview";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user";
import * as notificationActions from "../../actions/notification";
import * as tokenActions from "./../../actions/token";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Button from "@material-ui/core/Button";
import { API_ROOT } from "../../config/Api";

function TransitionUp(props) {
    return <Slide {...props} direction="up"/>;
}

class Wallet extends Component {

    constructor(props) {
        super(props);

        this.state = {
            backendUrl: `${API_ROOT}/cash36`,
            tokens: {},
            tabIndex: 0,
            message: 'I love snacks',
            messageColor: 'white',
            snackOpen: false,
            actionEnabled: false,
            autoHideDuration: null,
            drawerOpen: false,
        };

        this.stompClient = null;
    }

    componentDidMount() {
        this.updateTokens();
        this.loadNotifications();
        this.connectWs();
    }

    componentWillUnmount() {
        if (this.stompClient != null) {
            this.stompClient.disconnect();
        }
    }

    connectWs() {
        let socket = new SockJS(`${this.state.backendUrl}/ws`);
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, (frame) => {
            this.stompClient.subscribe('/topics/updates/' + this.props.loggedInAddress, (messageOutput) => {
                this.newNotification(JSON.parse(messageOutput.body));

                this.setState({
                    message: 'New Notification',
                    snackOpen: true,
                    autoHideDuration: 5000,
                });

                this.updateTokens();
            })
        }, (e) => {
            console.error(e, "Connection lost");
            if (e.startsWith("Whoops!")) {
                this.setState({ message: e, snackOpen: true, actionEnabled: true, autoHideDuration: null });
            }
        });
    }

    updateTokens() {
        this.props.tokenActions.update(this.state.backendUrl, this.props.loggedInAddress);
    }

    newNotification(notification) {
        this.props.notificationActions.newNotification(notification.header, notification.message,
            notification.type, notification.creationDate);
    }

    loadNotifications() {
        this.props.notificationActions.init(this.state.backendUrl, this.props.loggedInAddress, this.props.lastRead);
    }

    changeTab = (event, value) => {
        this.setState({ tabIndex: value });
    };

    handleCloseSnack = () => {
        this.setState({ snackOpen: false });
    };

    handleReload = () => {
        window.location.reload()
    };

    render() {
        return (
            <div>
                <WalletNav tabIndex={this.state.tabIndex} changeTab={this.changeTab.bind(this)}/>
                {this.state.tabIndex === 0 && <Overview tokens={this.props.tokens}/>}
                {this.state.tabIndex === 1 && <BuyTokens tokens={this.props.tokens} updateTokens={this.updateTokens.bind(this)}/>}
                {this.state.tabIndex === 2 && <SellTokens tokens={this.props.tokens} updateTokens={this.updateTokens.bind(this)}/>}
                {this.state.tabIndex === 3 && <History tokens={this.props.tokens}/>}
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
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        notificationActions: bindActionCreators(notificationActions, dispatch),
        tokenActions: bindActionCreators(tokenActions, dispatch),
    };
};

const mapStateToProps = state => ({
    loggedInAddress: state.user.loggedInAddress,
    notifications: state.notification.notifications,
    lastRead: state.notification.lastRead,
    tokens: state.token.tokens,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);