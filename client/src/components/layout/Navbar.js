import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h1>
        <Link to='/'>traino</Link>
      </h1>
      <ul>
        <li>
          <Link to='/menu'>menu</Link>
        </li>
        <li>
          <Link to='/register'>register</Link>
        </li>
        <li>
          <Link to='/login'>login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
