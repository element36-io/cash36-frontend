import React from 'react';
import { shallow } from 'enzyme';
import Stepper from './Stepper';

const props = {
  step: 1
};

describe('Shallow render component', () => {
  let wrapper = shallow(<Stepper {...props} />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render 4 divs inside the component', () => {
    expect(wrapper.find('div').length).toBe(4);
  });
});
