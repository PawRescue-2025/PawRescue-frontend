import {VerificationStatus} from "../Enums/VerificationStatus";

export default class VerificationViewModel {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
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
