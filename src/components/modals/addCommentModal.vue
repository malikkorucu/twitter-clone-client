<template>
  <transition enter-active-class="animate__fadeIn" leave-active-class="animate__fadeOut" v-if="isCommentModalShow">
    <div
      class="add-comment-modal d-flex justify-content-center align-items-center animate__animated"
    >
      <div class="modal-content py-3">
        <div class="header d-flex py-2 pb-5 border-bottom pl-5">
          <i @click="toggleIsCommentModalShow()" class="fas fa-times"></i>
        </div>
        <div class="tweet d-flex p-3">
          <img
            width="50"
            ref="img"
            height="50"
            style="border-radius:50%"
            class="img"
            src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
          />
          <div class="tweet-info pl-3">
            <a class="text-white name font-weight-bold"
              ><a class="pr-3">{{commentModalTweet.user.name}}</a></a
            >
            <small class="username pl-0">
              @{{commentModalTweet.user.username}} <strong class="px-1">.</strong>
              {{ commentModalTweet.createdAt | moment("from", "now") }}</small
            >
            <p class="text-white py-2">
              {{commentModalTweet.text}}
            </p>
          </div>
        </div>
        <app-send-tweet :isComment="true"></app-send-tweet>
      </div>
    </div>
  </transition>
</template>

<script>
import sendTweet from "../tweet/sendTweet";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    appSendTweet: sendTweet,
  },
  computed: {
    ...mapGetters({
      isCommentModalShow: "isCommentModalShow",
      commentModalTweet:"commentModalTweet"
    }),
  },
  methods: {
    ...mapMutations({
      toggleIsCommentModalShow: "toggleIsCommentModalShow",
    }),
  },
};
</script>

<style scoped>
.animate__animated{
  animation-duration: 0.5s;
}
.add-comment-modal {
  position: fixed;
  z-index: 15;
  background: rgba(255, 255, 255, 0.5);
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}
.modal-content {
  width: 60%;
  background: #15202b;
  border-radius: 25px;
}
.username {
  color: rgb(163, 163, 163);
}
.fa-times {
  font-size: 25px;
  color: rgb(14, 174, 209);
  cursor: pointer;
}
.tweet-info p {
  font-size: 21px;
}
@media (max-width: 720px) {
  .modal-content {
    width: 100%;
    height: 100%;
    border-radius: 0;
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>
