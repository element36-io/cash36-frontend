import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import { AuthContainer } from './AuthContainer';

const props = {
  auth: {
    isAuthenticated: false,
    uportCreds: {
      someProp: 'default'
    }
  },
  children: {
    someProp: 'default'
  }
};

describe('Shallow render component', () => {
  let wrapper = shallow(<AuthContainer {...props} />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render 6 <div> if isAuthenticated is false', () => {
    expect(wrapper.find('div').length).toBe(6);
  });

  it('should render <Redirect /> if isAuthenticated is true', () => {
    let wrapper = shallow(<AuthContainer {...props} auth={{ isAuthenticated: true }} />);
    expect(wrapper.find(Redirect).length).toBe(1);
  });
});
