export const ClientUrls = {
    'home': '/',
    'stats': '/stats',
    'bookmarks': '/bookmarks',
    'publish': '/publish',
    'profile': '/profile/edit',
    'view': '/:user/:id/:title',
    'userView': '/:user',
    'comments': '/:blogId/comments',
    'search': '/search/:query'
};

export const ServerUrl = {
    'signUp': '/api/signup'
}

export const urlMapper = (obj, url) => {
    let newUrl = url;
    Object.entries(obj).forEach(([key,value])=>{
        value = value.split(' ').join('-');
        newUrl = newUrl.replace(':'+key,value);
    });
    return newUrl;
}