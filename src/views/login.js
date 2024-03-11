import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js'


const loginTemplate = (submitHandler) => html`

`;

export const loginView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();

        const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

        if (!email || !password) {
            alert('Email and password are required!')
            return;
        };
        userService.login(email, password)
            .then(res => {
                if (res.code == 403) {
                    alert('Unsuccessfull login');
                }
                ctx.page.redirect('/')
            })
            .catch(err => alert(err))
    }

    ctx.render(loginTemplate(submitHandler))
}