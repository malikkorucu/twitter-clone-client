<template>
  <div class="tweet-card-group">
    <div @click="goSingleTweet($event, tweet)" class="tweet-card">
      <div class="a p-3 d-flex">
        <app-tweet-dropdown :tweet="tweet"></app-tweet-dropdown>
        <div class="profile_img">
          <img
            width="50"
            ref="img"
            height="50"
            class="img"
            src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
          />
          <div
            ref="overview"
            :class="{ overviewShow: isOverviewShow }"
            class="overview-user d-flex flex-column"
          >
            <img
              width="40"
              src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
              alt=""
            />
            <a class="text-white name font-weight-bold pt-2"
              ><a class="pr-3">{{ tweet.user.name }}</a
              ><i
                v-if="tweet.commentSecurity !== 'public'"
                class="fas fa-lock"
              ></i
            ></a>
            <small class="username">@{{ tweet.user.username }}</small>
           
            <div class="followers-info pt-2">
              <span class="follow">
                <strong>{{ tweet.user.follows.length }}</strong>
                <small>Takip Edilen</small>
              </span>
              <span class="followers pl-2">
                <strong>{{ tweet.user.followers.length }}</strong>
                <small>Takipçi</small>
              </span>
            </div>
          </div>
        </div>
        <div class="main-content w-100">
          <div class="user-info pl-3">
            <a class="text-white name font-weight-bold"
              ><a class="pr-3">{{ tweet.user.name }}</a
              ><i
                v-if="tweet.commentSecurity !== 'public'"
                class="fas fa-lock pr-2"
              ></i
            ></a>
            <small class="username pl-0"
              >@{{ tweet.user.username }} <strong class="px-1">.</strong>
              {{ tweet.createdAt | moment("from", "now") }}</small
            >
            <div v-if="tweet.parentId" class="d-block answer-comment py-1">
              <a
                @click="goSingleUserPage(tweet.parentId.user._id)"
                class="comment-username"
                >@{{ tweet.parentId.user.username }}</a
              >
              adlı kişiye yanıt olarak
            </div>
            <p class="text-white py-2">
              {{ tweet.text }}
            </p>
            <!-- <div class="tweet-img pb-2">
            <img width="100%" height="250" src=""
            alt="" />
          </div> -->
            <app-tweet-icons :tweet="tweet"></app-tweet-icons>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tweetDropdown from "./tweetDropdown";
import tweetIcons from "../toolbox/tweetIcons";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isOverviewShow: false,
    };
  },
  components: {
    appTweetDropdown: tweetDropdown,
    appTweetIcons: tweetIcons,
  },
  props: {
    tweet: {
      required: true,
    },
  },
  methods: {
    ...mapActions({
      getSingleTweet: "getSingleTweet",
    }),
    overviewControl() {
      this.$refs.img.addEventListener("mouseover", (e) => {
        this.isOverviewShow = true;
      });
      this.$refs.img.addEventListener("mouseleave", (e) => {
        this.isOverviewShow = false;
      });
    },
    goSingleUserPage(userId) {
      console.log(userId);
    },
    goSingleTweet(e, tweet) {
      let tmp = e.path.find((el) => {
        if (el.classList && el.classList.contains("n-clickable")) return el;
      });

      if (!tmp) {
        let tweetId = this.tweet._id;

        this.$router.push({ name: "single-tweet", params: { tweetId } });
        if (tweet.parentId) {
          this.$store.dispatch("getSingleTweet", tweetId);
          this.$store.dispatch("getCommentsOfTweet", tweetId);
        }
      }
    },
  },
  mounted() {
    this.overviewControl();
  },
};
</script>

<style scoped>
.answer-comment {
  color: rgb(185, 184, 184);
  font-size: 14px;
}
.comment-username {
  color: rgb(14, 160, 228) !important;
}
.comment-username:hover {
  text-decoration: underline !important;
}
.tweet-card {
  border-bottom: 1px solid #253341;
  transition: 0.3s ease all;
  cursor: pointer;
  position: relative;
  background: #15202b;
}
.tweet-card:hover {
  background: #192734;
}
.overview-user {
  background: #15202b;
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.2);
  width: 200px;
  position: absolute;
  width: 230px;
  left: 0;
  top: 70px;
  border-radius: 20px;
  padding: 10px;
  display: none !important;
  transition: 1s;
}

.overview-user small {
  padding: 0;
}
.overviewShow {
  display: flex !important;
  z-index: 1;
}
.follow:hover,
.followers:hover {
  text-decoration: underline;
}
.followers-info {
  color: white;
}
.followers-info .follow small {
  color: rgb(185, 184, 184);
}
.followers-info .followers small {
  color: rgb(185, 184, 184);
}

.profile_img {
  position: relative;
}
.profile_img img {
  border-radius: 50%;
}
.username {
  color: #91929f;
  padding-left: 15px;
  font-size: 14px;
}

.tweet-img {
  width: 100%;
}
.tweet-img img {
  object-fit: cover;
  border-radius: 20px;
  border: 1px solid #51606d;
}

@media (max-width: 720px) {
  .mini-buttons {
    width: 90%;
  }
}
</style>
