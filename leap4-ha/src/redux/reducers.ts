import { AnyAction } from 'redux';
import { InitialState } from '../interfaces/interfaces';
import { ADD_URL } from './actions';

const initialState: InitialState = {
    urls: [
        {
            originalUrl: 'text.com',
            mappedUrl: '123.com',
        },
        {
            originalUrl: 'text.com',
            mappedUrl: '123.com',
        },
        {
            originalUrl: 'text.com',
            mappedUrl: '123.com',
        },
        {
            originalUrl: 'text.com',
            mappedUrl: '123.com',
        },
        {
            originalUrl: 'text.com',
            mappedUrl: '123.com',
        },
        {
            originalUrl: 'text.com',
            mappedUrl: '123.com',
        },
        {
            originalUrl: 'text.com',
            mappedUrl: '123.com',
        },
        {
            originalUrl: 'text.com',
            mappedUrl: '123.com',
        },
    ],
};

export function urlReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case ADD_URL:
            return { urls: [action.payload, ...state.urls] };
        default:
            return state;
    }
}
