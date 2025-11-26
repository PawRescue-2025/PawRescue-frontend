import { ComplaintCategory } from "../Enums/ComplaintCategory";
import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS } from "../config/constants";
import { ComplaintStatus } from "../Enums/ComplaintStatus";

export default class ComplaintViewModel extends BaseViewModel {
    constructor() {
        super(API_ENDPOINTS.COMPLAINT);
    }

    //addComplaint(complainantId, userId (O), postId (O), commentId (O), category, description (O)) -> Complaint
    //функція створення скарги
    // - creationDate = NOW
    // - status = active
    // - одне з userId, postId або commentId має бути обов'язково (перевірка на фронті)
    async addComplaint(
        complainantId: string,
        category: ComplaintCategory,
        userId?: string | null,
        postId?: number | null,
        commentId?: number | null,
        description?: string | null
    ): Promise<any> {
        const body = {
            complainantId,
            userId,
            postId,
            commentId,
            category,
            description
        };
        return await this.post(body);
    }

    //editComplaintStatus(complaintId, status) -> Complaint
    //функція редагування статусу (модератор)
    async editComplaintStatus(complaintId: number, status: ComplaintStatus): Promise<any> {
        const body = { id: complaintId, status };
        return await this.patch(body);
    }

    //deleteComplaint(complaintId)
    //функція видалення скарги
    async deleteComplaint(complaintId: number): Promise<any> {
        return await this.delete(`/${complaintId}`);
    }

    //getAllComplaints() -> [Complaint]
    //функція повертає усі скарги (для модератора)
    async getAllComplaints(): Promise<any> {
        return await this.get();
    }

    //getComplaintById(complaintId) -> Complaint
    //функція повертає дані про скаргу
    async getComplaintById(complaintId: number): Promise<any> {
        return await this.get(`/${complaintId}`);
    }
}
