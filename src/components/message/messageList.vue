<template>
  <div class="content" :class="{ 'message-page': $route.name == 'messages' }">
    <ul class="p-0 message-card-container">
      <li
        @click="
          $emit(
            'message-name',
            conversation.user._id !== signedInUser._id
              ? conversation.user.name
              : conversation.with_user.name
          );
          $emit(
            'message-username',
            conversation.user._id !== signedInUser._id
              ? conversation.user.username
              : conversation.with_user.username
          ),
          $emit('is-message-list-show',
            false
          )
            $store.commit('setCurrentConversation', conversation);
          changeConversation();
        "
        v-for="conversation in conversations"
        :key="conversation._id"
        class="message-card d-flex p-3 align-items-center"
      >
        <img
          width="50"
          ref="img"
          height="50"
          class="img"
          style="border-radius: 50%"
          src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
        />
        <div class="user-info d-flex justify-content-between px-3 w-100">
          <div>
            <span class="user">
              <span class="name text-white font-weight-bold">{{
                conversation.user._id !== signedInUser._id
                  ? conversation.user.name
                  : conversation.with_user.name
              }}</span>
              <small class="pl-2">@{{ conversation.with_user.username }}</small>
            </span>
            <div class="message-summary">
              <p class="m-0">Lorem ipsum dolor sit amet...</p>
            </div>
          </div>
          <span class="date align-self-start">11 Aug</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      conversations: "conversations",
      signedInUser: "signedInUser",
    }),
  },
  methods: {
    changeConversation() {
      if (this.$route.name == "messages") {
        this.conversationId = this.$store.getters.currentConversation._id;
        this.$store.dispatch("getConversationMessages", this.conversationId);
        setTimeout(()=> {
          this.scrollToBottom()
        },300)
      }
    },
    scrollToBottom() {
      const elem = document.querySelector(".message-content-general");
      if (elem) {
        elem.scrollTop = elem.scrollHeight - elem.scrollWidth;
      }
    },
  },
};
</script>

<style scoped>
.content {
  overflow-y: scroll;
  height: 500px;
  padding-top: 60px !important;
}

li {
  border-bottom: 1px solid #38444d;
  cursor: pointer;
}

li:hover {
  background: #192734;
}

.message-summary,
small,
.date {
  color: #9aa2a9;
}

.date {
  font-size: 15px;
}
</style>