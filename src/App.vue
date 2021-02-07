<template>
  <v-app class="container-fluid p-0 m-0">
    <v-main>
      <app-loader-screen></app-loader-screen>
      <app-add-comment-modal></app-add-comment-modal>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import loaderScreen from "./components/common/loaderScreen";
import addCommentModal from "./components/modals/addCommentModal";
import io from "socket.io-client";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    appLoaderScreen: loaderScreen,
    appAddCommentModal: addCommentModal,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      signedInUser: "signedInUser",
      socket: "getSocket",
    }),
  },
  created() {

    this.$store.dispatch("initAuth");
    if(this.$route.name !=='intro'){
      this.$store.dispatch('getLastActions')
    }
    this.$store.commit('initNotificationCount')
    //socket işlemleri ****
    this.socket.on("notification", (m) => {
      this.$store.commit('increaseNotificationCount')
      this.$store.dispatch('showNotification' , m)
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap");

html {
  background: #15202b;
}

* {
  box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
}

::-webkit-scrollbar {
  display: none;
}

.divider {
  border: 0.5px solid #253341;
}

html {
  overflow: auto;
}

/* .slide-enter {
} */
.slide-enter-active {
  animation: slide-in 0.5s ease forwards;
}
/* .slide-leave {
} */
.slide-leave-active {
  animation: slide-out 0.5s ease forwards;
}

.slide-move {
  transition: transform 0.5s;
}


</style>

