import { AnimalSize } from "../Enums/AnimalSize";
import { AnimalGender } from "../Enums/AnimalGender";
import { AnimalSpecies } from "../Enums/AnimalSpecies";
import { AdoptionStatus } from "../Enums/AdoptionStatus";
import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS } from "../config/constants";

export default class AnimalViewModel extends BaseViewModel {
    constructor() {
        super(API_ENDPOINTS.ANIMAL);
    }

    //addAnimal(shelterId, name, species, breed, gender, age, weight, size, description (O), photos (O) [Files], documents (O) [Files], isHealthy, isVaccinated, isSterilized, adoptionStatus, arrivalDate) -> Animal
    //функція додавання тварини в притулок
    async addAnimal(
        shelterId: number,
        name: string,
        species: AnimalSpecies,
        breed: string,
        gender: AnimalGender,
        age: number,
        weight: number,
        size: AnimalSize,
        isHealthy: boolean,
        isVaccinated: boolean,
        isSterilized: boolean,
        adoptionStatus: AdoptionStatus,
        arrivalDate: Date,
        description: string,
        photos: File[] = [],
        documents: File[] = []
    ): Promise<any> {
        const body = {
            shelterId,
            name,
            species,
            breed,
            gender,
            age,
            weight,
            size,
            description,
            photos: photos,
            documents: documents,
            isHealthy,
            isVaccinated,
            isSterilized,
            adoptionStatus
        };
        return await this.post(body);
    }

    //editAnimal(animalId, name, age, weight, description (O), photos (O) [Files], documents (O) [Files], isHealthy, isVaccinated, isSterilized, adoptionStatus) -> Animal
    //функція редагування даних про тваринку
    async editAnimal(
        animalId: number,
         shelterId: number,
        name: string,
        species: AnimalSpecies,
        breed: string,
        gender: AnimalGender,
        age: number,
        weight: number,
        size: AnimalSize,
        isHealthy: boolean,
        isVaccinated: boolean,
        isSterilized: boolean,
        adoptionStatus: AdoptionStatus,
        arrivalDate: Date,
        description: string,
        photos: File[] = [],
        documents: File[] = []
    ): Promise<any> {
        const body = {
            animalId,
            shelterId,
            name,
            species,
            breed,
            gender,
            age,
            weight,
            size,
            description,
            photos: photos,
            documents: documents,
            isHealthy,
            isVaccinated,
            isSterilized,
            adoptionStatus
        };
        return await this.put(body);
    }

    //deleteAnimal(animalId)
    //функція видалення тваринки з бази даних
    async deleteAnimal(animalId: number): Promise<any> {
        return await this.delete(`/${animalId}`);
    }

    //getAnimalById(animalId) -> Animal
    //функція повертає дані про тварину
    async getAnimalById(animalId: number): Promise<any> {
        return await this.get(`/${animalId}`);
    }

    //getAnimalsByShelter(shelterId) -> [Animal]
    //функція повертає всіх тварин притулку
    async getAnimalsByShelter(shelterId: number): Promise<any> {
        return await this.get(`/shelter/${shelterId}`);
    }
}
