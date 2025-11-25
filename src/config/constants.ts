export const API_BASE_URL = "https://pawrescue-wa-2-dfa4ewcdejandkb2.westeurope-01.azurewebsites.net";

export const API_ENDPOINTS = {
    ANIMAL: "/api/Animal",
    AUTH: "/api/Auth",
    COMMENT: "/api/Comment",
    COMPLAINT: "/api/Complaint",
    POINTS: "/api/Point",
    POST: "/api/Post",
    REPORT: "/api/Report",
    RESOURCES: "/api/Resource",
    SHELTER: "/api/Shelter",
    USEFUL_LINK: "/api/UsefulLink",
    USER: "/api/UserProfile",
    VERIFICATION: "/api/Verification",
    FILE: "/api/FileManagement/upload",
} as const;

export const DEFAULT_PROFILE_PICTURE_URL = "https://pawrescuestorage.blob.core.windows.net/files/47da5413-0a3f-4227-a6e8-41f4d4cb7c28.jpg";