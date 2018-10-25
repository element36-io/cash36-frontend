import React from 'react';
import requireAuth from '../../components/requireAuth';

const History = () => <div>History Screen</div>;

export default requireAuth(History);
