<template>
  <div class="tweet-dropdown-container n-clickable">
    <div class="dropdown-btn">
      <i
        @click="isDropdownOpen = !isDropdownOpen"
        class="fas fa-angle-down n-clickable p-4 d-flex justify-content-center align-items-center"
      ></i>

      <transition
        enter-active-class="animate__zoomIn"
        leave-active-class="animate__zoomOut"
        appear
      >
        <div
          v-if="isDropdownOpen"
          class="dropdown-list animate__animated n-clickable"
        >
          <ul class="n-clickable">
            <li @click="hideTweet($event)">
              <i class="far fa-frown"></i>
              Bu Tweet İlgimi Çekmiyor , Gizle
            </li>
            <li
              v-if="tweet.user.username !== signedInUser.username"
              @click="follow_UnfollowUser(tweet.user)"
            >
              <i class="far fa-times-circle"></i>
              @{{ tweet.user.username }} adlı kişiyi takipten çık
            </li>
            <li>
              <i class="fas fa-bars"></i>
              Listelere ekle veya listelerden kaldır
            </li>
            <li v-if="tweet.user.username !== signedInUser.username">
              <i class="fas fa-ban"></i>
              Kişiyi engelle
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      signedInUser: "signedInUser",
    }),
  },
  props: ["tweet"],
  methods: {
    ...mapActions({
      follow_UnfollowUser: "follow_UnfollowUser",
      getAllTweets: "getAllTweets",
    }),
    hideTweet(e) {
      const parentDiv = e.path.find((el) => el.className === "tweet-card");
      parentDiv.style.display = "none";
    },
  },
  mounted() {
    window.addEventListener("click", (e) => {
      if (
        e.target.parentElement &&
        !e.target.parentElement.parentElement.classList.contains(
          "dropdown-list"
        ) &&
        !e.target.classList.contains("fa-angle-down")
      ) {
        this.isDropdownOpen = false;
      }
    });
  },
};
</script>

<style scoped>
.animate__animated {
  animation-duration: 0.5s;
}
.tweet-dropdown-container {
  position: absolute;
  right: 14px;
  top: 10px;
}
.dropdown-btn i {
  color: rgb(165, 165, 165);
  height: 23px;
  width: 23px;
  border-radius: 50%;
  transition: 0.3s ease all;
}
.dropdown-btn i:hover {
  background: #162d40;
  color: #1da1f2;
}
.dropdown-list {
  position: absolute;
  right: 5px;
  top: 50px;
  width: 320px;
  height: 100%;
  transition: 0.5s ease all;
  z-index: 5;
}
.dropdown-list ul {
  list-style-type: none;
  background: #15202b;
  box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.2);
  padding: 0;
  color: rgb(245, 245, 245);
  border-radius: 4px;
}

.dropdown-list.show {
  display: block;
}

.dropdown-list ul li {
  padding: 20px 10px;
  font-size: 14px;
  font-weight: 500;
  background: #15202b;
}
.dropdown-list ul li i {
  font-size: 20px;
  margin-right: 5px;
}
.dropdown-list ul li:first-of-type {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.dropdown-list ul li:last-of-type {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.dropdown-list ul li:hover {
  background: #1c2732;
}
</style>
