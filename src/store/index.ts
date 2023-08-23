import { PeopleItem, PeoplesListDTO } from '../api/interfaces';
import axiosService from '../api';

import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

import useLocalStorage from '../lib/hooks/useLocalStorage';
import { isFavoriteItem } from '../lib/tools/response-process';

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
            const {results, count } = await axiosService.getPeoples(state.page);
            state.peopleList = results.map((people: PeopleItem) => ({...people, isFavorite: isFavoriteItem(people)}))
            state.count = count;
        },
        changeFavoriteStatus({ state, commit }, item: PeopleItem) {
            const currentPeople: PeopleItem = state.peopleList.filter((people: PeopleItem) => people.url === item.url)[0]
            currentPeople.isFavorite = !currentPeople.isFavorite;
            commit('syncLocalStorage');
        },
        async getPeople(_, id: string): Promise<PeopleItem> {
            return axiosService.getPeople(id).then(response => {
                response.isFavorite = isFavoriteItem(response);
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