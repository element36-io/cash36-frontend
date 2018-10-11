import React from 'react';
import PropTypes from 'prop-types';
import './UserProfile.scss';
import '../StyledButton';
import StyledButton from "../StyledButton";

const tiersObj = {
    Tier_0: {
        text: 'Tier 0',
        iconText: 0,
        btnText: 'Verify Account'
    },
    Tier_1: {
        text: 'Tier 1',
        iconText: 1,
        btnText: 'Continue verification'
    },
    Tier_2: {
        text: 'Verified',
        iconText: <i className="fas fa-check"/>
    }
};

const UserProfile = props => {
    const {user: {username, avatarUri, tier, name}, alt} = props;

    return (
        <div className={`user-profile ${alt ? 'user-profile--alt ' : ''}`}>
            <div className="user-profile__avatar">
                {avatarUri ? <img src={avatarUri} alt={name}/> : <div><i className='fas fa-user'/></div>}
                <span>
                    <i className="fas fa-shield-alt"/>
                    <span>
                        {tiersObj[tier].iconText}
                    </span>
                </span>
                <span className={tier} />
            </div>
            <div className="user-profile__info">
                <p>
                    <span>{name}</span> ({tiersObj[tier].text} user) <i className="fas fa-exclamation-triangle" />
                </p>
                <p>
                    {username}
                </p>
                {tier !== 'Tier_2' && <StyledButton variant="contained" color="primary">{tiersObj[tier].btnText}</StyledButton>}
            </div>
        </div>
    )
};

UserProfile.propTypes = {
    user: PropTypes.object.isRequired,
    verification: PropTypes.func,
    alt: PropTypes.bool
};

export default UserProfile;