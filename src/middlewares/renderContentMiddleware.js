import { render } from '../../node_modules/lit-html/lit-html.js';

export const renderContentMiddleware = (ctx, next) => {
    const contentElement = document.querySelector('#main'); // Ensure this matches your HTML and moved inside the function

    const renderContent = (templateResult) => {
        render(templateResult, contentElement);
    };

    ctx.render = renderContent;
    next();
};
