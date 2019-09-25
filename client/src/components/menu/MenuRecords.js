import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const MenuRecords = ({ menu, menu: { records } }) => (
  <Fragment>
    <div>{menu.title}</div>
    <div>
      {records.map(chunk => (
        <div>
          <div>{chunk.date && chunk.date}</div>
          <div>
            {chunk.record.map((chunk, index) => (
              <div>
                {chunk.set}セット目
                <br />
                {chunk.weight}kg
                <br />
                {chunk.reps}reps
                <br />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Fragment>
);

MenuRecords.propTypes = {
  menu: PropTypes.object
};

export default MenuRecords;
