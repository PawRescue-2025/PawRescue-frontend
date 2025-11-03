class UserViewModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    //editUser(userId, email, password, fullName, photo (O), description (O), phoneNumber) -> User
    //функція для редагування користувача, не можна змінити тип, статус редагується окремою функцією
    async editUser(userId, email, password, fullName, photo, description, phoneNumber) {

    }

    //deleteUser(userId)
    //функція видалення користувача
    // - при видаленні викликаємо editUserStatus(userId, status=deleted)
    // - deletionDate – NOW
    // * запитати за зміну дати видалення
    async deleteUser(userId) {

    }

    //editUserStatus(userId, status) -> User
    //функція для редагування статусу (модератор)
    async editUserStatus(userId, status) {

    }

    //getUserById(userId) -> User
    //функція для отримання користувача
    async getUserById(userId) {

    }

    //getUserPointsNumber(userId) -> Int
    //функція, що повертає загальну кількість балів користувача, тобто збирає всі Points за recipientId = userId і SUM points
    async getUserPointsNumber(userId) {

    }

    //getUserVerificationStatus(userId) -> VerificationStatus
    //функція, що повертає статус верифікації користувача
    async getUserVerificationStatus(userId) {

    }

}
export default UserViewModel;
