// import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
// import * as catalogService from '../services/catalogService.js';

// const detailsTemplate = (item, isOwner, isLogged) => html`
//         <section id="details">
//             <div id="details-wrapper">
//                 <img id="details-img" src=${item.imageUrl} alt="example1" />
//                 <p id="details-title">${item.name}</p>
//                 <p id="details-category">
//                     Category: <span id="categories">${item.category}</span>
//                 </p>
//                 <p id="details-date">
//                     Date:<span id="date">${item.date}</span></p>
//                 <div id="info-wrapper">
//                     <div id="details-description">
//                         <span>${item.description}</span>
//                     </div>
//              </div>
//              <h3>Going: <span id="go">0</span> times.</h3>
//         ${isOwner
//         ? html`
//         <div id="action-buttons">
//             <a href="/edit/${item._id}" id="edit-btn">Edit</a>
//             <a href="/delete/${item._id}" id="delete-btn">Delete</a>
//         </div>
//             `
//         : nothing}

//         ${isLogged && !isOwner
//         ? html`
//             <div id="action-buttons">
//                 <a href="" id="go-btn">Going</a>
//             </div>
//         `
//         : nothing}
//                 </div>
//             </section>
// `;

// export const detailsView = (ctx) => {
//     catalogService.getOne(ctx.params.itemId)
//         .then(character => {
//             const isOwner = Boolean(character._ownerId == ctx.user?._id);

//             ctx.render(detailsTemplate(character, isOwner, ctx.user));
//         })
// }


import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';

// Pass ctx as a parameter to detailsTemplate
const detailsTemplate = (item, isOwner, isLogged, canGo, goCount, ctx) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${item.imageUrl} alt="example1" />
        <p id="details-title">${item.name}</p>
        <p id="details-category">
            Category: <span id="categories">${item.category}</span>
        </p>
        <p id="details-date">
            Date:<span id="date">${item.date}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <span>${item.description}</span>
            </div>
        </div>
        <h3>Going: <span id="go">${goCount}</span> times.</h3>
        <div id="action-buttons">
        ${isOwner 
            ? html`
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a href="/delete/${item._id}" id="delete-btn">Delete</a>
        ` : nothing}
        ${isLogged && !isOwner && canGo ? html`
            <a href="javascript:void(0)" id="go-btn" @click=${(e) => ctx.onGo(e)}>Going</a>

            ` : nothing}
        </div>
    </div>
</section>
`;

export const detailsView = (ctx) => {
    let goCount = 0;
    let canGo = true;

    catalogService.getOne(ctx.params.itemId)
        .then(item => {
            const isOwner = item._ownerId === ctx.user?._id;
            const isLogged = !!ctx.user;

            if (ctx.user) {
                catalogService.getTotalGoes(item._id).then(total => {
                    goCount = total;

                    catalogService.didUserGo(item._id, ctx.user._id)
                        .then(didGo => {
                            canGo = !didGo;
                            // Pass ctx here
                            ctx.render(detailsTemplate(item, isOwner, isLogged, canGo, goCount, ctx));
                        });
                });
            } else {
                // And also pass ctx here
                ctx.render(detailsTemplate(item, isOwner, isLogged, canGo, goCount, ctx));
            }
        });

        ctx.onGo = (e) => {
            e.preventDefault();
            catalogService.go(ctx.params.itemId).then(() => {
                // Increment go count and disable the Going button
                goCount += 1;
                canGo = false;
                catalogService.getOne(ctx.params.itemId).then(item => {
                    const isOwner = item._ownerId === ctx.user?._id;
                    // Remember to pass ctx here as well
                    ctx.render(detailsTemplate(item, isOwner, !!ctx.user, canGo, goCount, ctx));
                });
            });
        };
        
};
