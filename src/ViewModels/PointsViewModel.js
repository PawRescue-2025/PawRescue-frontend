class PointsViewModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    //addPoints(recipientId, reviewerId, points, comment) -> Points
    //функція для додавання балів
    // - points > 0 && points <= 10
    // - reviewDate = NOW
    async addPoints(recipientId, reviewerId, points, comment) {

    }

    //deletePoints(pointsId)
    //функція для видалення балів (модератор або reviewer)
    async deletePoints(pointsId) {

    }

    //getAllPoints() -> [Points]
    //функція повертає всі бали
    async getAllPoints() {

    }

    //getPointsById(pointsId) -> Points
    //функція повертає дані про бонуси
    async getPointsById(pointsId) {

    }

    //getPointsByRecipient(userId) -> [Points]
    //функція, що повертає всі об’єкти Points, де recipientId = userId
    async getPointsByRecipient(userId) {

    }

    //getPointsByReviewer(userId) -> [Points]
    //функція, що повертає всі об’єкти Points, де reviewerId = userId
    async getPointsByReviewer(userId) {

    }

}
export default PointsViewModel;
