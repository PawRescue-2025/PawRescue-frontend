import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS } from "../config/constants";

export default class UsefulLinkViewModel extends BaseViewModel {
    constructor() {
        super(API_ENDPOINTS.USEFUL_LINK);
    }

    //addUsefulLink(type, title, content) -> UsefulLink
    //функція для створення UsefulLink (модератор)
    async addUsefulLink(type: string, title: string, content: string): Promise<any> {
        const body = { type, title, content };
        return await this.post(body);
    }

    //editUsefulLink(linkId, title, content) -> UsefulLink
    //функція для редагування UsefulLink (модератор)
    async editUsefulLink(linkId: number, title: string, content: string): Promise<any> {
        const body = { id: linkId, title, content };
        return await this.put(body);
    }

    //deleteUsefulLink(linkId)
    //функція для видалення UsefulLink (модератор)
    async deleteUsefulLink(linkId: number): Promise<any> {
        return await this.delete(`/${linkId}`);
    }

    //getAllUsefulLinks() -> [Link]
    //функція повертає усі корисні посилання (для модератора)
    async getAllUsefulLinks(): Promise<any> {
        return await this.get();
    }

    //getUsefulLinkById(linkId) -> UsefulLink
    //функція повертає дані про покликання
    async getUsefulLinkById(linkId: number): Promise<any> {
        return await this.get(`/${linkId}`);
    }
}
