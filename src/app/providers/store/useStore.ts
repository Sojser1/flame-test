import { PeopleItem, PeoplesListDTO } from '../../../shared/api';
import { axiosClient } from '../../../shared/api';

import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

import { useLocalStorage, isFavoriteItem } from '../../../shared';

interface PeoplesStoreState {
    peopleList: PeopleItem[],
    count: number,
    page: number,
}

export const key: InjectionKey<Store<PeoplesStoreState>> = Symbol();


export const store = createStore<PeoplesStoreState>({
    state: () => ({
        peopleList: [],
        count: 0,
        page: 1,
    }),
    mutations: {
        syncLocalStorage(state) {
            const { setItems } = useLocalStorage<PeopleItem>('favorite_list');
            const favoritePeople = state.peopleList.filter((people: PeopleItem) => people.isFavorite);
            setItems(favoritePeople)
        },
        incrementPage(state) {
            state.page += 1;
        },
        decrementPage(state) {
            state.page -= 1;
        }
    },
    actions: {
        async getPeoples({ state }) {
            const {results, count } = await axiosClient.getPeoples(state.page);
            state.peopleList = results.map((people: PeopleItem) => ({...people, isFavorite: isFavoriteItem(people)}))
            state.count = count;
        },
        changeFavoriteStatus({ state, commit }, item: PeopleItem) {
            const currentPeople: PeopleItem = state.peopleList.filter((people: PeopleItem) => people.url === item.url)[0]
            currentPeople.isFavorite = !currentPeople.isFavorite;
            commit('syncLocalStorage');
        },
        async getPeople(_, id: string): Promise<PeopleItem> {
            return axiosClient.getPeople(id).then(response => {
                response.isFavorite = isFavoriteItem(response);
                return response;
            })
        },
        getPeoplesWithFilter(_, search: string): Promise<PeoplesListDTO> {
            return axiosClient.getPeoplesWithFilter(search);
        },
    },
  })

export function useStore () {
  return baseUseStore(key)
}