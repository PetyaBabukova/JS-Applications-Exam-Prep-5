import { html } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';
import { itemTemplate } from './templates/item.js'

const catalogTemplate = (items, user) => html`
<h2>Fun Facts</h2>

${items.length > 0
        ? html`
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${items.map(item => itemTemplate(item, user))}
        </section>`
        : html`
    <h2>No Fun Facts yet.</h2>
    `}
`;
    
export const catalogView = (ctx) => {
    catalogService.getAll()
        .then(items => {
            ctx.render(catalogTemplate(items, ctx.user))
        })
}
