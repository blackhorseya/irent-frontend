import {billingConstants} from '../_constants';
import {billingService} from '../_services';

export const billingActions = {
  getArrears,
};

function getArrears(id, token) {
  return dispatch => {
    dispatch(request());

    billingService.getArrears(id, token).then(
        resp => {
          dispatch(success(resp.data));
        },
        error => {
          dispatch(failure(error.toString()));
        },
    );
  };

  function request() {
    return {type: billingConstants.GET_ARREARS_REQUEST};
  }

  function success(arrears) {
    return {type: billingConstants.GET_ARREARS_SUCCESS, arrears};
  }

  function failure(error) {
    return {type: billingConstants.GET_ARREARS_FAILURE, error};
  }
}