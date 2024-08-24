export class Post {
    postId?: number;
    status: string = '';
    userName: string = '';
    createdAt: Date = new Date();
    isEdited: boolean = false;
    userId?: number;
}
