import { AnimalSize } from "../Enums/AnimalSize";
import { AnimalGender } from "../Enums/AnimalGender";
import { AnimalSpecies } from "../Enums/AnimalSpecies";
import { AdoptionStatus } from "../Enums/AdoptionStatus";
import BaseViewModel from "./BaseViewModel";
import { API_ENDPOINTS } from "../config/constants";
import FileViewModel from "./FIleViewModel";

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

        const photos_url = []
        const documents_url = []
        const fileVM = new FileViewModel();
        for (const photo of photos) {
            const url = await fileVM.uploadFile(photo);
            photos_url.push(url);
        }
        for (const document of documents) {
            const url = await fileVM.uploadFile(document);
            documents_url.push(url);
        }

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
            photos: photos_url,
            documents: documents_url,
            isHealthy,
            isVaccinated,
            isSterilized,
            adoptionStatus,
            arrivalDate
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
        const photos_url = [];
        const documents_url = [];
        const fileVM = new FileViewModel();

        for (const photo of photos) {
            const url = await fileVM.uploadFile(photo);
            photos_url.push(url);
        }
        for (const document of documents) {
            const url = await fileVM.uploadFile(document);
            documents_url.push(url);
        }

        const body = {
            id: animalId,
            shelterId,
            name,
            species,
            breed,
            gender,
            age,
            weight,
            size,
            description,
            photos: photos_url,
            documents: documents_url,
            isHealthy,
            isVaccinated,
            isSterilized,
            adoptionStatus,
            arrivalDate
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
