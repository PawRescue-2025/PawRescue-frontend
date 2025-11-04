export default class UsefulLinkViewModel {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    //addUsefulLink(type, title, content) -> UsefulLink
    //функція для створення UsefulLink (модератор)
    async addUsefulLink(type: string, title: string, content: string): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //editUsefulLink(linkId, title, content) -> UsefulLink
    //функція для редагування UsefulLink (модератор)
    async editUsefulLink(linkId: number, title: string, content: string): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //deleteUsefulLink(linkId)
    //функція для видалення UsefulLink (модератор)
    async deleteUsefulLink(linkId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getAllUsefulLinks() -> [Link]
    //функція повертає усі корисні посилання (для модератора)
    async getAllUsefulLinks(): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getUsefulLinkById(linkId) -> UsefulLink
    //функція повертає дані про покликання
    async getUsefulLinkById(linkId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }
}
