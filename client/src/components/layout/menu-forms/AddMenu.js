import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMenu } from '../../../actions/menu';

const AddMenu = ({ addMenu, hideModal }) => {
  const [text, setText] = useState('');

  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    addMenu(text);
    setText('');
    hideModal();
  };
  return (
    <Fragment>
      <h2>メニュー名を入力してください。</h2>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='ベンチプレス'
            name='title'
            value={text}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' value='Submit' />
      </form>
    </Fragment>
  );
};

AddMenu.propTypes = {
  addPost: PropTypes.func,
  hideModal: PropTypes.func
};

export default connect(
  null,
  { addMenu }
)(AddMenu);
