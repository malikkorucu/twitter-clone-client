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
      <div
        v-if="$route.params.username === signedInUser.username"
        class="d-flex justify-content-end"
      >
        <app-button
          type="secondary"
          size="medium"
          title="Profili Düzenle"
        ></app-button>
      </div>
      <div class="btn-container d-flex justify-content-end">
        <div
          v-if="$route.params.username !== signedInUser.username"
          class="follow-buttons"
        >
          <app-button
            v-if="
              signedInUser.follows &&
                signedInUser.follows.includes(userProfile._id)
            "
            type="primary"
            size="medium"
            title="Takibi bırak"
            @click.native="follow_UnfollowUser(userProfile)"
          ></app-button>
          <app-button
            v-else
            type="secondary"
            size="medium"
            title="Takibi Et"
            @click.native="follow_UnfollowUser(userProfile)"
          ></app-button>
        </div>
      </div>

      <h5 class="font-weight-bold text-white p-0 m-0 pt-3">
        {{ userProfile.name }}
      </h5>
      <span class="username">@{{ userProfile.username }}</span>
      <span class="bio text-white py-3">jsut coffee</span>
      <span class="date"
        ><i class="far fa-calendar-alt pr-2"></i
        >{{ userProfile.createdAt | moment("DD.MM.YY") }} tarihinde
        katıldı</span
      >
      <div class="follow-container pt-3">
        <span class="follows">
          <strong>{{
            userProfile.follows ? userProfile.follows.length : 0
          }}</strong>
          Takip edilen
        </span>
        <span class="followers pl-3">
          <strong>{{
            userProfile.followers ? userProfile.followers.length : 0
          }}</strong>
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
  created() {},
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
