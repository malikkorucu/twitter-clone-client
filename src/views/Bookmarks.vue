<template>
  <div class="bookmarks-page">
    <app-header title="Yer İmler"></app-header>
    <app-tweet-card
      :key="tweet._id"
      v-for="tweet in bookmarks"
      :tweet="tweet"
    ></app-tweet-card>
  </div>
</template>

<script>
import header from "../components/common/header";
import tweetCard from "../components/tweet/tweetCard";
import { mapGetters } from "vuex";

export default {
  components: {
    appHeader: header,
    appTweetCard: tweetCard,
  },
  computed: {
    ...mapGetters({
      bookmarks: "bookmarks",
    }),
  },
  created() {
    this.$store.dispatch("getBookmarks");
  },
};
</script>

<style scoped></style>
