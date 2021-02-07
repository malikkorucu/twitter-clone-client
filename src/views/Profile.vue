<template>
  <div class="profile-page">
    <app-header :title="signedInUser.name"></app-header>
    <app-profile-header></app-profile-header>
    <app-component-switcher></app-component-switcher>
    <app-edit-profile-modal></app-edit-profile-modal>
  </div>
</template>

<script>
import header from "../components/common/header";
import profileHeader from "../components/tweet/profileHeader";
import componentSwitcher from "../components/profileComponentSwitcher/switcher";
import editProfileModal from '../components/modals/editProfileModal'

import { mapGetters } from "vuex";

export default {
  components: {
    appProfileHeader: profileHeader,
    appHeader: header,
    appComponentSwitcher: componentSwitcher,
    appEditProfileModal:editProfileModal
  },
  computed: {
    ...mapGetters({
      signedInUser: "signedInUser",
    }),
  },
  created() {
    let username = this.$route.params.username;
    if (!username) {
      console.log('asdlşfkjasdf');
      this.$store.dispatch("getTweetsOfUser");
    }
  },
};
</script>

<style scoped></style>
