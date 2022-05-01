import {bookingConstants} from '../_constants';

const initState = {
  loading: false,
  data: [],
  error: '',
};

export function booking(state = initState, action) {
  switch (action.type) {
    case bookingConstants.LIST_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case bookingConstants.LIST_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.bookings,
        error: '',
      };
    case bookingConstants.LIST_BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.error,
      };

    case bookingConstants.BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case bookingConstants.BOOK_SUCCESS:
      return {
        ...state,
        loading: true,
        data: action.booking,
        error: '',
      };
    case bookingConstants.BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error,
      };

    case bookingConstants.CANCEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case bookingConstants.CANCEL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: null,
        error: '',
      };
    case bookingConstants.CANCEL_FAILURE:
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