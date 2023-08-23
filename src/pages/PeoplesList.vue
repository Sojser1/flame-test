<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '../store';
import { PeopleItem } from '../api/interfaces';

import AppButton from '../components/AppButton.vue';
import AppLoader from '../components/AppLoader.vue';


const store = useStore();
let isLoading = ref(false);

const peoples = computed(() => store.state.peopleList);

const initPeople = async () => {
  if (peoples.value.length > 0) return;

  isLoading.value = true;
  await store.dispatch('getPeoples');
  isLoading.value = false;
}

initPeople();

const changeFavoriteStatus = (item: PeopleItem) => {
  store.dispatch('changeFavoriteStatus', item)
}

</script>
<template>
  <div class="people-list">
    <div  v-if="isLoading" class="loader">
      <AppLoader />
    </div>
  <v-table v-else>
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
        <th class="text-left">
          Add Favorite/Remove favorite
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="table-row"
        v-for="item in peoples"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.height }}</td>
        <td>{{ item.mass }}</td>
        <td>{{ item.hair_color }}</td>
        <td>
          <app-button @click.stop="() => changeFavoriteStatus(item)" class="favorite-button">{{  item.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное' }}</app-button>
        </td>
      </tr>
    </tbody>
  </v-table>
  </div>
</template>

<style>
.people-list {
  width: 100%;
  min-height: 100%;
  height: auto;
  position: relative;
}

.loader {
    position: absolute;
    top: 100px;
    left: 50%;
}

.table-row:hover {
  background-color: rgb(190, 188, 185);
  cursor: pointer;
}

.favorite-button {
  padding: 4px 8px;
  text-transform: uppercase;
  border: 1px solid black;
  border-radius: 5px
}
</style>