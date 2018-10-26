import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import requireAuth from '../../components/requireAuth';
import ActivityTable from '../../components/ActivityTable';
import { getUserActivity } from '../../store/tokens/tokens.actions';
import Responsive from '../../components/Responsive';
import DateRange from './DateRange';
import DateRangeMobile from './DateRangeMobile';
import './History.scss';

class History extends Component {
  componentDidMount () {
    this.props.getUserActivity();
  }
  render () {
    const { userActivity } = this.props;
    return (
      <div className='wrapper'>
        <div className='history'>
          <div className='history__content'>
            {userActivity.length > 0
              ? <div>
                <div className='history__filters'>
                  <Responsive>
                    <DateRange />
                  </Responsive>
                  <Responsive isMobile>
                    <DateRangeMobile />
                  </Responsive>
                </div>
                <ActivityTable userActivity={userActivity} />
              </div>
              : <div className='paper history__no-activity'>
                <h3>No Activity History</h3>
                <p>Keep track of your most recent transactions here when you sell, buy or transfer cash36 currencies</p>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tokens: { userActivity = [] } }) => ({
  userActivity
});

History.propTypes = {
  userActivity: PropTypes.arrayOf(PropTypes.object)
};

export default requireAuth(connect(mapStateToProps, { getUserActivity })(History));
