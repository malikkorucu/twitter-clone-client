<template>
  <div class="mini-buttons d-flex w-100 justify-content-between pr-5 ">
    <span v-if="tweet.commentSecurity === 'public'" class="comments n-clickable"
      ><i
        @click="toggleIsCommentModalShow(tweet)"
        :class="{ 'clicked-comment': false, fas: false }"
        class="far fa-comment"
      ></i
      ><small class="pl-1">{{ tweet.comments.length }}</small></span
    >

    <div class="re-tweet n-clickable">
      <span
        v-click-outside="closeEvent"
        @click="retweetDropdown = !retweetDropdown"
        class="icon"
        ><i class="fas fa-retweet"></i
        ><small class="pl-1">{{ tweet.retweets.length }}</small>
      </span>

      <transition
        enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOut"
        appear
      >
        <div v-if="retweetDropdown" class="retweet-dropdown animate__animated">
          <ul>
            <li><i class="fas fa-retweet text-white"></i>Retweeti geri al</li>
            <li><i class="fas fa-retweet text-white"></i> Retweet</li>
            <li><i class="fas fa-pencil-alt text-white"></i>Tweeti alıntıla</li>
          </ul>
        </div>
      </transition>
    </div>

    <span class="heart n-clickable" @click="enjoy(tweet)"
      ><i
        :class="{
          'fas clicked-heart': tweet.enjoys.includes(signedInUser._id),
        }"
        class="far fa-heart"
      ></i
      ><small class="pl-1">{{ tweet.enjoys.length }}</small></span
    >

    <span class="share position-relative n-clickable">
      <i
        v-click-outside="closeShare"
        @click="shareShow = !shareShow"
        class="fas fa-share-square"
      ></i>

      <transition
        enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOut"
      >
        <div v-if="shareShow" class="share-dropdown animate__animated">
          <ul>
            <li>
              <i class="far fa-envelope text-white pr-3"></i>Direkt Mesaj ile
              gönder
            </li>
            <li
              v-if="!signedInUser.bookmarks.includes(tweet._id)"
              @click="addToBookmarks(tweet._id)"
            >
              <i class="far fa-bookmark text-white pr-4"></i>Tweet'i Yer
              İmlerine ekle
            </li>
            <li v-else @click="addToBookmarks(tweet._id)">
              <i class="far fa-bookmark text-white pr-4"></i>Tweet'i Yer
              İmlerinden kaldır
            </li>
            <li>
              <i class="fas fa-link text-white pr-3"></i>Tweetin bağlantısını
              kopyala
            </li>
          </ul>
        </div>
      </transition>
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    tweet: {
      required: true,
    },
  },
  data() {
    return {
      retweetDropdown: false,
      shareShow: false,
    };
  },
  computed: {
    ...mapGetters({
      signedInUser: "signedInUser",
    }),
  },
  methods: {
    ...mapActions({
      enjoyTweet: "enjoyTweet",
      addToBookmarks: "addToBookmarks",
      updateSingleTweet: "updateSingleTweet",
    }),
    ...mapMutations({
      toggleIsCommentModalShow: "toggleIsCommentModalShow",
      setSingleTweet: "setSingleTweet",
    }),
    closeEvent: function() {
      this.retweetDropdown = false;
    },
    closeShare() {
      this.shareShow = false;
    },
    enjoy(tweet) {
      let tweetId = this.$route.params.tweetId;
      this.enjoyTweet(tweet);

      if (tweetId) {
        this.updateSingleTweet(tweetId);
      }
    },
  },
};
</script>

<style scoped>
.animate__animated {
  animation-duration: 0.3s;
}
.mini-buttons i {
  font-size: 17px;
  color: #51606d;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
}
.re-tweet .icon:hover {
  color: #17bf63;
}
.mini-buttons span {
  color: #51606d;
  cursor: pointer;
}
.comments i {
  border-radius: 50%;
}
.comments:hover {
  color: #1da1f2;
}
.reply {
  border-radius: 50%;
}
.reply:hover {
  background: #193348;
}
.reply i:hover {
  color: #98c8e6;
}
.comments:hover i {
  color: #1da1f2;
  background: #193348;
}
.clicked-comment {
  color: #1da1f2 !important;
}

.re-tweet span i:hover {
  color: #17bf63;
  background: #193348;
}
.heart:hover i {
  color: #e0245e;
  background: #193348;
}
.heart:hover {
  color: #e0245e;
}
.clicked-heart {
  color: #e0245e !important;
}
.retweet-dropdown {
  position: absolute;
  z-index: 5;
  border-radius: 15px;
}
.retweet-dropdown ul {
  padding: 0;
  list-style: none;
  border-radius: 15px;
  border-top-left-radius: 0px;
  box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.3);
}
.retweet-dropdown ul li {
  background: #15202b;
  color: white;
  padding: 15px 15px 15px 5px;
  transition: 0.3s ease all;
}
.retweet-dropdown ul li:first-of-type {
  border-top-right-radius: 15px;
}
.retweet-dropdown ul li:last-of-type {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.retweet-dropdown ul li:hover {
  background: #213a4f;
  color: white;
}
.share i:hover {
  color: #1da1f2;
  background: #193348;
}
.share-dropdown {
  position: absolute;
  z-index: 5;
  width: 260px;
  right: 45px;
}
.share-dropdown ul {
  list-style: none;
  padding: 0;
  box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.3);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.share-dropdown ul li {
  background: #15202b;
  padding: 15px 15px 15px 5px;
  color: white;
}
.share-dropdown ul li:first-of-type {
  border-top-left-radius: 15px;
}
.share-dropdown ul li:last-of-type {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.share-dropdown ul li:hover {
  background: #213a4f;
}
</style>
