export interface User {
    user: {
        bio: any;
        createdAt: string;
        email: string;
        id: number;
        image: string;
        token: string;
        updatedAt: string;
        username: string;
    }
}

export interface Author {
    bio: any;
    following: boolean;
    image: string;
    username: string;
}

export interface ArticleItem {
    author: Author;
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
    title: string;
    updatedAt: string;
}

export interface Article {
    article: ArticleItem
}



export interface Articles {
    articles: ArticleItem[];
    articlesCount: number;
}

export interface CommentItem {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Author;
}

export interface Comment {
    comment: CommentItem;
}

export interface Comments {
    comments: CommentItem[];
}

export interface Tag {
    tags: string[];
}
