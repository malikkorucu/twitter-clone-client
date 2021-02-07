<template>
  <div
    class="header py-3 px-4 d-flex align-items-center justify-content-between"
  >
    <h5 class="text-white font-weight-bold m-0">
      <i
        @click="$router.go(-1)"
        v-if="$route.name !== 'home'"
        class="back-icon far fa-hand-point-left text-primary mr-3"
      ></i>
      {{ title }}
    </h5>
    <i @click="toggleMenu" class="text-white fas fa-bars"></i>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ["title"],
  methods: {
    ...mapMutations({
      toggleMenu: "toggleMenu",
    }),
  },
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #253341;
  position: sticky;
  top: 0;
  /* background:black; */
  z-index: 5;
  border: 1px solid #253341;
  background: #15202b;
}
.fa-bars {
  display: none;
}
.back-icon {
  font-size: 25px;
  cursor: pointer;
}
@media (max-width: 720px) {
  .fa-bars {
    display: block;
  }
}
</style>
