import {SET_ADDRESSES} from '../actions';

export default function all_addresses(state = [], action) {
  switch (action.type) {
    case SET_ADDRESSES:
      return [...state, action.payload];
    default:
      return state;
  }
}
