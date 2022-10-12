export const IS_LOADING = 'IS_LOADING';
export const SET_ADDRESSES = 'SET_ADDRESSES';

export function isLoading(isLoading = false) {
  return {
    type: IS_LOADING,
    isLoading: isLoading,
  };
}

export function set_address(payload) {
  return {
    type: SET_ADDRESSES,
    payload: payload,
  };
}
