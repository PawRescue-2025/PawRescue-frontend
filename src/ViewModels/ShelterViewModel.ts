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
        contactPhone: string = "",
        contactEmail: string = "",
        contactLink: string = ""
    ): Promise<any> {
        const body = { ownerId, name, description, location, contactPhone, contactEmail, contactLink };
        return await this.post(body);
    }

    //editShelter(name, description, contactPhone (O), contactEmail (O), contactLink (O), location) -> Shelter
    //функція для редагування притулку
    async editShelter(
        id: number,
        name: string,
        description: string,
        location: string,
        contactPhone: string = "",
        contactEmail: string = "",
        contactLink: string = ""
    ): Promise<any> {
        // this is not PATCH, it's full update
        const body = { id, name, description, location, contactPhone, contactEmail, contactLink };
        return await this.put(body);
    }

    //getShelterById(shelterId) -> Shelter
    //функція повертає дані про притулок
    async getShelterById(shelterId: number): Promise<any> {
        return await this.get(`/${shelterId}`);
    }

    //getShelterByOwner(userId) -> Shelter
    //функція повертає дані про притулок
    async getShelterByOwnerId(userId: number): Promise<any> {
        //TODO
    }
}
