import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ChildComponent) => {
  const ComposedComponent = props => props.authed ? <ChildComponent {...props} /> : <Redirect to='/login' />;

  const mapStateToProps = ({ auth }) => ({ authed: auth.isAuthenticated });

  return connect(mapStateToProps)(ComposedComponent);
};
