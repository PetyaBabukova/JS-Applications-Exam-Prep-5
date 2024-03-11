import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';

const registerTemplate = (submitHandler) => html`
    <section id="register">
        <div class="form">
            <h2>Register</h2>
            <form @submit=${submitHandler} class="register-form">
                <input type="text" name="email" id="register-email" placeholder="email" />
                <input type="password" name="password" id="register-password" placeholder="password" />
                <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                <button type="submit">register</button>
                <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
    </section>
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