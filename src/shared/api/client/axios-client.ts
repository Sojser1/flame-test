import axios from 'axios';
import { PeopleItem, PeoplesListDTO } from '../interfaces';

const API_URL = 'https://swapi.dev/api/people/';
class AxiosService {
    url: string = ''

    constructor(url: string) {
        this.url = url;
    }
    async getPeoples(page = 1): Promise<PeoplesListDTO> {
        return axios.get(this.url, { params: { page }}).then(response => response.data)
    }

    async getPeoplesWithFilter(search: string): Promise<PeoplesListDTO> {
        return axios.get(this.url, { params: { search }}).then((response) => response.data);
    }

    async getPeople(id: string): Promise<PeopleItem> {
        return axios.get(this.url + id).then((response) => response.data)
    }
}


export default new AxiosService(API_URL);