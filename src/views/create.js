import { html } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';

const createTemplate = (SubmitHandler) => html`

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


// export const createView = (ctx) => {
//     const SubmitHandler = (e) => {
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

//             catalogService.create(data)
//                 .then(() => {
//                     ctx.page.redirect('/catalog')
//                 })
//                 .catch(err => alert(err))
//         };

//     }

//     ctx.render(createTemplate(SubmitHandler))
// }