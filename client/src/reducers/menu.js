import {
  GET_MENUS,
  GET_MENU,
  ADD_MENU,
  MENU_ERROR,
  CLEAR_MENU,
  ADD_RECORD,
  RECORD_ERROR
} from '../actions/types';

const initialState = {
  menus: [],
  menu: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MENUS:
      return {
        ...state,
        menus: payload,
        loading: false
      };
    case GET_MENU:
      return {
        ...state,
        menu: payload,
        loading: false
      };
    case ADD_MENU:
      return {
        ...state,
        menus: [payload, ...state.menus],
        loading: false
      };
    case MENU_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_MENU:
      return {
        ...state,
        menus: null,
        loading: false
      };
    case ADD_RECORD:
      return {
        ...state,
        menu: payload,
        loading: false
      };
    case RECORD_ERROR:
      return {
        ...state,
        menu: payload,
        loading: false
      };
    default:
      return state;
  }
}
