<template>
  <div class="search-page">
    <app-header title="Arama"></app-header>
    <app-input-search></app-input-search>
    <h3 class="text-white">search page</h3>
  </div>
</template>

<script>
import header from "../components/common/header";
import searchInput from "../components/toolbox/inputSearch";

export default {
  components: {
    appHeader: header,
    appInputSearch: searchInput,
  },
};
</script>

<style scoped></style>
