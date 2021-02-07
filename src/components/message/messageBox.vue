<template>
  <div
    class="message-box"
    :class="{ open: isOpen, 'd-none': $route.name === 'messages' }"
  >
    <div class="message-box-content">
      <header
        class="d-flex justify-content-between py-4 px-4 align-items-center"
      >
        <span
          class="header text-white font-weight-bold d-flex align-items-center"
        >
          <i
            @click="
              currentMessage = '';
              selectedComponent = 'app-message-list';
            "
            v-if="currentMessage && isOpen"
            class="fas fa-arrow-left p-2 mr-4"
          ></i>
          <div class="user-info d-flex flex-column py-2">
            <span>{{ currentMessage ? currentMessage : "Mesajlar" }}</span
            ><small v-if="currentMessage">@{{currentUsername}}</small>
          </div>
        </span>

        <div class="icons">
          <i
            @click="toggleNewMessageModal()"
            v-if="!currentMessage"
            class="fas fa-envelope-open-text p-2"
          ></i>
          <i
            @click="isOpen = !isOpen"
            v-if="!isOpen"
            class="fas fa-chevron-up ml-2 p-2"
          ></i>
          <i
            @click="isOpen = !isOpen"
            v-else
            class="fas fa-chevron-down ml-2 p-2"
          ></i>
        </div>
      </header>

      <app-chat-loader></app-chat-loader>

      <component
        @message-name="
          currentMessage = $event;
          currentUsername = $event;
          selectedComponent = 'app-chat-page';
        "
        :is="selectedComponent"
      ></component>
      
    </div>
  </div>
</template>

<script>
import messageList from "./messageList";
import chatPage from "./chatPage";
import chatLoader from "./chatLoader";
import { mapMutations } from "vuex";

export default {
  components: {
    appMessageList: messageList,
    appChatPage: chatPage,
    appChatLoader: chatLoader,
  },
  data() {
    return {
      currentMessage: "",
      currentMessageUsername: "",
      isOpen: false,
      currentUsername:"",
      selectedComponent: "app-message-list",
    };
  },
  methods: {
    ...mapMutations({
      toggleNewMessageModal: "toggleNewMessageModal",
    }),
  },
  created() {
    this.$store.dispatch("getConversations");
  },
};
</script>

<style scoped>
.animate__animated {
  animation-duration: 0.5s;
}

.message-box {
  position: fixed;
  bottom: 0;
  right: 50px;
  width: 25rem;
  background: #15202b;
  box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.2);
  height: 500px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transform: translateY(440px);
  transition: 0.5s ease all;
}

.open {
  transform: translateY(0);
}

header {
  font-size: 20px;
  cursor: pointer;
  height: 60px;
  border-bottom: 1px solid #38444d;
  position: fixed;
  background: #15202b;
  width: 25rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

header i {
  font-size: 24px;
  color: #1b84c5;
  border-radius: 50%;
}

header i:hover {
  background: #162d40;
}

@media (max-width: 1050px) {
  .message-box {
    display: none;
  }
}
</style>
