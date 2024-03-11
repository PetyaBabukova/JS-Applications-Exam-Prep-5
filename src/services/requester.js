import * as authService from './authService.js';

const request = (method, url, data) => {
    let options = {
        headers: {}
    };
    let token = authService.getToken();

    if (token) {
        options.headers['X-Authorization'] = token;
    }

    if (method !== "GET") {
        options.method = method;
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return fetch(url, options)
        .then(res => {
            if (!res.ok) {
                // If the response is not ok, throw an error with the status text
                return res.json().then(error => {
                    throw new Error(error.message || 'Something went wrong');
                });
            }
            // If response status is 204 No Content, return null to avoid syntax error on res.json()
            if (res.status === 204) {
                return null;
            }
            return res.json();
        });
};

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const put = request.bind({}, 'PUT');
export const del = request.bind({}, 'DELETE');
export const patch = request.bind({}, 'PATCH');
