import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS } from "../config/constants";

export default class ResourcesViewModel extends BaseViewModel {
    constructor() {
        super(API_ENDPOINTS.RESOURCES);
    }
    //addResource(shelterId, category, name, description, isPresent) -> Resource
    //функція додавання ресурсів притулку
    async addResource(
        shelterId: number,
        category: string,
        name: string,
        description: string,
        isPresent: boolean
    ): Promise<any> {
        const body = { shelterId, category, name, description, isPresent };
        return await this.post(body);
    }

    //editResourceDescription(resourceId, description) -> Resource
    //функція редагування опису ресурсу
    async editResourceDescription(resourceId: number, description: string): Promise<any> {
        const body = { id: resourceId, description };
        return await this.put(body);
    }

    //editResourceIsPresent(resourceId) -> Resource
    //функція редагування наявності ресурсу
    //toggle isPresent
    async editResourceIsPresent(resourceId: number): Promise<any> {
        return await this.patch(undefined, `/${resourceId}`);
    }

    //deleteResource(resourceId)
    //функція видалення ресурсу
    async deleteResource(resourceId: number): Promise<any> {
        return await this.delete(`/${resourceId}`);
    }

    //getResourceById(resourceId) -> Resource
    //функція повертає дані про ресурс
    async getResourceById(resourceId: number): Promise<any> {
        return await this.get(`/${resourceId}`);
    }

    //getResourcesByShelter(shelterId) -> [Resources]
    //функція повертає усі ресурси притулку
    async getResourcesByShelter(shelterId: number): Promise<any> {
        return await this.get(`/shelter/${shelterId}`);
    }
}
