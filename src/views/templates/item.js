import { html } from '../../../node_modules/lit-html/lit-html.js';

export const itemTemplate = (item) => html`
    <div class="event">
        <img src=${item.imageUrl} alt="example1" />
        <p class="title">
            ${item.name}
        </p>
        <p class="date">${item.date}</p>
        <a class="details-btn" href="/details/${item._id}">Details</a>
    </div>
`;