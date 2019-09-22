import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRecord } from '../../actions/menu';

const MenuAddRecord = ({ addRecord }) => {
  const [sets, setSets] = useState([0, 1]);
  const formList = [];

  useEffect(() => {
    for (let i = 0; i < sets.length; i++) {
      formList.push(
        <input
          key={i}
          type='number'
          placeholder='0'
          name={i}
          value={sets}
          onChange={e => onChange(e)}
        />
      );
    }
    console.log(formList.length);
    console.log(formList);
  }, [sets]);

  const onChange = e => {
    setSets(...sets, sets[e.target.name]);
    // if (e.target.Number(e.target.name) == sets.length) {
    //   addForm(sets + 1);
    // }
  };

  const onSubmit = e => {
    e.preventDefault();
    addRecord(sets);
    setSets([0]);
  };

  const addForm = () => {
    for (let i = 0; i < sets.length; i++) {
      formList.push(
        <input
          key={i}
          type='number'
          placeholder='0'
          name={i + 1}
          value={sets}
          onChange={e => onChange(e)}
        />
      );
    }
    return formList;
  };

  // let formList = [];

  // for (let i = 0; i < sets.length; i++) {
  //   formList.push(
  //     <input
  //       type='number'
  //       placeholder='0'
  //       name={i}
  //       value={sets}
  //       onChange={e => onChange(e)}
  //     />
  //   );
  //   console.log(formList);
  // }

  return (
    <Fragment>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          {/* <input
            type='number'
            placeholder='0'
            name='1'
            value={number}
            onChange={e => onChange(e)}
          /> */}
          {addForm()}
        </div>
        <input type='submit' value='Submit' />
      </form>
    </Fragment>
  );
};

MenuAddRecord.propTypes = {
  addRecord: PropTypes.func.isRequired
};

export default connect(
  null,
  { addRecord }
)(MenuAddRecord);
