class UsefulLinkViewModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    //addUsefulLink(type, title, content) -> UsefulLink
    //функція для створення UsefulLink (модератор)
    async addUsefulLink(type, title, content) {

    }

    //editUsefulLink(linkId, title, content) -> UsefulLink
    //функція для редагування UsefulLink (модератор)
    async editUsefulLink(linkId, title, content) {

    }

    //deleteUsefulLink(linkId)
    //функція для видалення UsefulLink (модератор)
    async deleteUsefulLink(linkId) {

    }

    //getAllUsefulLinks() -> [Link]
    //функція повертає усі корисні посилання (для модератора)
    async getAllUsefulLinks() {

    }

    //getUsefulLinkById(linkId) -> UsefulLink
    //функція повертає дані про покликання
    async getUsefulLinkById(linkId) {

    }

}
export default UsefulLinkViewModel;
