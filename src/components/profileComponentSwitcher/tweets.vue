<template>
  <div>
    <app-tweet-card
      :key="tweet._id"
       v-for="tweet in tweets"
      :tweet="tweet"
    ></app-tweet-card>
  </div>
</template>

<script>
import TweetCard from "../tweet/tweetCard";
import { mapGetters } from "vuex";

export default {
  components: {
    appTweetCard: TweetCard,
  },
  computed: {
    ...mapGetters({
      tweets: "tweets",
    }),
  },
  created() {},
};
</script>

<style scoped></style>
