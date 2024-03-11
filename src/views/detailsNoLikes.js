import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as catalogService from '../services/catalogService.js';

let isOwner = false;

const detailsTemplate = (character, isOwner, isLogged) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${character.imageUrl} alt="example1" />
        <div>
            <p id="details-category">${character.category}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p id="description">${character.description}</p>
                    <p id="more-info">${character.moreInfo}</p>
                </div>
            </div>
            <h3>Is This Useful:<span id="likes">0</span></h3>

            <!-- Action buttons for the creator -->
            ${isOwner
        ? html`
            <div id="action-buttons">
                <a href="/edit/${character._id}" id="edit-btn">Edit</a>
                <a href="/delete/${character._id}" id="delete-btn">Delete</a>
            </div>
            `  
        : nothing}

        <!-- "Like" button for logged-in users who are not the owner -->
        ${isLogged && !isOwner 
            ? html`
                <div id="action-buttons">
                    <a href="/like/${character._id}" id="like-btn">Like</a>
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
            isOwner = Boolean(character._ownerId == ctx.user?._id)
           
            ctx.render(detailsTemplate(character, isOwner, ctx.user))
        })
}