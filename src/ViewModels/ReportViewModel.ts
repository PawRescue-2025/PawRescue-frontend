import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS } from "../config/constants";
import FileViewModel from "./FIleViewModel";

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
        photos: File[] | null = [],
        documents: File[] | null = []
    ): Promise<any> {
        const fileVM = new FileViewModel();
        const photos_url = [];
        const documents_url = [];
        if (photos) {
            for (const photo of photos) {
                const url = await fileVM.uploadFile(photo);
                photos_url.push(url);
            }
        }
        if (documents) {
            for (const document of documents) {
                const url = await fileVM.uploadFile(document);
                documents_url.push(url);
            }
        }
        const body = {
            postId,
            text,
            photos: photos_url,
            documents: documents_url
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
