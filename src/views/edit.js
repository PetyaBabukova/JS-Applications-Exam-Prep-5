import { html } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';

const editTemplate = (item, submitHandler) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit Event</h2>
            <form @submit=${submitHandler} class="edit-form">
                <input 
                type="text" 
                name="name" 
                id="name" 
                value=${item.name}
                placeholder="Event" 
                />
                <input 
                type="text" 
                name="imageUrl" 
                value=${item.imageUrl}
                id="event-image" 
                placeholder="Event Image" 
                />
                <input 
                type="text" 
                value=${item.category}
                name="category" 
                id="event-category" 
                placeholder="Category" 
                />
            <textarea 
                id="event-description" 
                name="description" 
                placeholder="Description" 
                rows="5"
                cols="50"
                >
                ${item.description}
            </textarea>
            <label for="date-and-time">Event Time:</label>
                <input 
                type="text" 
                value=${item.date}
                name="date" 
                id="date" placeholder="When?" 
                />
            <button type="submit">Edit</button>
            </form>
        </div>
    </section>
`;

export const editView = (ctx) => {
    const id = ctx.params.itemId;

    const submitHandler = (e) => {
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
            return;
        }


        catalogService.edit(id, data)
            .then(() => ctx.page.redirect(`/details/${id}`))
            .catch(err => alert(err))

    }

    catalogService.getOne(id)
        .then(item => {
            ctx.render(editTemplate(item, submitHandler))

        })
}


// export const editView = (ctx) => {

//     const id = ctx.params.itemId
//     const onSubmit = (e) => {
//         e.preventDefault();
//         let isValidData = true;

//         const formData = Object.fromEntries(new FormData(e.currentTarget));
//         Object.entries(formData).forEach(([key, value]) => {
//             if (value == '') {
//                 isValidData = false;
//             }
//         })

//         if (!isValidData) {
//             alert('All fields are required');
//             return
//         } else {

//             const data = {
//                 category: formData.category,
//                 imageUrl: formData['image-url'],
//                 description: formData.description,
//                 moreInfo: formData['additional-info']
//             }

//             catalogService.edit(id, data)
//                 .then(() => {
//                     ctx.page.redirect(`/details/${id}`)
//                 })
//         }
//     }
//     catalogService.getOne(id)
//         .then(item => {
//             ctx.render(editTemplate(item, onSubmit))

//         })
// }