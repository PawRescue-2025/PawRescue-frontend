import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS } from "../config/constants";

export default class ReportViewModel extends BaseViewModel {
    constructor() {
        super(API_ENDPOINTS.REPORT);
    }

    //addReport(postId, text (O), photos [File] (O), documents [File] (O)) -> Report
    //функція для додавання звіту
    // - creationDate = NOW
    async addReport(
        postId: number,
        text?: string | null,
        photos?: File[] | null,
        documents?: File[] | null
    ): Promise<any> {
        const body = {
            postId,
            text,
            photos: null, // TODO: обробка файлів
            documents: null // TODO: обробка файлів
        };
        return await this.post(body);
    }

    //deleteReport(postId)
    //функція для видалення звіту
    // - просто одразу видалення з бази даних
    async deleteReport(postId: number): Promise<any> {
        return await this.delete(`/${postId}`);
    }

    //getReportById(reportId) -> Report
    //функція повертає дані про звіт
    async getReportById(reportId: number): Promise<any> {
        return await this.get(`/${reportId}`);
    }
}
