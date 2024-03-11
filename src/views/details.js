import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';

const detailsTemplate = (item, isOwner, isLogged) => html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src=${item.imageUrl} alt="example1" />
                <p id="details-title">${item.name}</p>
                <p id="details-category">
                    Category: <span id="categories">${item.category}</span>
                </p>
                <p id="details-date">
                    Date:<span id="date">${item.date}</span></p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <span>${item.description}</span>
                    </div>
             </div>
             <h3>Going: <span id="go">0</span> times.</h3>
        ${isOwner
        ? html`
        <div id="action-buttons">
            <a href="" id="edit-btn">Edit</a>
            <a href="" id="delete-btn">Delete</a>
        </div>
            `
        : nothing}

        ${isLogged && !isOwner
        ? html`
            <div id="action-buttons">
                <a href="" id="go-btn">Going</a>
            </div>
        `
        : nothing}
                </div>
            </section>
`;

export const detailsView = (ctx) => {
    catalogService.getOne(ctx.params.itemId)
        .then(character => {
            const isOwner = Boolean(character._ownerId == ctx.user?._id);

            ctx.render(detailsTemplate(character, isOwner, ctx.user));
        })
}
