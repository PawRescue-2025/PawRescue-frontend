import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS } from "../config/constants";

export default class ShelterViewModel extends BaseViewModel {
    constructor() {
        super(API_ENDPOINTS.SHELTER);
    }

    //addShelter(ownerId, name, description, contactPhone (O), contactEmail (O), contactLink (O), location)
    //функція для створення притулку
    // - під час реєстрації користувача типу shelterOwner надається форма,
    // - принаймні одне з contact полів має бути заповнене,
    // - після signUpVerified викликається addShelter (на фронті)
    async addShelter(
        ownerId: string,
        name: string,
        description: string,
        location: string,
        contactPhone?: string | null,
        contactEmail?: string | null,
        contactLink?: string | null
    ): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //editShelter(name, description, contactPhone (O), contactEmail (O), contactLink (O), location) -> Shelter
    //функція для редагування притулку
    async editShelter(
        name: string,
        description: string,
        location?: string,
        contactPhone?: string | null,
        contactEmail?: string | null,
        contactLink?: string | null
    ): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getShelterById(shelterId) -> Shelter
    //функція повертає дані про притулок
    async getShelterById(shelterId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }
}
