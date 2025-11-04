import {ActivityStatus} from "../Enums/ActivityStatus";

export default class CommentViewModel {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    //addComment(postId, authorId, content) -> Comment
    //функція для додавання коментаря
    // - status = active
    // - creationDate = NOW
    // - deletionDate = NULL
    async addComment(postId: number, authorId: string, content: string): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //editCommentStatus(commentId, status) -> Comment
    //функція для редагування статусу коментаря (модератор)
    async editCommentStatus(commentId: number, status: ActivityStatus): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //deleteComment(commentId)
    //функція для видалення коментаря
    // - при видаленні викликаємо editCommentStatus(commentId, status=deleted)
    // - deletionDate = NOW
    async deleteComment(commentId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getCommentById(commentId) -> Comment
    //функція повертає дані про коментар
    async getCommentById(commentId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getCommentsByPost(postId) -> [Comment]
    //функція для пошуку коментарів за постом
    async getCommentsByPost(postId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }
}
