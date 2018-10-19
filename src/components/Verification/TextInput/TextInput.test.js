import React from 'react';
import { shallow } from 'enzyme';
import { TextField } from '@material-ui/core';
import { TextInput } from './TextInput';

const props = {
  name: 'name',
  label: 'label',
  value: 'value',
  onChange: jest.fn(),
  placeholder: 'placeholder',
  classes: {
    root: ''
  }
};

describe('Shallow render component', () => {
  let wrapper = shallow(<TextInput {...props} />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should 1 TextField component', () => {
    expect(wrapper.find(TextField).length).toBe(1);
  });
});
