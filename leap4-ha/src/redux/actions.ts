import { Dispatch } from 'redux';
import { Url } from '../interfaces/interfaces';

export const ADD_URL = 'ADD_URL';

interface AddUrlDispatch {
    type: string;
    payload: Url;
}

export const addUrl = (urlObj: Url) => (dispatch: Dispatch<AddUrlDispatch>) => {
    dispatch({
        type: ADD_URL,
        payload: urlObj,
    });
};
