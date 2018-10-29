import React from 'react';
import { mount } from 'enzyme';
import DatePicker from './DatePicker';
import { InlineDatePicker } from 'material-ui-pickers/DatePicker';

let newDate = null;
const props = {
  dob: null,
  onChange: (stringEuDate) => {
    newDate = stringEuDate;
  }
};

describe('Render component', () => {
  let wrapper = mount(<DatePicker {...props} />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render InlineDatePicker inside the component', () => {
    expect(wrapper.find(InlineDatePicker).length).toBe(1);
  });

  it('should set new date on an onChange event', () => {
    wrapper.instance().props.onChange('26/01/2018');
    expect(newDate).toBe('26/01/2018');
  });
});
