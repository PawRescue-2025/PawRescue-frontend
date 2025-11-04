import {UserType} from "../Enums/UserType";

export default class AuthViewModel {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    //logIn(email, password) -> User
    //функція для логіну користувачів
    // - логінитись можуть лише користувачі з status = active
    async logIn(email: string, password: string): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //logout(userId)
    //функція для виходу з акаунта
    async logout(userId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //signUpUnverified(email, password, fullName, photo (O), description (O), phoneNumber)
    //функція для реєстрації користувача типу caring
    // - userType = caring
    // - status = active
    // - deletionDate = NULL
    // - registrationDate = NOW (на рівні БД чи бекенду)
    async signUpUnverified(
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

    //signUpVerified(email, password, fullName, photo (O), description (O), phoneNumber, userType, documents [File])
    //функція для реєстрації користувача типу volunteer або shelterOwner
    // - status = active
    // - deletionDate = NULL
    // - registrationDate = NOW (на рівні БД чи бекенду)
    // * під час реєстрації створюється об’єкт Verification, прив’язаний до користувача, зі status = notVerified
    async signUpVerified(
        email: string,
        password: string,
        fullName: string,
        phoneNumber: string,
        userType: UserType,
        documents: File[],
        photo?: File | null,
        description?: string | null
    ): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }
}
