import React from 'react';
import { shallow } from 'enzyme';
import { AuthContainerNav } from './AuthContainerNav';

const props = {
  showRegister: true,
  location: {
    pathname: '/'
  }
};

describe('Shallow render component', () => {
  let wrapper = shallow(<AuthContainerNav {...props} />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render 1 ul tags inside the component', () => {
    expect(wrapper.find('ul').length).toBe(1);
  });

  it('should render 3 li tags inside the component', () => {
    expect(wrapper.find('li').length).toBe(3);
  });
});
