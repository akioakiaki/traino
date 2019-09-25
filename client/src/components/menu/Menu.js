import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMenu } from '../../actions/menu';
import MenuRecords from './MenuRecords';
import MenuAddRecord from './MenuAddRecord';
import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';
import DeleteMenuModal from './DeleteMenuModal';

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

const Menu = ({ getMenu, menu: { menu, loading }, match }) => {
  useEffect(() => {
    getMenu(match.params.id);
  }, []);

  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen style={customStyles}>
      <DeleteMenuModal hideModal={hideModal} />
      <button onClick={hideModal}>Hide modal</button>
    </ReactModal>
  ));

  return loading || menu === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div>menuだよ</div>
      <MenuAddRecord recordId={menu._id} />
      <MenuRecords menu={menu} />
      <button onClick={showModal}>メニューを削除する</button>
    </Fragment>
  );
};

Menu.propTypes = {
  getMenu: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  menu: state.menu
});
export default connect(
  mapStateToProps,
  { getMenu }
)(Menu);
