import React from 'react'
import {shallow} from 'enzyme';
import UserProfile from './UserProfile';
import StylesButton from '../StyledButton';
import mock from '../../store/auth/auth.mock';

describe('Shallow render UserProfile', () => {
    let wrapper = shallow(<UserProfile user={mock.user}/>);

    it('should render dumb component', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('should have verification button', () => {
        expect(wrapper.find(StylesButton).length).toEqual(1);
    });

    it('should have user-profile--alt and hide verification button', () => {
        wrapper.setProps({alt: true, user: {...mock.user, tier: 'Tier_2'}});
        expect(wrapper.find('.user-profile--alt').length).toEqual(1);
        expect(wrapper.find(StylesButton).length).toEqual(0);
    })
});