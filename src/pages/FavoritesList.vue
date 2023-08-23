<script setup lang="ts">
import { ref } from 'vue';
import { PeopleItem } from '../api/interfaces';
import { useStore } from '../store';

import useLocalStorage from '../lib/hooks/useLocalStorage';

import AppButton from '../components/AppButton.vue';

const store = useStore();

const { getItems } = useLocalStorage<PeopleItem>('favorite_list');
const favoriteList = ref(getItems());

const removeFromFavorite = (item: PeopleItem) => {
  store.dispatch('changeFavoriteStatus', item);
  favoriteList.value = getItems();
}
</script>
<template>
  <div class="favorite_wrapper">
    <v-table class="favorite-info" v-if="favoriteList.length > 0">
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
          v-for="item in favoriteList"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.height }}</td>
          <td>{{ item.mass }}</td>
          <td>{{ item.hair_color }}</td>
          <td>
            <app-button @click.stop="() => removeFromFavorite(item)" class="favorite-button">Удалить из избранного</app-button>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div v-else class="empty-list">
      В данный момент список избранных пуст
    </div>
</div>
</template>

<style scoped>
.favorite_wrapper {
  width: 100%;
  display: flex;
  align-items: center;
}

.favorite-info {
  width: 100%;
}

.empty-list {
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
}
</style>