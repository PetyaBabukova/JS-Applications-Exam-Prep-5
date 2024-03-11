import { html } from '../../../node_modules/lit-html/lit-html.js';

export const itemTemplate = (item) => html`
    <section id="dashboard">
        <div class="fact">
            <img src=${item.imageUrl} alt="example1" />
            <h3 class="category">${item.category}</h3>
            <p class="description">${item.description}</p>
            <a class="details-btn" href="/details/${item._id}">More Info</a>
        </div>
    </section>
`;