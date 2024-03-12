import * as request from './requester.js';

const baseUrl = 'http://localhost:3030/data/events';

export const getAll = () => request.get(`${baseUrl}?sortBy=_createdOn%20desc`);

export const getOne = (itemId) => request.get(`${baseUrl}/${itemId}`)

export const create = (itemData) => request.post(baseUrl, itemData);

export const edit = (itemId, itemData) => request.put(`${baseUrl}/${itemId}`, itemData);

export const remove = (itemId) => request.del(`${baseUrl}/${itemId}`);

export const go = (eventId) => request.post('http://localhost:3030/data/going', { eventId });

export const getTotalGoes = (eventId) => request.get( `http://localhost:3030/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count` );

export const didUserGo = (eventId, userId)=> request.get( `http://localhost:3030/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count` );

// /data/going
// /data/going?where=eventId%3D%22{eventId}%22&distinct=_ownerId&count
// /data/going?where=eventId%3D%22{eventId}%22%20and%20_ownerId%3D%22{userId}%22&count