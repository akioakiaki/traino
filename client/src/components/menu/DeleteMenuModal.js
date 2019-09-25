import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteMenu } from '../../actions/menu';
import { withRouter } from 'react-router-dom';
import Menu from './Menu';

const DeleteMenuModal = ({
  deleteMenu,
  hideModal,
  history,
  menu: { menu }
}) => {
  const onClick = e => {
    e.preventDefault();
    deleteMenu(menu._id, history);
    hideModal();
  };
  return (
    <Fragment>
      <h2>本当にメニューを削除してますか？</h2>
      <p>メニューを削除すると記録したデータは削除されます。</p>
      <button onClick={e => onClick(e)}>はい</button>
      <button onClick={hideModal}>いいえ</button>
    </Fragment>
  );
};

DeleteMenuModal.propTypes = {
  deleteMenu: PropTypes.func,
  hideModal: PropTypes.func,
  menu: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  menu: state.menu
});

export default connect(
  mapStateToProps,
  { deleteMenu }
)(withRouter(DeleteMenuModal));
