<template>
  <div @click="isDropdownOpen = !isDropdownOpen" class="login-dropdown">
    <div class="dropdown-btn w-100 d-flex px-4 py-2 align-items-center">
      <img
        width="40"
        src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
        alt=""
      />
      <div class="user-info p-0 d-flex flex-column">
        <span class="name font-weight-bold text-white pl-2">{{
          signedInUser.name
        }}</span>
        <span class="username pl-2">@{{ signedInUser.username }}</span>
      </div>
      <i class="fas fa-sort-up text-white position-absolute"></i>
    </div>

    <transition enter-active-class="animate__fadeIn" leave-active-class="animate__fadeOut">
      <div v-if="isDropdownOpen" class="dropdown-item animate__animated">
        <ul>
          <li class="header pl-3 d-flex align-items-center">
            <img
              width="40"
              src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
              alt=""
            />
            <div class="user-info p-0 d-flex flex-column">
              <span class="name font-weight-bold text-white pl-2">{{
                signedInUser.name
              }}</span>
              <span class="username pl-2">@{{ signedInUser.username }}</span>
            </div>
          </li>
          <li
            @click="signOut"
            class="item text-white p-3 d-flex justify-content-between align-items-center"
          >
            çıkış yap <i class="fas fa-sign-out-alt"></i>
          </li>
        </ul>
      </div>
    </transition>
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
  methods: {
    ...mapActions({
      signOut: "signOut",
    }),
  },
};
</script>

<style scoped>
.animate__animated{
  animation-duration:0.5s;
}
* {
  padding: 0;
  margin: 0;
}
.login-dropdown {
  width: 250px;
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  z-index: 5;
}

.name {
  font-size: 15px;
}
.username {
  color: #566a7a;
  font-size: 14px;
}
img {
  border-radius: 50%;
}

.fa-sort-up {
  right: 12px;
}
.dropdown-btn {
  border-radius: 50px;
  cursor: pointer;
  background: #162d40;
}
.dropdown-btn:hover {
  background: #243a4d;
}
.item {
  cursor: pointer;
}
.dropdown-item {
  background: #15202b;
  box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.3);
  position: absolute;
  height: 150px;
  left: 128px;
  bottom: 75px;
  transform: translateX(-50%);
  border-radius: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}
ul li {
  padding: 15px 5px;
}

ul li:last-of-type:hover {
  background: #162d40;
}

@media (max-width: 1200px) {
  .login-dropdown {
    display: none;
  }
}
</style>
