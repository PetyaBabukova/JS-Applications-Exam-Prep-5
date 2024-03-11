import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';

const registerTemplate = (submitHandler) => html`

`;

export const registerView = (ctx) => {

    const submitHandler = (e) => {
        e.preventDefault();

        const { email, password, ['re-password']: repeatPassowrd } = Object.fromEntries(new FormData(e.currentTarget));
        if (!email || !password || !repeatPassowrd) {
            alert('All fields are required!');
            return;
        };

        if (password !== repeatPassowrd) {
            alert('Password password missmatch!');
            return;
        }

        userService.register(email, password)
            .then(() => {
                ctx.page.redirect('/');
            })
            .catch(err => {
                alert('Error registering: ' + err.message); // Show the actual error message
            });
    }

    ctx.render(registerTemplate(submitHandler))
}