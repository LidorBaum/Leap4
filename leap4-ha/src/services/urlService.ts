import apiService from './httpService';

async function getAllUrls() {
    return await apiService.get(`url`);
}

async function getUrlById(id: string) {
    return await apiService.get(`url/${id}`);
}

async function addUrl(url: string) {
    return await apiService.post(`url`, { url });
}

export default {
    getAllUrls,
    getUrlById,
    addUrl,
};
