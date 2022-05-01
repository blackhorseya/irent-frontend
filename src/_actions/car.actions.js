import {carConstants} from '../_constants';
import {carService} from '../_services';

export const carActions = {
  list,
  near,
};

function list(start, end) {
  return dispatch => {
    dispatch(request());

    carService.list(start, end).then(
        resp => {
          dispatch(success(resp.data, resp.total));
        },
        error => {
          dispatch(failure(error.toString()));
        },
    );
  };

  function request() {
    return {type: carConstants.LIST_CAR_REQUEST};
  }

  function success(cars, total) {
    return {type: carConstants.LIST_CAR_SUCCESS, cars, total};
  }

  function failure(error) {
    return {type: carConstants.LIST_CAR_FAILURE, error};
  }
}

function near(n, latitude, longitude) {
  return dispatch => {
    dispatch(request());

    carService.near(n, latitude, longitude).then(
        resp => {
          dispatch(success(resp.data, resp.total));
        },
        error => {
          dispatch(failure(error.toString()));
        },
    );
  };

  function request() {
    return {type: carConstants.LIST_NEAR_REQUEST};
  }

  function success(cars, total) {
    return {type: carConstants.LIST_NEAR_SUCCESS, cars, total};
  }

  function failure(error) {
    return {type: carConstants.LIST_NEAR_FAILURE, error};
  }
}