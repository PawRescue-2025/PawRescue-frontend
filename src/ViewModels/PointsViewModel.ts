export default class PointsViewModel {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    //addPoints(recipientId, reviewerId, points, comment) -> Points
    //функція для додавання балів
    // - points > 0 && points <= 10
    // - reviewDate = NOW
    async addPoints(
        recipientId: string,
        reviewerId: string,
        points: number,
        comment: string
    ): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //deletePoints(pointsId)
    //функція видалення балів (модератор або reviewer)
    async deletePoints(pointsId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getAllPoints() -> [Points]
    //функція повертає всі бали
    async getAllPoints(): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getPointsById(pointsId) -> Points
    //функція повертає дані про бонуси
    async getPointsById(pointsId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getPointsByRecipient(userId) -> [Points]
    //функція, що повертає всі об’єкти Points, де recipientId = userId
    async getPointsByRecipient(userId: string): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getPointsByReviewer(userId) -> [Points]
    //функція, що повертає всі об’єкти Points, де reviewerId = userId
    async getPointsByReviewer(userId: string): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }
}
