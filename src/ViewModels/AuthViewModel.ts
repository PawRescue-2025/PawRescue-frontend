import { UserType } from "../Enums/UserType";
import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS, DEFAULT_PROFILE_PICTURE_URL } from "../config/constants";
import FileViewModel from "./FIleViewModel";
import VerificationViewModel from "./VerificationViewModel";

export default class AuthViewModel extends BaseViewModel {
    constructor() {
        super(API_ENDPOINTS.AUTH);
    }

    //logIn(email, password) -> User
    //функція для логіну користувачів
    // - логінитись можуть лише користувачі з status = active
    async logIn(email: string, password: string): Promise<any> {
        const body = { email, password };
        const data = await this.post(body, "/login");
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("userId", data.user.userId);
        localStorage.setItem("status", data.status);
        return data;
    }

    //logout(userId)
    //функція для виходу з акаунта
    async logout(userId: string): Promise<any> {
        localStorage.removeItem("token");
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
        const fileVM = new FileViewModel();
        const photo_url = photo ? await fileVM.uploadFile(photo!) : DEFAULT_PROFILE_PICTURE_URL;
        const body = {
            userName: email,
            email,
            password,
            fullName,
            phoneNumber,
            description: description || null,
            photo: photo_url,
            role: 0 // UserRole.Caring
        };
        return await this.post(body, "/register");
    }

    //signUpVerified(email, password, fullName, photo (O), description (O), phoneNumber, userType, documents [File])
    //функція для реєстрації користувача типу volunteer або shelterOwner
    // - status = active
    // - deletionDate = NULL
    // - registrationDate = NOW (на рівні БД чи бекенду)
    // * під час реєстрації створюється об'єкт Verification, прив'язаний до користувача, зі status = notVerified
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
        const fileVM = new FileViewModel();
        const photo_url = photo ? await fileVM.uploadFile(photo!) : DEFAULT_PROFILE_PICTURE_URL;
        
        const body = {
            userName: email,
            email,
            password,
            fullName,
            phoneNumber,
            description: description || null,
            photo: photo_url,
            role: userType // 1 = Volunteer, 2 = ShelterOwner
        };

        await this.post(body, "/register");

        const data = await this.logIn(email, password);

        const verificationVM = new VerificationViewModel();
        await verificationVM.addVerificationRequest(data.user.userId, documents);

        return data;
    }
}
