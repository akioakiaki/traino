import axios from 'axios';
import {
  GET_MENUS,
  MENU_ERROR,
  ADD_MENU,
  GET_MENU,
  ADD_RECORD,
  RECORD_ERROR,
  DELETE_MENU
} from './types';
import { setAlert } from './alert';

// Get menus
export const getMenus = () => async dispatch => {
  try {
    const res = await axios.get('/api/menu');

    dispatch({
      type: GET_MENUS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MENU_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add menu
export const addMenu = title => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ title });

    const res = await axios.post('/api/menu/', body, config);

    dispatch({
      type: ADD_MENU,
      payload: res.data
    });

    dispatch(setAlert('新しいメニューが追加されました。'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: MENU_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get menu by id
export const getMenu = id => async dispatch => {
  try {
    const res = await axios.get(`/api/menu/${id}`);

    dispatch({
      type: GET_MENU,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MENU_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete menu by id
export const deleteMenu = (id, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/menu/${id}`);

    dispatch({
      type: DELETE_MENU,
      payload: res.data
    });

    dispatch(setAlert('メニューが削除されました。', 'success'));

    history.push('/menus');
  } catch (err) {
    dispatch({
      type: MENU_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add record
export const addRecord = (recordId, record, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = record;

    const res = await axios.post(`/api/menu/record/${recordId}`, body, config);

    dispatch({
      type: ADD_RECORD,
      payload: res.data
    });

    dispatch(setAlert('記録が追加されました。'));
    history.push('/menus');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: RECORD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
