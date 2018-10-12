import React from 'react';
import { shallow } from 'enzyme';
import Date from './Date';

const props = {
  date: '11.11.1111'
};

describe('Shallow render component', () => {
  let wrapper = shallow(<Date {...props} />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render 3 divs inside the component', () => {
    expect(wrapper.find('div').length).toBe(3);
  });
});
