import React from 'react';
import { shallow } from 'enzyme';
import ActivityTable from './ActivityTable';

describe('Shallow render component', () => {
  let wrapper = shallow(<ActivityTable />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });
});
