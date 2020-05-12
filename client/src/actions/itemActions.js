import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEM_LOADING } from './types';
import axios from 'axios';

// export const getItems = () => {
//   return {
//     type: GET_ITEMS,
//     // payload: res.data,
//   };
// };
export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios.get('http://localhost:5000/').then((res) =>
    // (res) => console.log(res.data)
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    })
  );
};

// export const deleteItem = (id) => {
//   return {
//     type: DELETE_ITEM,
//     payload: id,
//   };
// };

export const deleteItem = (id) => (dispatch) => {
  console.log(id);
  // return {
  //   type: DELETE_ITEM,
  //   payload: id,
  // };
  axios.delete(`http://localhost:5000/${id}`).then((res) =>
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    })
  );
};

// export const addItem = (item) => {
//   return {
//     type: ADD_ITEM,
//     payload: item,
//   };
// };
export const addItem = (item) => (dispatch) => {
  axios.post('http://localhost:5000/', item).then((res) =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    })
  );
};
export const setItemsLoading = () => {
  return {
    type: ITEM_LOADING,
  };
};
