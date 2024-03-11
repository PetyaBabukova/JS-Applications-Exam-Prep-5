import page from '../node_modules/page/page.mjs';

import { authMiddleware } from './middlewares/authMiddleware.js';
import { renderNavigationMiddleware } from "./middlewares/renderNavigationMiddleware.js";
import { renderContentMiddleware } from './middlewares/renderContentMiddleware.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { logout } from './views/logout.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { deleteView } from './views/delete.js';
// import { searchView } from './views/search.js';

page(authMiddleware)
page(renderNavigationMiddleware);
page(renderContentMiddleware);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logout);
page('/catalog', catalogView);
page('/create', createView);
page('/details/:itemId', detailsView)
page('/edit/:itemId', editView);
page('/delete/:itemId', deleteView);
// page('/search', searchView)

page.start()