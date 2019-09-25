import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRecord } from '../../actions/menu';

const MenuAddRecord = ({ addRecord, recordId, history }) => {
  const [record, setRecord] = useState([]);

  const [formData, setFormData] = useState({
    set: 1,
    weight: '',
    reps: ''
  });

  const { set, weight, reps } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 最終的にdispatchするデータ
  // records = [
  //   {
  //   "set": 1,
  //   "weight": 2,
  //   "reps": 3,
  //   },
  //   {
  //   "set": 1,
  //   "weight": 2,
  //   "reps": 3,
  //   },
  //   {
  //   "set": 1,
  //   "weight": 2,
  //   "reps": 3,
  //   }
  // ]

  const onSubmit = e => {
    e.preventDefault();
    const recordsCopy = record.slice();
    recordsCopy.push(formData);
    setRecord(recordsCopy);
    setFormData({ ...formData, set: set + 1 });
  };

  const onClick = e => {
    e.preventDefault();
    addRecord(recordId, { record });
    setRecord([]);
    setFormData({
      set: 1,
      weight: '',
      reps: ''
    });
    history.push('/menus');
  };

  return (
    <Fragment>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <span>{set}</span>
        <div className='form-group'>
          <input
            type='number'
            placeholder='0'
            name='weight'
            value={weight}
            onChange={e => onChange(e)}
            required
            min='0'
          />
          <input
            type='number'
            placeholder='0'
            name='reps'
            value={reps}
            onChange={e => onChange(e)}
            required
            min='0'
          />
        </div>
        <input type='submit' value='Submit' />
      </form>
      <section>
        <table>
          <thead>
            <tr>
              <th>セット</th>
              <th>ウェイト</th>
              <th>レップ数</th>
            </tr>
          </thead>
          <tbody>
            {record.map(record => (
              <tr>
                <td>{record.set}</td>
                <td>{record.weight}</td>
                <td>{record.reps}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={e => onClick(e)}>
          記録してトレーニングを終了する
        </button>
      </section>
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
