<template>
  <div class="profile-header">
    <div class="backdrop-img">
      <!-- <img
        width="100%"
        height="250"
        src="https://wallpapercave.com/wp/wp6878944.jpg"
      /> -->
      <img
        width="150"
        src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
        class="profile-img"
      />
    </div>

    <div class="profile-content d-flex flex-column pl-5 pr-2 py-2">
      <div class="btn-container d-flex justify-content-end">
        <app-button
          type="secondary"
          size="medium"
          title="Profili Düzenle"
        ></app-button>

      </div>

      <h5 class="font-weight-bold text-white p-0 m-0 pt-3">
        {{ signedInUser.name }}
      </h5>
      <span class="username">@{{ signedInUser.username }}</span>
      <span class="bio text-white py-3">just coffee</span>
      <span class="date"
        ><i class="far fa-calendar-alt pr-2"></i
        >{{ signedInUser.createdAt | moment("DD.MM.YY") }} tarihinde
        katıldı</span
      >
      <div class="follow-container pt-3">
        <span class="follows">
          <strong>{{ signedInUser.follows ? signedInUser.follows.length : 0 }}</strong>
          Takip edilen
        </span>
        <span class="followers pl-3">
          <strong>{{signedInUser.followers ? signedInUser.followers.length : 0}}</strong>
          Takipçi
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import button from "../toolbox/button";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      user: {},
    };
  },
  components: {
    appButton: button,
  },
  computed: {
    ...mapGetters({
      userProfile: "userProfile",
      signedInUser: "signedInUser",
    }),
  },
  methods: {
    ...mapActions({
      follow_UnfollowUser: "follow_UnfollowUser",
    }),
  },
  created() {
    let username = this.$route.params.username;
    this.$store.dispatch("getSingleUser", username);
  },
};
</script>

<style scoped>
.backdrop-img {
  height: 250px;
  position: relative;
  background: rgb(100, 100, 100);
}
.backdrop-img img {
  object-fit: cover;
  position: absolute;
}
.username {
  color: #7e8f9b;
}
.date {
  color: #7e8f9b;
}
.follow-container span {
  color: #7e8f9b;
}
.follow-container strong {
  font-weight: bold;
  color: white;
}
.profile-img {
  position: absolute;
  bottom: 0;
  left: 10px;
  transform: translateY(50%);
  border-radius: 50%;
  border: 4px solid #15202b;
}
.follow-container > span {
  cursor: pointer;
}
.follow-container > span:hover {
  text-decoration: underline;
}
</style>
