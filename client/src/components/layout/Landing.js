import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='menus' />;
  }
  return (
    <section className='landing'>
      <h2>The daily training note for professional trainee</h2>
      <p>
        trainoは筋トレメニューをシンプルに追加、記録できるアプリです。あなただけの理想のプログラムを作りましょう。
      </p>
      <div className='buttons'>
        <div className='button'>
          <Link to='/register' className='inner'>
            <span>Sign Up</span>
          </Link>
        </div>
        <div className='button'>
          <Link to='/login' className='inner'>
            <span>Login</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapToStateProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapToStateProps)(Landing);
