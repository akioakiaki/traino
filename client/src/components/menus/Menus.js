import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMenus } from '../../actions/menu';
import Spinner from '../layout/Spinner';
import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';
import Addmenu from '../layout/menu-forms/AddMenu';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const Menus = ({ getMenus, auth: { user }, menu: { menus, loading } }) => {
  useEffect(() => {
    getMenus();
  }, []);

  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen style={customStyles}>
      <Addmenu hideModal={hideModal} />
      <button onClick={hideModal}>Hide modal</button>
    </ReactModal>
  ));

  return loading && menus === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Menu</h1>
      <p>ようこそ {user && user.name}</p>
      {menus !== null ? (
        <Fragment>
          <h2>トレーニングメニューを選択してください。</h2>
          {menus.map(menu => {
            return (
              <div className='menu-wrapper'>
                <h3>{menu.title}</h3>
                <Link to={`/menu/${menu._id}`}>トレーニング開始</Link>
              </div>
            );
          })}
        </Fragment>
      ) : (
        <Fragment>
          <p>Menuがありません、追加してください。</p>
          <Link to='/create-menu'>Menuを追加する</Link>
        </Fragment>
      )}
      <button onClick={showModal}>Show modal</button>
    </Fragment>
  );
};

Menus.propTypes = {
  getMenus: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  menu: state.menu,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getMenus }
)(Menus);
