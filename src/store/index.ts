import { PeopleItem, PeoplesListDTO } from '../api/interfaces';
import axiosService from '../api';

import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

import useLocalStorage from '../lib/hooks/useLocalStorage';

interface PeoplesStoreState {
    peopleList: PeopleItem[],
    favoriteList: PeopleItem[],
    count: number,
    page: number,
}

export const key: InjectionKey<Store<PeoplesStoreState>> = Symbol();


export const store = createStore<PeoplesStoreState>({
    state: {
        peopleList: [],
        count: 0,
        page: 1,
    },
    mutations: {
        syncLocalStorage(state) {
            const { setItems } = useLocalStorage<PeopleItem>('favorite_list');
            const favoritePeople = state.peopleList.filter((people: PeopleItem) => people.isFavorite);
            setItems(favoritePeople)
        },
    },
    actions: {
        async getPeoples({ state }) {
            //TODO: refactor
            const {results, count } = await axiosService.getPeoples(state.page);
            const { getItems } = useLocalStorage<PeopleItem>('favorite_list');
            state.peopleList = results.map((people: PeopleItem) => ({...people, isFavorite: getItems().filter(item => item.url === people.url).length > 0}))
            state.count = count;
        },
        changeFavoriteStatus({ state, commit }, item: PeopleItem) {
            const currentPeople: PeopleItem = state.peopleList.filter((people: PeopleItem) => people.url === item.url)[0]
            currentPeople.isFavorite = !currentPeople.isFavorite;
            commit('syncLocalStorage');
        },
        async getPeople(_, id: string): Promise<PeopleItem> {
            return axiosService.getPeople(id).then(response => {
                //TODO: lib fn
                const { getItems } = useLocalStorage<PeopleItem>('favorite_list');
                response.isFavorite = getItems().filter(item => item.url === response.url).length > 0;
                return response;
            })
        },
        getPeoplesWithFilter(_, search: string): Promise<PeoplesListDTO> {
            return axiosService.getPeoplesWithFilter(search);
        },
    },
  })

export function useStore () {
  return baseUseStore(key)
}