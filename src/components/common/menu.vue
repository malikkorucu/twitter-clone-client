<template>
  <div class="menu-x pt-1" :class="{ showMenu: isMenuOpen }">
    <router-link
      tag="i"
      @click.native="
        currentMenuItem = 'home';
        toggleMenu();
      "
      to="/home"
      class="text-white twitter-icon fab fa-twitter p-2"
    ></router-link>
    <ul class="mt-5">
      <router-link
        tag="li"
        :to="{ name: 'home' }"
        :class="{ active: currentMenuItem == 'home' }"
        @click.native="
          currentMenuItem = 'home';
          toggleMenu();
        "
        class="py-1 custom-active"
      >
        <span>
          <i class="fas fa-home"></i>
          <p class="d-inline text pl-3">Anasayfa</p>
        </span>
      </router-link>
      <router-link
        tag="li"
        :to="{ name: 'notifications' }"
        :class="{ active: currentMenuItem == 'notification' }"
        @click.native="
          currentMenuItem = 'notification';
          toggleMenu();
        "
        class="py-1"
      >
        <span>
          <i class="far fa-bell"></i>
          <p class="d-inline text pl-3">Bildirimler</p>
          <span v-if="notificationCount > 0" class="badge badge-danger ml-3">{{
            notificationCount
          }}</span>
        </span>
      </router-link>
      <router-link
        tag="li"
        :to="{ name: 'messages' }"
        :class="{ active: currentMenuItem == 'messages' }"
        @click.native="
          currentMenuItem = 'messages';
          toggleMenu();
        "
        class="py-1"
      >
        <span>
          <i class="far fa-envelope"></i>
          <p class="d-inline text pl-3">Mesajlar</p>
        </span>
      </router-link>
      <router-link
        tag="li"
        :to="{ name: 'bookmarks' }"
        :class="{ active: currentMenuItem == 'bookmark' }"
        @click.native="
          currentMenuItem = 'bookmark';
          toggleMenu();
        "
        class="py-1"
      >
        <span>
          <i class="far fa-bookmark"></i>
          <p class="d-inline text pl-3">Yer İşaretleri</p>
        </span>
      </router-link>
      <router-link
        tag="li"
        :to="{ name: 'lists' }"
        :class="{ active: currentMenuItem == 'lists' }"
        @click.native="
          currentMenuItem = 'lists';
          toggleMenu();
        "
        class="py-1"
      >
        <span>
          <i class="far fa-list-alt"></i>
          <p class="d-inline text pl-3">Listeler</p>
        </span>
      </router-link>
      <router-link
        tag="li"
        :to="{ name: 'profile' }"
        :class="{
          active: currentMenuItem == 'profile',
        }"
        @click.native="
          currentMenuItem = 'profile';
          toggleMenu();
        "
        class="py-1"
      >
        <span>
          <i class="fas fa-user"></i>
          <p class="d-inline text pl-3">Profil</p>
        </span>
      </router-link>
      <router-link
        tag="li"
        :to="{ name: 'search' }"
        :class="{
          active: currentMenuItem == 'search',
        }"
        @click.native="
          currentMenuItem = 'search';
          toggleMenu();
        "
        class="py-1 d-none search-menu-item"
      >
        <span>
          <i class="fas fa-search"></i>
          <p class="d-inline text pl-3">Arama</p>
        </span>
      </router-link>
      <li
        @click="
          signOut();
          toggleMenu();
        "
        class="d-none exit"
      >
        <span>
          <i class="fas fa-sign-out-alt"></i>
        </span>
      </li>
      <li class="py-1">
        <span>
          <i class="far fa-comment-dots"></i>
          <p class="d-inline text pl-3">Daha fazla</p>
        </span>
      </li>
    </ul>

    <app-button
      class="tweet-btn"
      type="primary"
      size="medium"
      title="Tweetle"
      :block="true"
    ></app-button>
    
  </div>
</template>

<script>
import button from "../toolbox/button";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    appButton: button,
  },
  data() {
    return {
      currentMenuItem: "",
    };
  },
  computed: {
    ...mapGetters({
      isMenuOpen: "isMenuOpen",
      notificationCount: "notificationCount",
    }),
  },
  methods: {
    ...mapActions({
      signOut: "signOut",
    }),
    ...mapMutations({
      toggleMenu: "toggleMenu",
    }),
  },
  created() {
    this.currentMenuItem = this.$route.name;
  },
};
</script>

<style scoped>
.menu-x {
  padding-right: 8px;
}
.badge {
  font-size: 14px;
}
ul {
  list-style: none;
  padding: 0;
}
ul li span {
  color: white;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.2s;
}
ul li span {
  display: inline-block;
  padding: 12px 10px;
  border-radius: 35px;
}
ul li span:hover {
  color: #1da1f2;
  background: #162d40;
}
li.active span {
  color: #1da1f2;
}
.twitter-icon {
  font-size: 25px;
  border-radius: 50%;
  padding: 0;
  transition: 0.2s;
  cursor: pointer;
}
.twitter-icon:hover {
  background: #162d40;
}

@media (max-width: 1050px) {
  .text {
    display: none !important;
  }
  .menu-x i {
    padding: 4px !important;
    z-index: 20;
  }
  .menu-x {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-right: 0;
  }
  .menu-x i {
    font-size: 40px;
    padding-bottom: 15px;
  }
  .tweet-btn {
    display: none;
  }
  .exit {
    display: block !important;
  }
  .search-menu-item {
    display: block !important;
  }
}

@media (max-width: 720px) {
  .menu-x {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-right: 0;
    transform: translateX(-300px);
  }
  .menu-x i {
    font-size: 20px;
    padding-bottom: 15px;
    transform: translateX(-100%);
  }
  .menu-x.showMenu {
    transform: translateX(0);
  }
  .menu-x.showMenu i {
    transform: translateX(0);
  }
}
</style>
