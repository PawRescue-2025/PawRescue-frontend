import { API_BASE_URL } from "../config/constants";

export default class BaseViewModel {
    protected readonly baseUrl: string;

    constructor(endpoint: string) {
        this.baseUrl = `${API_BASE_URL}${endpoint}`;
    }

    protected async request(
        url: string,
        method: string,
        body?: any,
        isFormData: boolean = false
    ): Promise<any> {
        const options: RequestInit = {
            method,
            headers: isFormData ? {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            } : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        };

        if (body) {
            options.body = isFormData ? body : JSON.stringify(body);
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

    /**
     * GET запит
     */
    protected async get(path: string = ""): Promise<any> {
        return this.request(`${this.baseUrl}${path}`, "GET");
    }

    /**
     * POST запит
     */
    protected async post(body: any, path: string = "", isFormData: boolean = false): Promise<any> {
        return this.request(`${this.baseUrl}${path}`, "POST", body, isFormData);
    }

    /**
     * PUT запит
     */
    protected async put(body: any, path: string = "", isFormData: boolean = false): Promise<any> {
        return this.request(`${this.baseUrl}${path}`, "PUT", body, isFormData);
    }

    /**
     * DELETE запит
     */
    protected async delete(path: string = ""): Promise<any> {
        return this.request(`${this.baseUrl}${path}`, "DELETE");
    }
}
