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
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //editResourceDescription(resourceId, description) -> Resource
    //функція редагування опису ресурсу
    async editResourceDescription(resourceId: number, description: string): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //editResourceIsPresent(resourceId) -> Resource
    //функція редагування наявності ресурсу
    //toggle isPresent
    async editResourceIsPresent(resourceId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //deleteResource(resourceId)
    //функція видалення ресурсу
    async deleteResource(resourceId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getResourceById(resourceId) -> Resource
    //функція повертає дані про ресурс
    async getResourceById(resourceId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getResourcesByShelter(shelterId) -> [Resources]
    //функція повертає усі ресурси притулку
    async getResourcesByShelter(shelterId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }
}
