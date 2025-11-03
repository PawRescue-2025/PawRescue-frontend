class CommentViewModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    //addComment(postId, authorId, content) -> Comment
    //функція для додавання коментаря
    // - status = active
    // - creationDate = NOW
    // - deletionDate = NULL
    async addComment(postId, authorId, content) {

    }

    //editCommentStatus(commentId, status) -> Comment
    //функція для редагування статусу коментаря (модератор)
    async editCommentStatus(commentId, status) {

    }

    //deleteComment(commentId)
    //функція для видалення коментаря
    // - при видаленні викликаємо editCommentStatus(commentId, status=deleted)
    // - deletionDate = NOW
    async deleteComment(commentId) {

    }

    //getCommentById(commentId) -> Comment
    //функція повертає дані про коментар
    async getCommentById(commentId) {

    }

    //getCommentsByPost(postId) -> [Comment]
    //функція для пошуку коментарів за постом
    async getCommentsByPost(postId) {

    }

}
export default CommentViewModel;
