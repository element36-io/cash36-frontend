import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const useAvatarReducer = () => {
  const [state, dispatch] = useReducer(reducer, {});
  const actions = {
    add: (username, avatarUri) => {
      dispatch({ type: 'ADD', payload: { [username]: avatarUri } });
    }
  };

  return { state, actions };
};

export const AvatarContext = React.createContext();

const AvatarProvider = props => {
  const authReducer = useAvatarReducer();

  return (
    <AvatarContext.Provider value={{ ...authReducer }}>
      {props.children}
    </AvatarContext.Provider>
  );
};

export default AvatarProvider;
