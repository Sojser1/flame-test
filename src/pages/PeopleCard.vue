<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { PeopleItem } from '../api/interfaces';
import { useStore } from '../store';
import useLocalStorage from '../lib/hooks/useLocalStorage';

import AppLoader from '../components/AppLoader.vue';
import AppButton from '../components/AppButton.vue';

const route = useRoute();
const store = useStore();
const people = ref<PeopleItem | null>(null)
let isLoading = ref(false);

const initPeople = async (id: string) => {
    isLoading.value = true;
    people.value = await store.dispatch('getPeople', id);
    isLoading.value = false;
}

const { getItems, setItems} = useLocalStorage('favorite_list');

const addToFavorite = (item: PeopleItem): void => {
    const favoriteItems = getItems();
    favoriteItems.push(item);
    setItems(favoriteItems);

    if (people.value) {
        people.value.isFavorite = true;
    }
}

watch(() => route.params.id,
      async newId => {
        initPeople(newId as string);
      }
)

initPeople(route.params.id as string);
</script>
<template>
    <div class="people-card">
        <app-loader v-if="isLoading"/>
            <v-table class="people-info" v-else-if="!isLoading && people">
                <thead>
                    <tr>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        height
                    </th>
                    <th class="text-left">
                        Mass
                    </th>
                    <th class="text-left">
                        hair_color
                    </th>
                    <th class="text-left" v-if="!people.isFavorite">
                        Add Favorite
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    class="table-row"
                    >
                    <td>{{ people.name }}</td>
                    <td>{{ people.height }}</td>
                    <td>{{ people.mass }}</td>
                    <td>{{ people.hair_color }}</td>
                    <td v-if="!people.isFavorite">
                        <app-button @click.stop="() => addToFavorite(people!)" class="favorite-button">Добавить в избранное</app-button>
                    </td>
                    </tr>
                </tbody>
            </v-table>
    </div>
</template>

<style scoped>
.people-card {
    display: flex;
    justify-content: center;
}

.people-info {
    width: 100%;
}
</style>