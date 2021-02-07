<template>
  <div
    ref="inputSearch"
    class="input-search d-flex py-3"
    :class="{ focus: focus }"
  >
    <i class="fas fa-search"></i>
    <input
      ref="input"
      v-model="searchText"
      class="input"
      type="search"
      placeholder="Twitter'da Ara"
    />

    <div class="results-container" :class="{ open: focus }">
      <ul>
        <li class="header">
          <h5
            class="text-white font-weight-bold d-flex justify-content-between align-items-center py-3 px-2"
          >
            Arama <small class="text-primary">Tümünü Temizle</small>
          </h5>
        </li>

        <div
          v-if="isLoaderShow"
          class="loader d-flex justify-content-center py-3 text-primary"
        >
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <h5
          v-if="noResult"
          class="text-white font-weight-bold text-center py-2"
        >
          Hiçbir sonuç bulunamadı :/
        </h5>
        <router-link
          tag="li"
          :to="{ name: 'profile-user', params: { username: user.username } }"
          @click.native="
            getSingleUser(user.username);
            focus = false;
            toggleIsSearchBarShow();
            searchText = '';
          "
          replace
          :key="user._id"
          v-for="user in searchResults"
          class="result-item py-3 px-2 pl-3 d-flex"
        >
          <img
            width="50"
            class="profile_img mr-3"
            src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
          />
          <div class="user-info d-flex flex-column">
            <span class="name">{{ user.name }}</span>
            <span class="username">@{{ user.username }}</span>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      focus: false,
      searchText: null,
      awaitingSearch: false,
      isLoaderShow: false,
    };
  },
  computed: {
    ...mapGetters({
      searchResults: "searchResults",
      noResult: "noResult",
    }),
  },
  methods: {
    ...mapMutations({
      clearSearchResults: "clearSearchResults",
      toggleNoResult: "toggleNoResult",
      toggleIsSearchBarShow: "toggleIsSearchBarShow",
    }),
    ...mapActions({
      getSingleUser: "getSingleUser",
    }),
  },
  watch: {
    searchText() {
      this.clearSearchResults();
      this.toggleNoResult(false);
      if (!this.awaitingSearch) {
        this.isLoaderShow = true;
        setTimeout(() => {
          if (this.searchText) {
            this.$store.dispatch("searchUser", this.searchText);
          }
          this.isLoaderShow = false;
          this.awaitingSearch = false;
        }, 1500); // 1 sec delay
      }
      this.awaitingSearch = true;
    },
  },
  mounted() {
    document.querySelector(".input").addEventListener("focus", (e) => {
      this.focus = true;
    });

    window.addEventListener("click", (e) => {
      let a = e.path.find((el) => {
        if (el.classList) {
          if (el.classList.contains("input-search")) {
            return el;
          }
        }
      });
      if (!a) {
        this.focus = false;
      }
    });
  },
};
</script>

<style scoped>
.input-search {
  padding: 5px 20px;
  background: #253341;
  border-radius: 30px;
  width: 100%;
  position: relative;
}

.input-search i {
  color: grey;
}

.input-search input {
  outline: none;
  font-size: 16px;
  padding: 0 10px;
  color: white;
  width: 100%;
}

.input-search.focus {
  border: 1px solid #1272ad;
}

.open {
  display: block !important;
}

.input-search.focus i {
  color: #1272ad;
}

img {
  border-radius: 50%;
}

.result-item {
  cursor: pointer;
  transition: 0.3s ease all;
}

.result-item:hover {
  background: #202e3a;
}

.results-container {
  position: absolute;
  top: 50px;
  border-radius: 5px;
  left: 0;
  z-index:50;
  background: #15202b;
  width: 100%;
  display: none;
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.2);
  min-height: 200px;
}

.results-container ul {
  list-style: none;
  padding: 0;
}

.name {
  font-size: 17px;
  font-weight: bold;
  color: white;
}

.username {
  font-size: 14px;
  color: rgb(190, 190, 190);
}
</style>
