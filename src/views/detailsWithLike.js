import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';

const detailsTemplate = (item, isOwner, isLogged) => html`
<section id="details">
<div id="details-wrapper">
    <img id="details-img" src=${item.imageUrl} alt="example1" />
    <p id="details-category">${item.category}</p>
    <div id="info-wrapper">
        <div id="details-description">
            <p id="description">
            ${item.description}
            </p>
            <p id="more-info">
            ${item.moreInfo}
            </p>
        </div>
        <h3>Likes:<span id="likes">0</span></h3>
        ${isOwner
        ? html`
        <div id="action-buttons">
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a href="/delete/${item._id}" id="delete-btn">Delete</a>
        </div>
            `
        : nothing}

        ${isLogged && !isOwner
        ? html`
                <div id="action-buttons">
        <a href="/like/${item._id}" id="like-btn">Like</a>
        </div>

        `
        : nothing}
                    </div>
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
