import { API_ENDPOINTS } from "../config/constants";
import BaseViewModel from "./BaseViewModel";

export default class FileViewModel extends BaseViewModel {
    constructor() {
        super(API_ENDPOINTS.FILE);
    }

    async uploadFile(file: File): Promise<any> {
        const formData = new FormData();
        formData.append("file", file);
        const data = await this.post(formData, "", true);
        if (data && data.blobName) {
            return 'https://pawrescuestorage.blob.core.windows.net/files/' + data.blobName;
        }
        return null;
    }


}