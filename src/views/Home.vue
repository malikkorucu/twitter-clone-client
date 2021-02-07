<template>
  <div class="home-page">
    <div class="left-side">
      <app-header title="Anasayfa"></app-header>
      <app-send-tweet class="send-tweet"></app-send-tweet>
      <transition-group name="slide">
        <app-tweet-card
          v-for="tweet in tweets"
          :key="tweet._id"
          :tweet="tweet"
        ></app-tweet-card>
      </transition-group>
    </div>
  </div>
</template>

<script>
import addTweet from "../components/tweet/sendTweet";
import tweetCard from "../components/tweet/tweetCard";
import header from "../components/common/header";
import { mapGetters } from "vuex";

export default {
  components: {
    appSendTweet: addTweet,
    appTweetCard: tweetCard,
    appHeader: header,
  },
  computed: {
    ...mapGetters({
      tweets: "tweets",
    }),
  },
  created() {
    this.$store.dispatch("getAllTweets");
    let token = 'Bearer: ' + this.$cookies.get("token")

    this.$http.get("auth/test", {
      headers: {
        Authorization: token
      },
    })
  },
};
</script>

<style scoped>


@media (max-width: 1100px) {
  .right-side {
    display: none;
  }

  .container-fluid {
    padding: 0 !important;
    margin: 0 !important;
  }
}


</style>
