import React from 'react';
import QRCode from 'qrcode.react';
import { Tooltip } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import Responsive from '../../../components/Responsive';
import StepButton from '../../../components/Buttons/StepButton';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import useStyles from './MuiStyles';

import './InitiateAutoPayment.scss';

const tooltipText = `Once you've completed the payment, click the "Submit Order" button. Once we receive the funds, we will add tokens to your account.`;

const InitiateAutoPayment = () => {
  const classes = useStyles();

  return (
    <div>
      <div className="initiate-auto-payment">
        <div className="initiate-auto-payment__heading">
          <h2>Initiate the payment</h2>
          <Tooltip
            title={tooltipText}
            classes={{ tooltip: classes.tooltip }}
            placement="right-start"
          >
            <ErrorIcon />
          </Tooltip>
        </div>
        <Responsive>
          <div className="initiate-auto-payment__qrcode">
            <QRCode value="#" size={256} />
          </div>
        </Responsive>
        <Responsive isMobile>
          <div className="initiate-auto-payment__mobile">
            <p>
              You can initiate digital bank transfer using a Banking App on your
              device
            </p>
            <p>
              When the transfer is complete, make sure to submit your order!
            </p>
            <div className="initiate-auto-payment__mobile-buttons">
              <DefaultButton
                fullWidth
                onClick={() => {
                  console.log('Open banking app clicked');
                }}
              >
                Open Banking App
              </DefaultButton>
              <DefaultButton
                fullWidth
                onClick={() => {
                  console.log('See supported Apps clicked');
                }}
              >
                See Supported Apps
              </DefaultButton>
            </div>
          </div>
        </Responsive>
        <StepButton onClick={() => {}} text={'Submit Order'} />
      </div>
    </div>
  );
};

export default InitiateAutoPayment;
