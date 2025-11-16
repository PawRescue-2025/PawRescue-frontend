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
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //deleteReport(postId)
    //функція для видалення звіту
    // - просто одразу видалення з бази даних
    async deleteReport(postId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getReportById(reportId) -> Report
    //функція повертає дані про звіт
    async getReportById(reportId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }
}
