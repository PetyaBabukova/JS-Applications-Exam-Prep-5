import { html } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';

const createTemplate = (SubmitHandler) => html`
    <section id="create">
        <div class="form">
            <h2>Add Event</h2>
            <form @submit=${SubmitHandler} class="create-form">
                <input 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Event" 
                />
                <input 
                type="text" 
                name="imageUrl" 
                id="event-image" 
                placeholder="Event Image URL" 
                />
                <input 
                type="text" 
                name="category" 
                id="event-category" 
                placeholder="Category" 
                />
                <textarea 
                id="event-description" 
                name="description" 
                placeholder="Description" 
                rows="5"
                    cols="50"></textarea>
                <input 
                type="text" 
                name="date" 
                id="date" 
                placeholder="When?" />
                <button type="submit">Add</button>
            </form>
        </div>
    </section>
`;

export const createView = (ctx) => {
    const SubmitHandler = (e) => {
        e.preventDefault();

        let isValidData = true;

        const data = Object.fromEntries(new FormData(e.currentTarget));

        Object.entries(data).forEach(([key, value]) => {
            if (value == '') {
                isValidData = false;
            }
        })

        if (!isValidData) {
            alert('All fields are required');
            return
        }


        catalogService.create(data)
            .then(() => ctx.page.redirect('/catalog'))
            .catch(err => alert(err))

    }

    ctx.render(createTemplate(SubmitHandler))
};
