<script setup lang="ts">
import axiosClient from '../api/';
import { ref } from 'vue';
import { PeopleItem } from '../api/interfaces';
import AppLoader from './AppLoader.vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import debounce  from 'lodash/debounce';

const store = useStore();

let items = ref([] as PeopleItem[]);
let filter = ref('');
let isLoading = ref(false);
let activeInput = ref(false);

const searchPeople = async (): Promise<void> => {
    isLoading.value = true;
    const people = await store.dispatch('getPeoplesWithFilter', filter.value);
    items.value = people.results;
    isLoading.value = false;
}

const debouncedSearchPeople = debounce(searchPeople, 300);
const dropdownVisible = debounce(() => activeInput.value = false, 300);

const router = useRouter();

const goToPeopleCard = (url: string) => {
    const id = url.match(/\d{1,}/);

    if (id && id[0]) {
        resetInputData();
        router.push(`/peoples/${id[0]}`);
    }
}

const resetInputData = (): void => {
    filter.value = '';
    items.value = [];
}
</script>
<template>
    <div class="people-search">
        <input class="input" @focus="activeInput = true" @blur="dropdownVisible" v-model="filter" @input="() => debouncedSearchPeople()" type="text"/>
        <div v-if="activeInput" class="dropdown">
            <app-loader v-if="isLoading"/>
            <p v-else class="dropdown-item" @click="() => goToPeopleCard(item.url)" v-for="item in items">{{  item.name }}</p>
        </div>
    </div>
</template>

<style scoped>
.people-search {
    position: relative;
    margin-left: 20px;
    border-radius: 10px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4px;

    .input {
        all: unset;
        height: 24px;
        width: 100%;
        padding: 4px;

    }

    .dropdown {
        position: absolute;
        top: 40px;
        left: 0;
        z-index: 5;

        width: 250px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);

        .dropdown-item {
            height: 40px;
            border-top: 1px solid #acaaaa;
            width: 100%;
            display: flex;
            align-items: center;
            padding: 4px 8px;
            cursor: pointer;
        }

        .dropdown-item:hover {
            transition: 0.2s;
            background-color: rgb(172, 176, 176);
        }


        .dropdown-item:first-child {
            border-top: none;
        }

        
    }
} 
</style>