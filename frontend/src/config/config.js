const apiUrl = "/choreo-apis/infoweb/backend/v1";
const localApiUrl = process.env.REACT_APP_API_BASE_URL;
export const API_URL = localApiUrl ? localApiUrl : apiUrl;
