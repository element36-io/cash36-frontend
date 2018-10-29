import React from 'react';
import { shallow } from 'enzyme';
import QuickActions from './QuickActions';
import { Link } from 'react-router-dom';

describe('Shallow render component', () => {
  let wrapper = shallow(<QuickActions />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render 9 divs inside the component', () => {
    expect(wrapper.find('div').length).toBe(9);
  });

  it('should render 3 button links inside the component', () => {
    expect(wrapper.find(Link).length).toBe(3);
  });
});
