import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Date from '../Date';
import Status from '../Status';
import Action from '../Action';
import Amount from '../Amount';
import Message from '../Message';
import TxId from '../TxId';
import Who from '../Who';
import PaymentInfo from '../../PaymentInfo';

const Row = ({ activity }) => {
  const [buyInfo, setBuyInfo] = useState(activity.paymentInfo);
  const [activeModal, setActiveModal] = useState(false);

  const openModal = () => setActiveModal(true);
  const closeModal = () => setActiveModal(false);

  useEffect(() => {
    if (activity.paymentInfo) setBuyInfo(activity.paymentInfo);
  }, [activity.paymentInfo]);

  return (
    <Fragment>
      <div className="activity-table__row">
        <div className="activity-th-date">
          <Date date={activity.date} />
        </div>
        <div className="activity-th-action">
          <Action
            type={activity.action}
            sourceAddress={activity.sourceAddress}
            targetAddress={activity.targetAddress}
          />
        </div>
        <div className="activity-th-txid">
          <TxId txHash={activity.txHash} />
        </div>
        <div className="activity-th-message">
          <Message message={activity.message} />
        </div>
        {activity.initiatorUserId && (
          <div className="activity-th-who">
            <Who initiatorUserId={activity.initiatorUserId} />
          </div>
        )}
        <div className="activity-th-status">
          <Status status={activity.status} openModal={openModal} />
        </div>
        <div className="activity-th-amount">
          <Amount
            type={activity.action}
            amount={activity.amount}
            symbol={activity.symbol}
          />
        </div>
      </div>
      {buyInfo && (
        <Dialog onClose={closeModal} open={activeModal} maxWidth={false}>
          <PaymentInfo
            title="Payment Information"
            info={buyInfo}
            isModal
            closeModal={closeModal}
          >
            <div className="payment-info__message--credit">
              <p>
                Please make sure your payment will be triggered from your
                registered bank account: IBAN {buyInfo.userIban}
              </p>
            </div>
          </PaymentInfo>
        </Dialog>
      )}
    </Fragment>
  );
};

Row.propTypes = {
  activity: PropTypes.object
};

export default Row;
