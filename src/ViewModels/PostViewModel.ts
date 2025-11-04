import {PostType} from "../Enums/PostType";
import {ActivityStatus} from "../Enums/ActivityStatus";

export default class PostViewModel {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    //addPost(userId, postType, eventDate (O), title, content, photos [File] (O), contactPhone (O), contactEmail (O), contactLink (O), location (O)) -> Post
    //функція для створення поста
    // - якщо postType = financialHelp/materialHelp/volunteerHelp -> isHelpRequestCompleted = FALSE
    // - інакше -> NULL
    // - status = active
    // - creationDate = NOW
    // - deletionDate = NULL
    async addPost(
        userId: string,
        postType: PostType,
        title: string,
        content: string,
        photos?: File[] | null,
        eventDate?: Date,
        contactPhone?: string | null,
        contactEmail?: string | null,
        contactLink?: string | null,
        location?: string | null
    ): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //editPost(postId, eventDate (O), content, contactPhone (O), contactEmail (O), contactLink (O), location (O)) -> Post
    //функція для редагування поста
    async editPost(
        postId: number,
        content: string,
        eventDate?: Date,
        contactPhone?: string | null,
        contactEmail?: string | null,
        contactLink?: string | null,
        location?: string | null
    ): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //editHelpRequestStatus(postId) -> Post
    //функція для зміни статусу виконання постів з типом допомога (користувачем)
    //toggle isHelpRequestCompleted
    async editHelpRequestStatus(postId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //editPostStatus(postId, status) -> Post
    //функція для зміни статусу (модератор)
    async editPostStatus(postId: number, status: ActivityStatus): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //deletePost(postId)
    //функція видалення поста
    // - при видаленні викликаємо editPostStatus(postId, status=deleted)
    // - deletionDate = NOW
    async deletePost(postId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getAllPosts() -> [Post]
    //функція повертає найновіші «усі» active пости
    // * реалізувати пагінацію, щоб не вивантажувати 100-500 постів за раз
    async getAllPosts(page: number = 1, limit: number = 30): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getPostById(postId) -> Post
    //функція, що повертає пост за id
    async getPostById(postId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getPostsByUser(userId) -> [Post]
    //функція, що повертає всі пости користувача зі статусом Active
    async getPostsByUser(userId: string): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }
}
