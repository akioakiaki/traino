import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const MenuRecords = ({ menu }) => (
  <Fragment>
    <div>{menu.title}</div>
    <div>
      {menu.records.map(record => (
        <div>
          <div>{record.date}</div>
          <div>
            {record.sets.map((set, index) => (
              <div>{set}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Fragment>
);

MenuRecords.propTypes = {
  menu: PropTypes.object.isRequired
};

export default MenuRecords;
