export default class UsefulLinkViewModel {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request(
        url: string,
        method: string,
        body?: any
    ): Promise<any> {
        const options: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `HTTP ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        }

        return response;
    }


    //addUsefulLink(type, title, content) -> UsefulLink
    //функція для створення UsefulLink (модератор)
    async addUsefulLink(type: string, title: string, content: string): Promise<any> {
        const body = { type, title, content };
        return await this.request(`${this.baseUrl}`, "POST", body);
    }

    //editUsefulLink(linkId, title, content) -> UsefulLink
    //функція для редагування UsefulLink (модератор)
    async editUsefulLink(linkId: number, title: string, content: string): Promise<any> {
        const body = { id: linkId, title, content };
        return await this.request(`${this.baseUrl}`, "PUT", body);
    }

    //deleteUsefulLink(linkId)
    //функція для видалення UsefulLink (модератор)
    async deleteUsefulLink(linkId: number): Promise<any> {
        return await this.request(`${this.baseUrl}/${linkId}`, "DELETE");
    }

    //getAllUsefulLinks() -> [Link]
    //функція повертає усі корисні посилання (для модератора)
    async getAllUsefulLinks(): Promise<any> {
        return await this.request(`${this.baseUrl}`, "GET");
    }

    //getUsefulLinkById(linkId) -> UsefulLink
    //функція повертає дані про покликання
    async getUsefulLinkById(linkId: number): Promise<any> {
        return await this.request(`${this.baseUrl}/${linkId}`, "GET");
    }
}
