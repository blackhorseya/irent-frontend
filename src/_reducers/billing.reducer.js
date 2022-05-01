import {billingConstants} from '../_constants';

const initState = {
  loading: false,
  data: null,
  error: '',
};

export function billing(state = initState, action) {
  switch (action.type) {
    case billingConstants.GET_ARREARS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case billingConstants.GET_ARREARS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.arrears,
        error: '',
      };
    case billingConstants.GET_ARREARS_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error,
      };

    default:
      return state;
  }
}
