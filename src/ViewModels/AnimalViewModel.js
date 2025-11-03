class AnimalViewModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    //addAnimal(shelterId, name, species, breed, gender, age, weight, size, description (O), photos (O) [Files], documents (O) [Files], isHealthy, isVaccinated, isSterilized, adoptionStatus, arrivalDate) -> Animal
    //функція додавання тварини в притулок
    async addAnimal(shelterId, name, species, breed, gender, age, weight, size, description, photos, documents, isHealthy, isVaccinated, isSterilized, adoptionStatus, arrivalDate) {

    }

    //editAnimal(animalId, name, age, weight, description (O), photos (O) [Files], documents (O) [Files], isHealthy, isVaccinated, isSterilized, adoptionStatus) -> Animal
    //функція редагування даних про тваринку
    async editAnimal(animalId, name, age, weight, description, photos, documents, isHealthy, isVaccinated, isSterilized, adoptionStatus) {

    }

    //deleteAnimal(animalId)
    //функція видалення тваринки з бази даних
    async deleteAnimal(animalId) {

    }

    //getAnimalById(animalId) -> Animal
    //функція повертає дані про тварину
    async getAnimalById(animalId) {

    }

    //getAnimalsByShelter(shelterId) -> [Animal]
    //функція повертає всіх тварин притулку
    async getAnimalsByShelter(shelterId) {

    }

}
export default AnimalViewModel;
