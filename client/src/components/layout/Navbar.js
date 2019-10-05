import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className='menu'>
      <li>
        <Link to='/menus'>
          <span>Menu</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className='menu'>
      <li>
        <Link to='/register'>
          <span>Sign up</span>
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <span>Login</span>
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='Navbar'>
      <Link className='logo' to='/'>
        <h1>traino</h1>
      </Link>

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapToStateProps = state => ({
  auth: state.auth
});

export default connect(
  mapToStateProps,
  { logout }
)(Navbar);
