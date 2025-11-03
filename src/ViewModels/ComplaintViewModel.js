class ComplaintViewModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    //addComplaint(complainantId, userId (O), postId (O), commentId (O), category, description (O)) -> Complaint
    //функція створення скарги
    // - creationDate = NOW
    // - status = active
    // - одне з userId, postId або commentId має бути обов’язково (перевірка на фронті)
    async addComplaint(complainantId, userId, postId, commentId, category, description) {

    }

    //editComplaintStatus(complaintId, status) -> Complaint
    //функція редагування статусу (модератор)
    async editComplaintStatus(complaintId, status) {

    }

    //deleteComplaint(complaintId)
    //функція видалення скарги
    async deleteComplaint(complaintId) {

    }

    //getAllComplaints() -> [Complaint]
    //функція повертає усі скарги (для модератора)
    async getAllComplaints() {

    }

    //getComplaintById(complaintId) -> Complaint
    //функція повертає дані про скаргу
    async getComplaintById(complaintId) {

    }

}
export default ComplaintViewModel;
