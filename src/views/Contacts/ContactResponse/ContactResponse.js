import React from 'react';
import PropTypes from 'prop-types';
import ActionStatus from '../../../components/ActionStatus/index';
import BaseButton from '../../../components/Buttons/BaseButton/index';

import './ContactResponse.scss';

const ContactResponse = props => {
  const { onClick, title, btnText, type} = props;

  return (
    <div className="contact-form__response">
      <ActionStatus type={type} title={title}/>
      <BaseButton onClick={onClick}>
        {btnText}
      </BaseButton>
    </div>
  )
}

ContactResponse.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  btnText: PropTypes.string,
  type: PropTypes.string.isRequired
};

export default ContactResponse;
