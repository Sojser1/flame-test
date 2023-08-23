<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from '../../app/providers';
import { PeopleItem, AppButton, AppLoader} from '../../shared';
import { AppPagination } from '../../features';

const store = useStore();
let isLoading = ref(false);

const peoples = computed(() => store.state.peopleList);

const getPeople = async () => {
  isLoading.value = true;
  await store.dispatch('getPeoples');
  isLoading.value = false;
}

const changeFavoriteStatus = (item: PeopleItem) => {
  store.dispatch('changeFavoriteStatus', item)
}

watch(() => store.state.page, () => getPeople());

getPeople();

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
    <app-pagination class="pagination" />
  </v-table>
  </div>
</template>

<style>
.people-list {
  width: 100%;
  min-height: 100%;
  height: auto;
  position: relative;
  padding: 12px 16px;
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

.pagination {
  margin-top: 10px;
}
</style>