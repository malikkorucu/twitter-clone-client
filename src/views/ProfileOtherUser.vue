<template>
  <div class="profile-page">
    <app-header :title="userProfile.name"></app-header>
    <app-profile-header></app-profile-header>
    <app-component-switcher></app-component-switcher>
  </div>
</template>

<script>
import header from "../components/common/header";
import profileHeader from "../components/tweet/profileHeaderOtherUser";
import componentSwitcher from "../components/profileComponentSwitcher/switcher";
import { mapGetters } from "vuex";

export default {
  components: {
    appProfileHeader: profileHeader,
    appHeader: header,
    appComponentSwitcher: componentSwitcher,
  },
  computed: {
    ...mapGetters({
      userProfile: "userProfile",
    }),
  },
  created() {
    let username = this.$route.params.username;
    this.$store.dispatch("getSingleUser", username);
    this.$store.dispatch("getTweetsOfUser", username);
  },
};
</script>

<style scoped></style>
