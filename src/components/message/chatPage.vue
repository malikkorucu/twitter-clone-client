<template>
  <div class="chat-page" :class="{ 'message-page': $route.name == 'messages' }">
    <div
      v-if="$route.name == 'messages' && conversation._id"
      class="conversation-header text-white d-flex justify-content-between py-1 pr-3"
    >
      <span class="btn-group pl-1">
        <i
          @click="toggleNewMessageModal()"
          class="fas fa-envelope-open-text p-2"
        ></i>
        <i
          @click="$emit('open-message-list', true)"
          class="far fa-comments p-2"
        ></i>
      </span>
      <span>
        <span class="pr-3">
          @{{
            conversation.user._id !== signedInUser._id
              ? conversation.user.username
              : conversation.with_user.username
          }}
        </span>
        <img
          width="35"
          ref="img"
          height="35"
          class="img"
          style="border-radius: 50%"
          src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
        />
      </span>
    </div>
    <div ref="messagebox" class="message-content-general">
      <span
        @click="scrollToBottom()"
        v-if="!isInMessagePage && conversation._id"
        class="scroll-btn-messagepage"
      >
        <i class="fas text-white fa-angle-double-down"></i>
      </span>
      <div
        v-if="!conversation._id"
        class="btn-container d-flex justify-content-center flex-column h-100"
      >
        <app-button
          @click.native="$emit('open-conversation-list', true)"
          class="text-center"
          type="primary"
          :block="false"
          size="medium"
          title="Var olan bir sohbet seç"
        ></app-button>
        <app-button
          class="text-center"
          type="secondary"
          :block="false"
          size="medium"
          title="Yeni bir sohbet başlat"
        ></app-button>
      </div>
      <div
        v-for="message in messages"
        :key="message._id"
        class="message-container px-3"
      >
        <div
          :class="{
            'justify-content-end outgoing': message.user == signedInUser._id,
            'justify-content-start incoming': message.user !== signedInUser._id,
          }"
          class="message-card d-flex my-2"
        >
          <div class="message-content d-flex flex-column">
            <span
              :class="{
                'text-end': message.user == signedInUser._id,
                'text-start': message.user !== signedInUser._id,
              }"
              class="text d-inline-block px-4 py-2"
              >{{ message.text.trim() }}</span
            >
            <div
              :class="{
                'justify-content-end': message.user == signedInUser._id,
              }"
              class="seen d-flex pt-2"
            >
              <small class="date"
                >{{ message.createdAt | moment("ddd, hA") }}
                <strong class="text-primary">✓</strong></small
              >
            </div>
          </div>
        </div>
      </div>
      <span
        v-if="isInMessagePage"
        @click="scrollToBottom()"
        class="scroll-bottom-btn"
      >
        <i class="fas text-white fa-angle-double-down"></i>
      </span>

      <transition
        enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOut"
      >
        <VEmojiPicker
          @select="selectEmoji"
          v-if="isEmojiOpen"
          class="emoji-picker animate__animated"
        />
      </transition>
    </div>
    <div class="input-containerx d-flex w-100 position-relative">
      <div
        v-if="conversation._id"
        class="message-input-area d-flex w-100 px-2 py-2"
      >
        <div class="input-container">
          <input
            v-model="text"
            @keypress.enter="sendMessage()"
            placeholder="Yeni bir mesaja başla"
            type="text"
            name="text"
            id="text"
          />
          <i @click="isEmojiOpen = !isEmojiOpen" class="far fa-smile"></i>
        </div>
        <i @click="sendMessage()" class="far fa-paper-plane ml-2"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import VEmojiPicker from "v-emoji-picker";
import button from "../toolbox/button";

export default {
  components: {
    VEmojiPicker,
    appButton: button,
  },
  data() {
    return {
      conversationId: null,
      text: "",
      isEmojiOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      signedInUser: "signedInUser",
      socket: "getSocket",
      messages: "messagesOfSingleConversation",
      conversation: "currentConversation",
    }),
    isInMessagePage() {
      return this.$route.name !== "messages";
    },
  },
  methods: {
    ...mapMutations({
      toggleNewMessageModal: "toggleNewMessageModal",
    }),
    scrollToBottom() {
      const elem = document.querySelector(".message-content-general");
      if (elem) {
        elem.scrollTop = elem.scrollHeight - elem.scrollWidth;
      }
    },

    selectEmoji(emoji) {
      this.text += emoji.data;
    },

    sendMessage() {
      const time = new Date().getHours() + ":" + new Date().getMinutes();
      this.conversationId = this.$store.getters.currentConversation._id;

      let messageData = {
        text: this.text,
        conversationId: this.conversationId,
        user: this.signedInUser._id,
        createdAt: new Date(),
        _id: Math.random() * 10000000000000,
      };

      this.scrollToBottom();
      this.isEmojiOpen = false;
      this.$store.commit("addMessageToArray", messageData);
      this.socket.emit("outgoingMessage", messageData);
      this.$store.dispatch("sendMessage", messageData);
      this.text = "";
    },
  },
  created() {
    this.conversationId = this.$store.getters.currentConversation._id;
    if (this.$route.name !== "messages") {
      this.$store.dispatch("getConversationMessages", this.conversationId);
    }
  },
  mounted() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 300);
    this.socket.emit("joinConversation", this.conversationId);
    this.socket.on("comingMessage", (msg) => {
      if (msg.user !== this.signedInUser._id) {
        this.$store.commit("addMessageToArray", msg);
      }
      this.scrollToBottom();
    });
  },
};
</script>

<style scoped>
.animate__animated {
  animation-duration: 0.3s;
}
* {
  box-sizing: border-box;
}
.emoji-picker {
  width: 75% !important;
  position: fixed;
  left: 50%;
  bottom: 50px;
  z-index: 75 !important;
  transform: translateX(-50%);
}
.chat-page {
  padding-top: 65px;
  background: #15202b;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.conversation-header {
  color: rgb(191, 191, 191) !important;
  background: #192734;
  border-bottom: 3px solid #38444d;
}
.message-content-general {
  padding-bottom: 150px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  height: 435px;
  position: relative;
}
.message-page.chat-page {
  padding-top: 0;
}
.message-page.chat-page .message-content-general {
  height: 90vh;
  overflow-y: scroll;
}

.outgoing .text {
  background: #1a91da;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  color: rgb(233, 233, 233);
}
.incoming .text {
  background: #243748;
  color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}
.date {
  color: rgb(181, 181, 181);
}
.message-input-area {
  border-top: 1px solid grey;
  bottom: 0;
  position: absolute;
  background: #15202b;
}
.input-container {
  width: 100%;
  position: relative;
}
.message-input-area input {
  width: 100%;
  background: #253341;
  border-radius: 25px;
  padding: 9px 15px;
  outline: none;
  border: 1px solid #253341;
  color: white;
}
.message-input-area input:focus {
  border: 1px solid #1f6b9b;
}
.scroll-bottom-btn {
  display: inline-flex;
  position: fixed;
  right: 10px;
  padding: 10px;
  border-radius: 50%;
  height: 35px;
  width: 35px;
  justify-content: center;
  align-items: center;
  bottom: 75px;
  cursor: pointer;
  transition: 0.2s;
  background: rgba(140, 140, 140, 0.1);
}
.scroll-bottom-btn:hover {
  background: #3a4754;
}
.scroll-btn-messagepage {
  position: sticky;
  top: 78vh;
  left: 15px;
  font-size: 25px;
  border-radius: 50%;
  width: 40px;
  cursor: pointer;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.scroll-btn-messagepage:hover {
  background: #3a4754;
}
.fa-smile {
  position: absolute;
  right: 7px;
  cursor: pointer;
  font-size: 25px !important;
  top: 50%;
  transform: translateY(-50%);
}
.message-input-area i {
  font-size: 30px;
  color: #1f6b9b;
}
.btn-group i {
  font-size: 24px;
  color: #1b84c5;
  border-radius: 50%;
  cursor: pointer;
}

.btn-group i:hover {
  background: #162d40;
}

@media (max-width: 720px) {
  .message-page.chat-page .message-content-general {
    height: 84vh;
  }
}
</style>
