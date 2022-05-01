import {carConstants} from '../_constants';

const initState = {
  loading: false,
  data: [],
  total: 0,
  error: '',
};

export function cars(state = initState, action) {
  switch (action.type) {
    case carConstants.LIST_CAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case carConstants.LIST_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.cars,
        total: action.total,
        error: '',
      };
    case carConstants.LIST_CAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case carConstants.LIST_NEAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case carConstants.LIST_NEAR_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.cars,
        total: action.total,
        error: '',
      };
    case carConstants.LIST_NEAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}