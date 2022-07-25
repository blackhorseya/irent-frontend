import {userService} from '../_services';
import {routeConstants, userConstants} from '../_constants';
import {push} from 'connected-react-router';
import {billingActions} from './billing.actions';

export const userActions = {
    login,
    me,
};

function login(id, password) {
    return dispatch => {
        dispatch(request());

        userService.login(id, password).then(
            resp => {
                dispatch(success(resp.data));
                localStorage.removeItem('token');
                localStorage.setItem('token', resp.data.access_token);
                dispatch(
                    billingActions.getArrears(resp.data.id, resp.data.access_token));
                dispatch(push(routeConstants.Root));
            },
            error => {
                dispatch(failure(error.toString()));
            },
        );
    };

    function request() {
        return {type: userConstants.LOGIN_REQUEST};
    }

    function success(profile) {
        return {type: userConstants.LOGIN_SUCCESS, profile};
    }

    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE, error};
    }
}

function me(token) {
    return dispatch => {
        dispatch(request());

        userService.me(token).then(
            resp => {
                dispatch(success(resp.data));
                dispatch(billingActions.getArrears(resp.data.id, resp.data.access_token));
            },
            error => {
                localStorage.removeItem('token');
                dispatch(failure(error.toString()));
            },
        );
    };

    function request() {
        return {type: userConstants.ME_REQUEST};
    }

    function success(profile) {
        return {type: userConstants.ME_SUCCESS, profile};
    }

    function failure(error) {
        return {type: userConstants.ME_FAILURE, error};
    }
}