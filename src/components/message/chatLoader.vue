<template>
  <div
    v-if="chatLoader"
    class="chat-loader d-flex justify-content-center pt-5 text-primary"
  >
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      chatLoader: "chatLoader",
    }),
  },
};
</script>

<style scoped>
.chat-loader {
  position: absolute;
  background: #15202b;
  height: 100%;
  width: 100%;
  top: 61px;
  left: 0;
}
</style>
