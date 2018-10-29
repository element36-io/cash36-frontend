import React from 'react';
import { shallow } from 'enzyme';
import Status from './Status';
import BookmarksIcon from '@material-ui/icons/BookmarkBorder';

const props = {
  status: 'OPEN'
};

describe('Shallow render component', () => {
  let wrapper = shallow(<Status {...props} />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render 2 divs inside the component', () => {
    expect(wrapper.find('div').length).toBe(2);
  });

  it('should render 1 icon inside the component', () => {
    expect(wrapper.find(BookmarksIcon).length).toBe(1);
  });
});
