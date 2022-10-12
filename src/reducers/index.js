import all_addresses from './all_address';
import {isLoading} from './interactions';
import {combineReducers} from 'redux';

const reducer = combineReducers({
  all_addresses,
  isLoading,
});

export default reducer;
