class AuthViewModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    //logIn(email, password) -> User
    //функція для логіну користувачів
    // - логінитись можуть лише користувачі з status = active
    async logIn(email, password) {

    }

    //logout(userId)
    //функція для виходу з акаунта
    async logout(userId) {

    }

    //signUpUnverified(email, password, fullName, photo (O), description (O), phoneNumber)
    //функція для реєстрації користувача типу caring
    // - userType = caring
    // - status = active
    // - deletionDate = NULL
    // - registrationDate = NOW (на рівні БД чи бекенду)
    async signUpUnverified(email, password, fullName, photo, description, phoneNumber) {

    }

    //signUpVerified(email, password, fullName, photo (O), description (O), phoneNumber, userType, documents [File])
    //функція для реєстрації користувача типу volunteer або shelterOwner
    // - status = active
    // - deletionDate = NULL
    // - registrationDate = NOW (на рівні БД чи бекенду)
    // * під час реєстрації створюється об’єкт Verification, прив’язаний до користувача, зі status = notVerified
    async signUpVerified(email, password, fullName, photo, description, phoneNumber, userType, documents) {

    }

}
export default AuthViewModel;
