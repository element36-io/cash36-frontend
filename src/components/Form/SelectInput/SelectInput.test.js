import React from 'react';
import { shallow } from 'enzyme';

import SelectInput from './SelectInput';

let wrapper, onChange, name, label;

beforeEach(() => {
  onChange = jest.fn();
  name = 'some name';
  label = 'some label';
  wrapper = shallow(
    <SelectInput onChange={onChange} label={label} name={name} list={[]} />
  );
});

it('should render a component', () => {
  expect(wrapper.length).toBe(1);
});

it('should render a <p> tag if error prop is passed in', () => {
  wrapper.setProps({ error: 'Some random error' });

  expect(wrapper.find('p').length).toBe(1);
});

it('should not render a <p> tag if error prop is not passed in</p>', () => {
  expect(wrapper.find('p').length).toBe(0);
});
