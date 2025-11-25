import { VerificationStatus } from "../Enums/VerificationStatus";
import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS } from "../config/constants";
import FileViewModel from "./FIleViewModel";

export default class VerificationViewModel extends BaseViewModel {
    constructor() {
        super(API_ENDPOINTS.VERIFICATION);
    }
    //getAllVerifications() -> [Verification]
    //функція повертає усі запити на верифікацію
    async getAllVerifications(): Promise<any> {
        return await this.get();
    }

    //getVerificationById(verificationId) -> Verification
    //функція повертає дані про запит на верифікацію
    async getVerificationById(verificationId: number): Promise<any> {
        return await this.get(`/${verificationId}`);
    }

    //editVerificationStatus(verificationId, status) -> Verification
    //функція для оновлення статусу верифікації
    async editVerificationStatus(verificationId: number, status: VerificationStatus): Promise<any> {
        const body = { id: verificationId, status };
        return await this.patch(body);
    }

    async addVerificationRequest(
        userId: string,
        documents: File[]
    ): Promise<any> {
        const fileVM = new FileViewModel();
        const docUrls = [];
        for (const documentFile of documents) {
            const docUrl = await fileVM.uploadFile(documentFile!);
            docUrls.push(docUrl);
        }
        const body = {
            userId,
            documents: docUrls,
            status: VerificationStatus.Pending
        };
        return await this.post(body);
    }
}
