<template>
  <div class="messages-page">
    <app-header title="Mesajlar"></app-header>
    <app-chat-page
      @open-message-list="conversationListShow = $event"
      @open-conversation-list="conversationListShow = $event"
    ></app-chat-page>
    <transition
      enter-active-class="animate__slideInDown"
      leave-active-class="animate__slideOutUp"
    >
      <app-message-list
        @is-message-list-show="conversationListShow = $event"
        v-if="conversationListShow"
        class="conversations animate__animated"
      ></app-message-list>
    </transition>
  </div>
</template>
<script>
import header from "../components/common/header";
import messageList from "../components/message/messageList";
import chatPage from "../components/message/chatPage";

export default {
  components: {
    appHeader: header,
    appMessageList: messageList,
    appChatPage: chatPage,
  },
  data() {
    return {
      conversationListShow: false,
      selectedComponent: "chat-page",
    };
  },
  methods: {},
  created() {
    this.conversationId = this.$store.getters.currentConversation._id;
  },
};
</script>

<style scoped>
.animate__animated {
  animation-duration: 0.7s;
}
.chat-container {
  position: relative;
  width: 250px !important;
}
.conversations {
  font-size: 20px;
  border-bottom: 2px solid grey;
}
.conversations {
  position: absolute;
  top: 0;
  background: #15202b;
  width: 100%;
  height: 100%;
  padding-top: 50px !important;
}
</style>