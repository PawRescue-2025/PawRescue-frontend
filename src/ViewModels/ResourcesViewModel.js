class ResourcesViewModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    //addResource(shelterId, category, name, description, isPresent) -> Resource
    //функція додавання ресурсів притулку
    async addResource(shelterId, category, name, description, isPresent) {

    }

    //editResourceDescription(resourceId, description) -> Resource
    //функція редагування опису ресурсу
    async editResourceDescription(resourceId, description) {

    }

    //editResourceIsPresent(resourceId) -> Resource
    //функція редагування наявності ресурсу
    //toggle isPresent
    async editResourceIsPresent(resourceId) {

    }

    //deleteResource(resourceId)
    //функція видалення ресурсу
    async deleteResource(resourceId) {

    }

    //getResourceById(resourceId) -> Resource
    //функція повертає дані про ресурс
    async getResourceById(resourceId) {

    }

    //getResourcesByShelter(shelterId) -> [Resources]
    //функція повертає усі ресурси притулку
    async getResourcesByShelter(shelterId) {

    }

}
export default ResourcesViewModel;
