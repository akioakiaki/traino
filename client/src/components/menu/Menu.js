import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMenu } from '../../actions/menu';
import MenuRecords from './MenuRecords';
import MenuAddRecord from './MenuAddRecord';

const Menu = ({ getMenu, menu: { menu, loading }, match }) => {
  useEffect(() => {
    getMenu(match.params.id);
  }, []);

  return loading && menu === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div>menuだよ</div>
      <MenuAddRecord />
      <MenuRecords menu={menu} />
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
