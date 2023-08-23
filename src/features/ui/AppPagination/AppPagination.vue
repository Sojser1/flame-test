<script setup lang="ts">
import { computed } from 'vue';

import { useStore, AppButton } from '../../../shared';


const store = useStore();
const ITEMS_PER_PAGE = 10;

const hasNextPage = computed(() => store.state.count > ITEMS_PER_PAGE * store.state.page);
const hasPreviousPage = computed(() => store.state.page > 1);

</script>

<template>
    <div class="pagination-wrapper">
        <app-button v-if="hasPreviousPage" @click="store.commit('decrementPage')">Предыдущая страница</app-button>
        <p>Страница {{ store.state.page }} из {{ Math.ceil(store.state.count / ITEMS_PER_PAGE )}}</p>
        <app-button v-if="hasNextPage" @click="store.commit('incrementPage')">Следующая страница</app-button>
    </div>
</template>

<style scoped>
.pagination-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 20px;
}
</style>../shared/store