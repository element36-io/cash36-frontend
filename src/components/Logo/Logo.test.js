import React from 'react';
import { shallow } from 'enzyme';
import Logo from './Logo';

describe('Shallow render component', () => {
  let wrapper = shallow(<Logo />);

  it('should render dumb component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
