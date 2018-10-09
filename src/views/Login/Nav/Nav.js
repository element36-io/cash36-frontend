import React from 'react';
import { Link } from 'react-router-dom';

const links = [{
  label: 'home',
  url: '#'
},
{
  label: 'support',
  url: '#'
},
{
  label: 'register',
  url: '#'
}];

const Nav = () => (
  <ul>
    {/* change key to url when url is present TODO */}
    {links.map(link => <li key={link.label}><Link to={link.url}>{link.label}</Link></li>)}
  </ul>
);

export default Nav;
