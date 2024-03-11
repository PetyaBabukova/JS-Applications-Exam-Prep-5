import { html } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';

const searchTemplate = (submitHandler, result) => html`
    <section id="search">
      <div class="form">
        <h4>Search</h4>
        <form @submit=${submitHandler} class="search-form">
          <input type="text" name="search" id="search-input" />
          <button class="button-list">Search</button>
        </form>
      </div>
      <div class="search-result">
        ${result.length > 0
          ? result.map(x => html`
            <div class="car">
              <img src=${x.imageUrl} alt="example1"/>
              <h3 class="model">${x.model}</h3>
              <a class="details-btn" href="/details/${x._id}">More Info</a>
            </div>
          `)
          : html`<h2 class="no-available">No result.</h2>`
        }
      </div>
    </section>
`;

export const searchView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault(); // Prevents form from submitting traditionally
        const searchedItem = document.getElementById('search-input').value;

        if (searchedItem.trim() === '') {
            alert('Please enter the model you search');
            return;
        }

        catalogService.search(searchedItem)
            .then(result => {
                ctx.render(searchTemplate(submitHandler, result));
            });
    };

    ctx.render(searchTemplate(submitHandler, [])); // Initial render with empty results
};
