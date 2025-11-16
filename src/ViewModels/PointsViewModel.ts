import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS } from "../config/constants";

export default class PointsViewModel extends BaseViewModel {
    constructor() {
        super(API_ENDPOINTS.POINTS);
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
        const body = { recipientId, reviewerId, points, comment };
        return await this.post(body);
    }

    //deletePoints(pointsId)
    //функція видалення балів (модератор або reviewer)
    async deletePoints(pointsId: number): Promise<any> {
        return await this.delete(`/${pointsId}`);
    }

    //getAllPoints() -> [Points]
    //функція повертає всі бали
    async getAllPoints(): Promise<any> {
        return await this.get();
    }

    //getPointsById(pointsId) -> Points
    //функція повертає дані про бонуси
    async getPointsById(pointsId: number): Promise<any> {
        return await this.get(`/${pointsId}`);
    }

    //getPointsByRecipient(userId) -> [Points]
    //функція, що повертає всі об'єкти Points, де recipientId = userId
    async getPointsByRecipient(userId: string): Promise<any> {
        return await this.get(`/recipient/${userId}`);
    }

    //getPointsByReviewer(userId) -> [Points]
    //функція, що повертає всі об'єкти Points, де reviewerId = userId
    async getPointsByReviewer(userId: string): Promise<any> {
        return await this.get(`/reviewer/${userId}`);
    }
}
