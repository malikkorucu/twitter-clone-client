<template>
  <div
    :class="{ 'show': loaderIsShow }"
    class="loader-screen"
  >
    <i class="fab fa-twitter"></i>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      loaderIsShow: "loaderIsShow",
    }),
  },
};
</script>

<style scoped>
.loader-screen {
  background: #1272ad;
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 70;
  display: none !important;
}
i {
  font-size: 150px;
  color: white;
  position:absolute;
  left:50%;
  top:50%;
  transform: translateX(-50%);
  transform: translateY(-50%)
}
.show {
  display: block !important;
}
</style>
