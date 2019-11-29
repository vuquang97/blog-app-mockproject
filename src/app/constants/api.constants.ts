const _URL = 'https://conduit.productionready.io/api';

export const LOGIN = {
    login: _URL + '/users/login'
};

export const USER = {
    registerUser: _URL + '/users',
    getCurrentUser: _URL + '/user',
    updateUser: _URL + '/user',
    getProfile: _URL + '/profiles',
}

export const ARTICLE = {
    getArticles : _URL + '/articles',
    getFeedArticles: _URL + '/articles/feed',
    getArticle: _URL + '/articles',
    createArticle: _URL + '/articles',
    updateArticle: _URL + '/articles',
    deleteArticle: _URL + '/articles'
}

export const COMMENT = {
    getComments: _URL + '/articles',
    deleteComment: _URL + '/articles',
}

export const TAG = {
    getTags: _URL + '/tags'
}

export const ACTION = {
    followUser: _URL + '/profiles',
    unFollowUser: _URL + '/profiles',
    favoriteArticle: _URL + '/articles',
    unFavoriteArticle: _URL + '/articles'
}