import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    errMsg: '',
    organizations: []
}

export const organizations = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ORG_SUCCESS:
            return { ...state, isLoading: false, errMsg: '', organizations: action.payload };

        case ActionTypes.ORG_LOADING:
            return { ...state, isLoading: true, errMsg: '', organizations: [] };

        case ActionTypes.ORG_FAILED:
            return { ...state, isLoading: false, errMsg: action.payload, organizations: [] };

        default:
            return { ...state };
    }
};      


