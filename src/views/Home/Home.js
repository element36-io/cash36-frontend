import React, {Component} from 'react';
import {connect} from 'react-redux';
import requireAuth from '../../components/requireAuth';
import BalanceCard from '../../components/BalanceCard/index';
import QuickActions from '../../components/QuickActions/index';
import ActivityTable from '../../components/ActivityTable';
import UserProfile from '../../components/UserProfile';
import {getTokens} from '../../store/tokens/tokens.actions';

import './Home.scss';

class Home extends Component {
    componentDidMount() {
        this.props.getTokens();
    }

    render() {
        const {tokens, user} = this.props;

        console.log(user);

        return (
            <div className="home-page">
                <div className="home-page__user-actions">
                    <UserProfile user={user} />
                    <QuickActions/>
                </div>
                <div className='home-page__balance-cards'>
                    {tokens.map(({symbol, name, balance}) =>
                        <BalanceCard key={name} name={name} symbol={symbol} balance={balance}/>)}
                </div>
                <div className='home-page__activity'>
                    <h2>Last Activity</h2>
                    <ActivityTable />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({tokens, auth: {user}}) => ({tokens, user});

export default requireAuth(connect(mapStateToProps, {getTokens})(Home));
