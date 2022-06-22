import { Dispatch } from 'redux';
import { Url } from '../interfaces/interfaces';

export const ADD_URL = 'ADD_URL';
export const SET_URLS_FROM_DB = 'SET_URLS_FROM_DB';

interface AddUrlDispatch {
    type: string;
    payload: Url;
}

interface GetUrlDispatch {
    type: string;
    payload: Url[];
}

export const addUrl = (urlObj: Url) => (dispatch: Dispatch<AddUrlDispatch>) => {
    dispatch({
        type: ADD_URL,
        payload: urlObj,
    });
};

export const setUrlsFromDB =
    (urls: Url[] | any) => (dispatch: Dispatch<GetUrlDispatch>) => {
        dispatch({
            type: SET_URLS_FROM_DB,
            payload: urls,
        });
    };
