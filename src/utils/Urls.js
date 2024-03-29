export const ClientUrls = {
    'home': '/',
    'stats': '/stats',
    'bookmarks': '/bookmarks',
    'publish': '/publish/:id',
    'profile': '/profile/edit',
    'view': '/:user/:id/:title',
    'userView': '/:id',
    'comments': '/:blogId/comments',
    'search': '/search/:query',
    'publishBlog': '/publish/:id/save'
};

export const ServerUrl = {
    'signUp': '/api/signup',
    'signIn': '/api/login',
    'logout': '/api/logout',
    'getUser': '/api/user',
    'updateUser': '/api/update',
    'upload': '/api/utils/upload',
    'getUserById': '/api/getUserById?id=',
    'googleLogin': '/api/google',
    'saveToDraft': '/api/blogs/draft',
    'getDraft': '/api/blogs/draft?id=',
    'deleteDraft': '/api/blogs/deleteDraft?id=',
    'getDrafts':'/api/blogs/drafts?skip=',
    'getUsers': '/api/users'
}

export const urlMapper = (obj, url) => {
    let newUrl = url;
    Object.entries(obj).forEach(([key,value])=>{
        value = value.split(' ').join('-');
        newUrl = newUrl.replace(':'+key,value);
    });
    return newUrl;
}
