import { AnyAction } from 'redux';
import { InitialState } from '../interfaces/interfaces';
import { ADD_URL, SET_URLS_FROM_DB } from './actions';

const initialState: InitialState = {
    urls: [],
};

export function urlReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case ADD_URL:
            return { urls: [action.payload, ...state.urls] };
        case SET_URLS_FROM_DB:
            return { urls: action.payload };
        default:
            return state;
    }
}
