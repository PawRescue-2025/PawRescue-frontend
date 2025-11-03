class ShelterViewModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    //addShelter(ownerId, name, description, contactPhone (O), contactEmail (O), contactLink (O), location)
    //функція для створення притулку
    // - під час реєстрації користувача типу shelterOwner надається форма,
    // - принаймні одне з contact полів має бути заповнене,
    // - після signUpVerified викликається addShelter (на фронті)
    async addShelter(ownerId, name, description, contactPhone, contactEmail, contactLink, location) {

    }

    //editShelter(name, description, contactPhone (O), contactEmail (O), contactLink (O), location) -> Shelter
    //функція для редагування притулку
    async editShelter(name, description, contactPhone, contactEmail, contactLink, location) {

    }

    //getShelterById(shelterId) -> Shelter
    //функція повертає дані про притулок
    async getShelterById(shelterId) {

    }

}
export default ShelterViewModel;
