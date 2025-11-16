import { ActivityStatus } from "../Enums/ActivityStatus";
import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS } from "../config/constants";

export default class UserViewModel extends BaseViewModel {
    constructor() {
        super(API_ENDPOINTS.USER);
    }
    //editUser(userId, email, password, fullName, photo (O), description (O), phoneNumber) -> User
    //функція для редагування користувача, не можна змінити тип, статус редагується окремою функцією
    async editUser(
        userId: string,
        email: string,
        password: string,
        fullName: string,
        phoneNumber: string,
        photo?: File | null,
        description?: string | null
    ): Promise<any> {
        const body = {
            id: userId,
            email,
            password,
            fullName,
            phoneNumber,
            photo: null, // TODO: обробка файлів
            description
        };
        return await this.put(body);
    }

    //deleteUser(userId)
    //функція видалення користувача
    // - при видаленні викликаємо editUserStatus(userId, status=deleted)
    // - deletionDate – NOW
    // * запитати за зміну дати видалення
    async deleteUser(userId: string): Promise<any> {
        return await this.delete(`/${userId}`);
    }

    //editUserStatus(userId, status) -> User
    //функція для редагування статусу (модератор)
    async editUserStatus(userId: string, status: ActivityStatus): Promise<any> {
        const body = { id: userId, status };
        return await this.put(body, "/status");
    }

    //getUserById(userId) -> User
    //функція для отримання користувача
    async getUserById(userId: string): Promise<any> {
        return await this.get(`/${userId}`);
    }

    //getUserPointsNumber(userId) -> Int
    //функція, що повертає загальну кількість балів користувача, тобто збирає всі Points за recipientId = userId і SUM points
    async getUserPointsNumber(userId: string): Promise<any> {
        return await this.get(`/point/${userId}`);
    }

    //getUserVerificationStatus(userId) -> VerificationStatus
    //функція, що повертає статус верифікації користувача
    async getUserVerificationStatus(userId: string): Promise<any> {
        return await this.get(`/verification-status/${userId}`);
    }
}
