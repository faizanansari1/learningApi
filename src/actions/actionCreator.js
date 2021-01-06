import Axios from "axios";
import * as ActionTypes from './actionTypes';

export const fetchOrganizations = () => (dispatch) => {
    dispatch(orgLoading());
    return Axios.get('https://demo6258370.mockable.io/users').then((response) => {
        //console.log('redux res : ', response.data)
        dispatch(orgSuccess(response.data))
    }).catch(err => dispatch(orgFailed(err)))
};
export const orgLoading = () => ({
    type: ActionTypes.ORG_LOADING
});

export const orgSuccess = (org) => ({
    type: ActionTypes.ORG_SUCCESS,
    payload: org
});

export const orgFailed = (err) => ({
    type: ActionTypes.ORG_FAILED,
    payload: err
});