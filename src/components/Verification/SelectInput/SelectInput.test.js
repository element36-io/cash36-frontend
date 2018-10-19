import React from 'react';
import { shallow } from 'enzyme';
import { TextField, MenuItem } from '@material-ui/core';
import { SelectInput } from './SelectInput';

const props = {
  name: 'name',
  label: 'label',
  value: 'value',
  onChange: jest.fn(),
  countryData: [{ name: 'name', code: 'code' }],
  classes: {
    root: ''
  }
};

describe('Shallow render component', () => {
  let wrapper = shallow(<SelectInput {...props} />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should 1 TextField component', () => {
    expect(wrapper.find(TextField).length).toBe(1);
  });

  it('should at least 1 MenuItem component', () => {
    expect(wrapper.find(MenuItem).length).toBeGreaterThan(0);
  });
});
