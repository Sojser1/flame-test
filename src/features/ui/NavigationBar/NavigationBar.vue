<script setup lang="ts">
import PeopleSearch from '../PeopleSearch/PeopleSearch.vue';

</script>
<template>
    <ul class="navbar">
        <li><RouterLink class="navbar-item" to="/">home</RouterLink></li>
        <li><RouterLink class="navbar-item" to="/peoples">peoples</RouterLink></li>
        <li><RouterLink class="navbar-item" to="/favorites">favorites</RouterLink></li>
        <li class="navbar-search"><PeopleSearch /></li>
    </ul>
</template>

<style scoped>
.navbar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  text-transform: uppercase;
  background-color: #343232;

  .navbar-item {
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: white !important;
  }

  .navbar-item:hover, .router-link-active {
    background-color: rgb(55, 104, 6);
  }

  .navbar-search {
    width: 250px;
    height: 30px;
  }
}
</style>