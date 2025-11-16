import { ActivityStatus } from "../Enums/ActivityStatus";
import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS } from "../config/constants";

export default class CommentViewModel extends BaseViewModel {
    constructor() {
        super(API_ENDPOINTS.COMMENT);
    }

    //addComment(postId, authorId, content) -> Comment
    //функція для додавання коментаря
    // - status = active
    // - creationDate = NOW
    // - deletionDate = NULL
    async addComment(postId: number, authorId: string, content: string): Promise<any> {
        const body = { postId, authorId, content };
        return await this.post(body);
    }

    //editCommentStatus(commentId, status) -> Comment
    //функція для редагування статусу коментаря (модератор)
    async editCommentStatus(commentId: number, status: ActivityStatus): Promise<any> {
        const body = { id: commentId, status };
        return await this.patch(body);
    }

    //deleteComment(commentId)
    //функція для видалення коментаря
    // - при видаленні викликаємо editCommentStatus(commentId, status=deleted)
    // - deletionDate = NOW
    async deleteComment(commentId: number): Promise<any> {
        return await this.delete(`/${commentId}`);
    }

    //getCommentById(commentId) -> Comment
    //функція повертає дані про коментар
    async getCommentById(commentId: number): Promise<any> {
        return await this.get(`/${commentId}`);
    }

    //getCommentsByPost(postId) -> [Comment]
    //функція для пошуку коментарів за постом
    async getCommentsByPost(postId: number): Promise<any> {
        return await this.get(`/post/${postId}`);
    }
}
