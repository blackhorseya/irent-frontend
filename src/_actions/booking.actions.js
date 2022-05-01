import {bookingService} from '../_services';
import {bookingConstants} from '../_constants';

export const bookingActions = {
  list,
  book,
  cancel,
};

function list(token) {
  return dispatch => {
    dispatch(request());

    bookingService.list(token).then(
        resp => {
          dispatch(success(resp.data));
        },
        error => {
          dispatch(failure(error.toString()));
        },
    );
  };

  function request() {
    return {type: bookingConstants.LIST_BOOKING_REQUEST};
  }

  function success(bookings) {
    return {type: bookingConstants.LIST_BOOKING_SUCCESS, bookings};
  }

  function failure(error) {
    return {type: bookingConstants.LIST_BOOKING_FAILURE, error};
  }
}

function book(id, projID, token) {
  return dispatch => {
    dispatch(request());

    bookingService.book(id, projID, token).then(
        resp => {
          dispatch(success(resp.data));
          dispatch(bookingActions.list(localStorage.getItem('token')));
        },
        error => {
          dispatch(failure(error.toString()));
        },
    );
  };

  function request() {
    return {type: bookingConstants.BOOK_REQUEST};
  }

  function success(booking) {
    return {type: bookingConstants.BOOK_SUCCESS, booking};
  }

  function failure(error) {
    return {type: bookingConstants.BOOK_FAILURE, error};
  }
}

function cancel(id, token) {
  return dispatch => {
    dispatch(request());

    bookingService.cancel(id, token).then(
        resp => {
          dispatch(success(id));
        },
        error => {
          dispatch(failure(error.toString()));
        },
    );
  };

  function request() {
    return {type: bookingConstants.CANCEL_REQUEST};
  }

  function success(id) {
    return {type: bookingConstants.CANCEL_SUCCESS, id};
  }

  function failure(error) {
    return {type: bookingConstants.CANCEL_FAILURE, error};
  }
}

