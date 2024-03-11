import * as request from './requester.js';

const baseUrl = 'http://localhost:3030/data/cars';

export const getAll = () => request.get(`${baseUrl}?sortBy=_createdOn%20desc`);

export const getOne = (itemId) => request.get(`${baseUrl}/${itemId}`)

export const create = (itemData) => request.post(baseUrl, itemData);

export const edit = (itemId, itemData) => request.put(`${baseUrl}/${itemId}`, itemData);

export const remove = (itemId) => request.del(`${baseUrl}/${itemId}`);

export const search = (searchText)=> {
    const query = encodeURIComponent(`model LIKE "${searchText}"`)
    return request.get(`${baseUrl}?where=${query}`)
}