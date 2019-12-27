export const ClientUrls = {
    'home': '/',
    'stats': '/stats',
    'bookmarks': '/bookmarks',
    'publish': '/publish',
    'profile': '/profile',
    'view': '/:user/:id/:title',
    'userView': '/:user',
};

export const urlMapper = (obj, url) => {
    let newUrl = url;
    Object.entries(obj).forEach(([key,value])=>{
        value = value.split(' ').join('-');
        newUrl = newUrl.replace(':'+key,value);
    });
    return newUrl;
}