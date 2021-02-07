<template>
  <transition
    enter-active-class="animate__fadeIn"
    leave-active-class="animate__fadeOut"
  >
    <div v-if="isModalShow" class="new-message-container animate__animated">
      <div class="new-message">
        <header class="py-4 px-5">
          <div class="left d-flex align-items-center">
            <i
              @click="toggleNewMessageModal()"
              class="fas fa-times text-primary"
            ></i>
            <span class="title text-white font-weight-bold pl-5"
              >Yeni Mesaj</span
            >
          </div>
        </header>

        <div class="search-area px-3 py-3">
          <i class="fas fa-search"></i>
          <input
            v-model="searchText"
            type="text"
            class="search"
            placeholder="Kişi ara"
          />
        </div>

        <div
          v-if="isLoaderShow"
          class="loader d-flex justify-content-center py-3 text-primary"
        >
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <h4
          v-if="noResult"
          class="pt-4 text-white text-center font-weight-bold"
        >
          Hiçbir sonuç bulunamadı :/
        </h4>
        <ul class="friends-list p-0">
          <li
            @click="
              addNewConversation({
                with_user: result._id,
                user: signedInUser._id,
              });
              toggleNewMessageModal();
              clear();
            "
            :key="result._id"
            v-for="result in searchResults"
            class="d-flex align-items-center px-2 py-4"
            :class="{ disabled: !signedInUser.follows.includes(result._id) }"
          >
            <img
              width="50"
              ref="img"
              height="50"
              class="img"
              style="border-radius: 50%"
              src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
            />
            <div class="user-info d-flex flex-column pl-4">
              <span class="name text-white font-weight-bold">{{
                result.name
              }}</span>
              <small style="color: grey"
                >@{{ result.username }}
                <span
                  v-if="!signedInUser.follows.includes(result._id)"
                  class="disabled-message pl-2"
                  >adlı kişiye mesaj gönderemezsin</span
                ></small
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      searchText: "",
      awaitingSearch: false,
      isLoaderShow: false,
    };
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
  computed: {
    ...mapGetters({
      isModalShow: "newMessageModalShow",
      searchResults: "searchResults",
      noResult: "noResult",
      signedInUser: "signedInUser",
    }),
  },
  methods: {
    ...mapMutations({
      toggleNewMessageModal: "toggleNewMessageModal",
      clearSearchResults: "clearSearchResults",
      toggleNoResult: "toggleNoResult",
      toggleNewMessageModal: "toggleNewMessageModal",
    }),
    ...mapActions({
      addNewConversation: "addNewConversation",
    }),
    clear() {
      this.searchText = "";
      this.clearSearchResults();
    },
  },
};
</script>

<style scoped>
.new-message-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  z-index: 55;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fa-times {
  font-size: 30px;
  cursor: pointer;
}

.fa-search {
  color: #8899a6;
}

.new-message {
  width: 650px;
  background: #15202b;
  border-radius: 25px;
  min-height: 700px;
}

.search-area {
  background: #253341;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #38444d;
}

.search-area input {
  width: 100%;
  margin-left: 20px;
  font-size: 20px;
  outline: none;
  color: white;
}

header {
  border-bottom: 1px solid #38444d;
}

.title {
  font-size: 1.5rem !important;
}

.friends-list {
  height: 575px;
  overflow-y: scroll;
}

.friends-list li {
  text-decoration: none;
  border-bottom: 1px solid #38444d;
  cursor: pointer;
  position: relative;
}

.friends-list li:hover {
  background: #192734;
}

li.disabled::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 720px) {
  .new-message {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .friends-list {
    height: 100%;
  }
}
</style>
