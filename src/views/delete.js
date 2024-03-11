import * as catalogService from '../services/catalogService.js';

export const deleteView = (ctx) => {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
        catalogService.remove(ctx.params.itemId)
            .then(() => {
                alert('Item deleted successfully.');
                ctx.page.redirect('/catalog');
            })
            .catch(err => alert(err.message || 'Error deleting the item.'));
    }
};