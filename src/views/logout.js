import * as userService from '../services/userService.js';

export const logout = (ctx) => {
    userService.logout()
        .then(() => {
            ctx.page.redirect('/')
        })
};