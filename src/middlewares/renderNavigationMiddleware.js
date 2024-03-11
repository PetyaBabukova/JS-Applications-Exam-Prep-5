import { render } from '../../node_modules/lit-html/lit-html.js';
import { navigationView } from '../views/navigation.js';

export const renderNavigationMiddleware = (ctx, next) => {
    const headerElement = document.querySelector('.header-navigation'); // Moved inside the function
    render(navigationView(ctx), headerElement);
    next();
};
