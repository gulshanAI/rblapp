import { create } from 'apisauce';
import authStorage from '../api/storage';
import baseURL from './base'

const apiClient = create({
    baseURL: baseURL,
});
export const unAuthapiClient = create({
    baseURL: baseURL,
});

apiClient.addAsyncRequestTransform( async (request) => {
    const authenticateData = await authStorage.getToken();
    if(!authenticateData) return;
    const Obj = JSON.parse(authenticateData)
    const hereToken = Obj.token
    apiClient.setHeaders({
        Authorization: 'Token '+hereToken
    })
}); 


export default apiClient ;