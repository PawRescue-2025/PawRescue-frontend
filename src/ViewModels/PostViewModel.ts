import { PostType } from "../Enums/PostType";
import { ActivityStatus } from "../Enums/ActivityStatus";
import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS } from "../config/constants";
import FileViewModel from "./FIleViewModel";

export default class PostViewModel extends BaseViewModel {
    constructor() {
        super(API_ENDPOINTS.POST);
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
        photos: File[] = [],
        eventDate: Date = new Date(),
        contactPhone: string = "",
        contactEmail: string = "",
        contactLink: string = "",
        location: string = "",
    ): Promise<any> {
        const photos_url = []
        const fileVM = new FileViewModel();
        for (const photo of photos) {
            const url = await fileVM.uploadFile(photo);
            photos_url.push(url);
        }

        const body = {
            userId,
            postType,
            eventDate,
            title,
            content,
            status: 0, // EntityStatus.Active
            location,
            contactPhone,
            contactEmail,
            contactLink,
            photos: photos_url,
        };
        return await this.post(body);
    }

    //editPost(postId, eventDate (O), content, contactPhone (O), contactEmail (O), contactLink (O), location (O)) -> Post
    //функція для редагування поста
    async editPost(
        postId: number,
        content: string,
        eventDate: Date | null = null,
        contactPhone: string | null = null,
        contactEmail: string | null = null,
        contactLink: string | null = null,
        location: string | null = null
    ): Promise<any> {
        const params = { content, eventDate, contactPhone, contactEmail, contactLink, location };
        const updates = Object.fromEntries(
            Object.entries(params).filter(([, value]) => value != null)
        );
        const body = { id: postId, ...updates };
        return await this.put(body);
    }

    //editHelpRequestStatus(postId) -> Post
    //функція для зміни статусу виконання постів з типом допомога (користувачем)
    //toggle isHelpRequestCompleted
    async editHelpRequestStatus(postId: number): Promise<any> {
        return await this.patch(undefined, `/${postId}`);
    }

    //editPostStatus(postId, status) -> Post
    //функція для зміни статусу (модератор)
    async editPostStatus(postId: number, status: ActivityStatus): Promise<any> {
        const body = { id: postId, status };
        return await this.patch(body);
    }

    //deletePost(postId)
    //функція видалення поста
    // - при видаленні викликаємо editPostStatus(postId, status=deleted)
    // - deletionDate = NOW
    async deletePost(postId: number): Promise<any> {
        return await this.delete(`/${postId}`);
    }

    //getAllPosts() -> [Post]
    //функція повертає найновіші «усі» active пости
    // * реалізувати пагінацію, щоб не вивантажувати 100-500 постів за раз
    async getAllPosts(page: number = 1, limit: number = 30): Promise<any> {
        // TODO: пагінація не реалізована в Swagger. Досі не реалізвано...
        // повертаються вже відсортовані лише активні
        return await this.get();
    }

    //getPostById(postId) -> Post
    //функція, що повертає пост за id
    async getPostById(postId: number): Promise<any> {
        return await this.get(`/${postId}`);
    }

    //getPostsByUser(userId) -> [Post]
    //функція, що повертає всі пости користувача зі статусом Active
    async getPostsByUser(userId: string): Promise<any> {
        return await this.get(`/user/${userId}`);
    }
}
