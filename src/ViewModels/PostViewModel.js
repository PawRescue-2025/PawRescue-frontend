class PostViewModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    //addPost(userId, postType, eventDate (O), title, content, photos [File] (O), contactPhone (O), contactEmail (O), contactLink (O), location (O)) -> Post
    //функція для створення поста
    // - якщо postType = financialHelp/materialHelp/volunteerHelp -> isHelpRequestCompleted = FALSE
    // - інакше -> NULL
    // - status = active
    // - creationDate = NOW
    // - deletionDate = NULL
    async addPost(userId, postType, eventDate, title, content, photos, contactPhone, contactEmail, contactLink, location) {

    }

    //editPost(postId, eventDate (O), content, contactPhone (O), contactEmail (O), contactLink (O), location (O)) -> Post
    //функція для редагування поста
    async editPost(postId, eventDate, content, contactPhone, contactEmail, contactLink, location) {

    }

    //editHelpRequestStatus(postId) -> Post
    //функція для зміни статусу виконання постів з типом допомога (користувачем)
    //toggle isHelpRequestCompleted
    async editHelpRequestStatus(postId) {

    }

    //editPostStatus(postId, status) -> Post
    //функція для зміни статусу (модератор)
    async editPostStatus(postId, status) {

    }

    //deletePost(postId)
    //функція видалення поста
    // - при видаленні викликаємо editPostStatus(postId, status=deleted)
    // - deletionDate = NOW
    async deletePost(postId) {

    }

    //getAllPosts() -> [Post]
    //функція повертає найновіші «усі» active пости
    // * реалізувати пагінацію, щоб не вивантажувати 100-500 постів за раз
    async getAllPosts(page = 1, limit = 20) {

    }

    //getPostById(postId) -> Post
    //функція, що повертає пост за id
    async getPostById(postId) {

    }

    //getPostsByUser(userId) -> [Post]
    //функція, що повертає всі пости користувача зі статусом Active
    async getPostsByUser(userId) {

    }

}
export default PostViewModel;
