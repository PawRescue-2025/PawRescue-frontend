export default class UserViewModel {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
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
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //deleteUser(userId)
    //функція видалення користувача
    // - при видаленні викликаємо editUserStatus(userId, status=deleted)
    // - deletionDate – NOW
    // * запитати за зміну дати видалення
    async deleteUser(userId: string): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //editUserStatus(userId, status) -> User
    //функція для редагування статусу (модератор)
    async editUserStatus(userId: string, status: string): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getUserById(userId) -> User
    //функція для отримання користувача
    async getUserById(userId: string): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getUserPointsNumber(userId) -> Int
    //функція, що повертає загальну кількість балів користувача, тобто збирає всі Points за recipientId = userId і SUM points
    async getUserPointsNumber(userId: string): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getUserVerificationStatus(userId) -> VerificationStatus
    //функція, що повертає статус верифікації користувача
    async getUserVerificationStatus(userId: string): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }
}
