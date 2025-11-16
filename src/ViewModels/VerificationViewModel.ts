import { VerificationStatus } from "../Enums/VerificationStatus";
import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS } from "../config/constants";

export default class VerificationViewModel extends BaseViewModel {
    constructor() {
        super(API_ENDPOINTS.VERIFICATION);
    }

    //getAllVerifications() -> [Verification]
    //функція повертає усі запити на верифікацію
    async getAllVerifications(): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getVerificationById(verificationId) -> Verification
    //функція повертає дані про запит на верифікацію
    async getVerificationById(verificationId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //editVerificationStatus(verificationId, status) -> Verification
    //функція для оновлення статусу верифікації
    async editVerificationStatus(verificationId: number, status: VerificationStatus): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }
}
