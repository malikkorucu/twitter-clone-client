<template>
  <div v-if="routerLoaderShow" class="router-loader d-flex pt-5 d-flex justify-content-center">
    <div class="content">
      <div class="text-primary loader ">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed:{
        ...mapGetters({
            routerLoaderShow:'routerLoaderShow'
        })
    }
};
</script>

<style scoped>
.router-loader {
  position: absolute;
  z-index: 30;
  background: red;
  left: 0;
  top: 50px;
  height: 100%;
  width: 100%;
  background: #15202b;
}
.content {
  position: fixed;
}
</style>
