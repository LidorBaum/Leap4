import Axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const axios = Axios.create({
    // withCredentials: true,
});

const get = (endpoint: string, data?: any) => {
    return ajax(endpoint, 'GET', data);
}

const post = (endpoint: string, data?: any) => {
    return ajax(endpoint, 'POST', data);
}

const apiService = {
    get,
    post
}

export default apiService

async function ajax(endpoint: string, method = 'get', data = null) {
    try {
        const res = await axios({
            url: `${API_URL}${endpoint}`,
            method,
            data,
        });
        return res.data;
    } catch (err: any) {
        if (!err.response) {
            return {
                error: {
                    message:
                        'Oops, there is a problem with the server, please try again',
                    status: 500,
                },
            };
        }
        return {
            error: {
                message: err.response.data,
                status: err.response.status,
            },
        };
    }
}
