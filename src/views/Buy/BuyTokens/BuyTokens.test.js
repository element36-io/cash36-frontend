import React from 'react';
import { shallow } from 'enzyme';
import BuyTokens from './BuyTokens';
import StepButton from '../../../components/Buttons/StepButton';
import ChooseAmountForm from '../../../components/ChooseAmountForm';

const props = {
  handleChange: jest.fn(),
  amount: '1',
  symbol: 'CHF36',
  nextStep: jest.fn()
};

describe('Shallow render component', () => {
  let wrapper = shallow(<BuyTokens {...props} />);

  it('should render component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render 1 StepButton', () => {
    expect(wrapper.find(StepButton).length).toBe(1);
  });

  it('should render 1 ChooseAmountForm', () => {
    expect(wrapper.find(ChooseAmountForm).length).toBe(1);
  });

  it('should render 1 h2 element', () => {
    expect(wrapper.find('h2').length).toBe(1);
  });

  it('should call nextStep on click', () => {
    wrapper.find(StepButton).simulate('click');
    expect(props.nextStep.mock.calls.length).toEqual(1);
  });
});
