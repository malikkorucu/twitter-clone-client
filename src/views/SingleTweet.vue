<template>
  <div class="singleTweet">
    <app-header title="Tweetle"></app-header>
    <div class="single-tweet-container">
      <div class="user-info d-flex align-items-center p-3">
        <img
          width="50"
          style="border-radius:50%"
          src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
          alt=""
        />
        <div class="username-container d-flex flex-column pl-2">
          <span class="name font-weight-bold text-white">{{
            singleTweet.user ? singleTweet.user.name : ""
          }}</span>
          <small
            >@{{ singleTweet.user ? singleTweet.user.username : "" }}</small
          >
        </div>
      </div>
      <p class="tweet-text pt-3 px-3">
        {{ singleTweet.text }}
      </p>
      <!-- <div class="tweet-img pb-2">
        <img width="100%" height="250" src="" alt="" />
      </div> -->
      <span class="date py-2 px-3 d-inline-block">{{
        new Date() | moment("from", "now")
      }}</span>
      <div class="divider"></div>
      <div class="tweet-socials py-2 px-3">
        <span class="item">
          <strong class="text-white font-weight-bold">{{
            singleTweet.retweet ? singleTweet.retweet.length : 0
          }}</strong>
          Retweet
        </span>
        <span class="item pl-2">
          <strong class="text-white font-weight-bold">{{
            singleTweet.retweet ? singleTweet.retweet.length : 0
          }}</strong>
          Alıntı Tweet
        </span>
        <span class="item pl-2">
          <strong class="text-white font-weight-bold">{{
            singleTweet.enjoys ? singleTweet.enjoys.length : 0
          }}</strong>
          Beğeni
        </span>
      </div>
      <div class="divider"></div>
      <app-tweet-icons class="px-3" :tweet="singleTweet"></app-tweet-icons>
      <div class="divider"></div>

      <transition-group name="slide">
        <app-tweet-card
          :tweet="tweet"
          :key="tweet._id"
          v-for="tweet in comments"
        ></app-tweet-card>
      </transition-group>
    </div>
  </div>
</template>

<script>
import header from "../components/common/header";
import tweetIcons from "../components/toolbox/tweetIcons";
import tweetCard from "../components/tweet/tweetCard";
import { mapGetters } from "vuex";

export default {
  components: {
    appHeader: header,
    appTweetIcons: tweetIcons,
    appTweetCard: tweetCard,
  },
  computed: {
    ...mapGetters({
      singleTweet: "singleTweet",
      comments: "comments",
    }),
  },
  created() {
    let tweetId = this.$route.params.tweetId;
    this.$store.dispatch("getSingleTweet", tweetId);
    this.$store.dispatch("getCommentsOfTweet", tweetId);
  },
};
</script>

<style scoped>
.tweet-img {
  width: 100%;
}
.tweet-img img {
  object-fit: cover;
  border-radius: 20px;
  border: 1px solid #51606d;
}
.username-container small {
  color: #8899a6;
}
.tweet-text {
  color: white;
  letter-spacing: 1px;
  font-size: 20px;
}
.date {
  color: #8899a6;
}
.tweet-socials span {
  color: #8899a6;
  cursor: pointer;
  font-size: 14px;
}
.tweet-socials span:hover {
  text-decoration: underline;
}
/* .slide-enter {
} */
.slide-enter-active {
  animation: slide-in 0.5s ease forwards;
}
/* .slide-leave {
} */
.slide-leave-active {
  animation: slide-out 0.5s ease forwards;
}

.slide-move {
  transition: transform 0.5s;
}
</style>
