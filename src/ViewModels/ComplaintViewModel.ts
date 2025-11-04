import {ComplaintCategory} from "../Enums/ComplaintCategory";

export default class ComplaintViewModel {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    //addComplaint(complainantId, userId (O), postId (O), commentId (O), category, description (O)) -> Complaint
    //функція створення скарги
    // - creationDate = NOW
    // - status = active
    // - одне з userId, postId або commentId має бути обов’язково (перевірка на фронті)
    async addComplaint(
        complainantId: string,
        category: ComplaintCategory,
        userId?: string | null,
        postId?: number | null,
        commentId?: number | null,
        description?: string | null
    ): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //editComplaintStatus(complaintId, status) -> Complaint
    //функція редагування статусу (модератор)
    async editComplaintStatus(complaintId: number, status: string): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //deleteComplaint(complaintId)
    //функція видалення скарги
    async deleteComplaint(complaintId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getAllComplaints() -> [Complaint]
    //функція повертає усі скарги (для модератора)
    async getAllComplaints(): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getComplaintById(complaintId) -> Complaint
    //функція повертає дані про скаргу
    async getComplaintById(complaintId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }
}
