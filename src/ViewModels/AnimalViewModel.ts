import {AnimalSize} from "../Enums/AnimalSize";
import {AnimalGender} from "../Enums/AnimalGender";
import {AnimalSpecies} from "../Enums/AnimalSpecies";
import {AdoptionStatus} from "../Enums/AdoptionStatus";

export default class AnimalViewModel {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
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
        description?: string | null,
        photos?: File[] | null,
        documents?: File[] | null
    ): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //editAnimal(animalId, name, age, weight, description (O), photos (O) [Files], documents (O) [Files], isHealthy, isVaccinated, isSterilized, adoptionStatus) -> Animal
    //функція редагування даних про тваринку
    async editAnimal(
        animalId: number,
        name: string,
        age: number,
        weight: number,
        isHealthy: boolean,
        isVaccinated: boolean,
        isSterilized: boolean,
        adoptionStatus: AdoptionStatus,
        description?: string | null,
        photos?: File[] | null,
        documents?: File[] | null
    ): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //deleteAnimal(animalId)
    //функція видалення тваринки з бази даних
    async deleteAnimal(animalId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getAnimalById(animalId) -> Animal
    //функція повертає дані про тварину
    async getAnimalById(animalId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }

    //getAnimalsByShelter(shelterId) -> [Animal]
    //функція повертає всіх тварин притулку
    async getAnimalsByShelter(shelterId: number): Promise<any> {
        // TODO: реалізація запиту
        throw new Error("Not implemented");
    }
}
