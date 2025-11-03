class ReportViewModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    //addReport(postId, text (O), photos [File] (O), documents [File] (O)) -> Report
    //функція для додавання звіту
    // - creationDate = NOW
    async addReport(postId, text, photos, documents) {

    }

    //deleteReport(postId)
    //функція для видалення звіту
    // - просто одразу видалення з бази даних
    async deleteReport(postId) {

    }

    //getReportById(reportId) -> Report
    //функція повертає дані про звіт
    async getReportById(reportId) {

    }

}
export default ReportViewModel;
