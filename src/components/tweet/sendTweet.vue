<template>
  <div
    :class="{ showEmojiPicker: showPicker }"
    class="add-tweet px-4 d-flex py-2"
  >
    <div class="user_img">
      <img
        width="50"
        class="profile_img mr-3"
        src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
      />
    </div>

    <div class="c d-flex flex-column w-100">
      <label class="textareaContainer">
        <textarea
          @click="isClickToTweet = true"
          maxlength="140"
          v-model="tweetText"
          name="text"
          placeholder="Neler Oluyor?"
        ></textarea>
      </label>
      <div
        :class="{ 'd-none': isComment }"
        @click="displayTweetOption = !displayTweetOption"
        class="isPublic"
      >
        <div v-if="isClickToTweet" class="isPublicBtn text-white mb-3">
          <i
            v-if="currentTweetOption == 'Herkes yanıtlayabilir'"
            class="fas fa-globe-asia"
          ></i>
          <i
            v-if="currentTweetOption == 'Takip ettiğin kişiler'"
            class="fas fa-users"
          ></i>
          <i
            v-if="currentTweetOption == 'Yalnızca bahsettiğin kişiler'"
            class="fas fa-at"
          ></i>
          {{ currentTweetOption }}

          <div
            :class="{ showDropdown: displayTweetOption }"
            class="dropdown mt-3"
          >
            <h5 class="font-weight-bold text-white px-4 py-4">
              Kimler yanıtlayabilir?
            </h5>
            <p class="px-4">
              Bu tweeti kimlerin yanıtlayabileceğini seç. Bahsedilen herkes her
              zaman yanıtlayabilir.
            </p>
            <ul>
              <li
                value="public"
                @click="currentTweetOption = 'Herkes yanıtlayabilir'"
                class="d-flex justify-content-between"
              >
                <div class="option">
                  <i class="fas fa-globe-americas px-4"></i> Herkes
                </div>
                <i
                  v-if="currentTweetOption === 'Herkes yanıtlayabilir'"
                  class="fas fa-check align-self-end pr-5"
                ></i>
              </li>

              <li
                value="followers"
                @click="currentTweetOption = 'Takip ettiğin kişiler'"
                class="d-flex justify-content-between"
              >
                <div class="option">
                  <i class="fas fa-users px-4"></i>Takip ettiğin kişiler
                </div>
                <i
                  v-if="currentTweetOption == 'Takip ettiğin kişiler'"
                  class="fas fa-check align-self pr-5"
                ></i>
              </li>
              <li
                value="known"
                @click="currentTweetOption = 'Yalnızca bahsettiğin kişiler'"
                class="d-flex justify-content-between"
              >
                <div class="option">
                  <i class="fas fa-at px-4"></i>Yalnızca bahsettiğin kişiler
                </div>
                <i
                  v-if="currentTweetOption == 'Yalnızca bahsettiğin kişiler'"
                  class="fas fa-check pr-5"
                ></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div
        class="bottom-container d-flex justify-content-between align-items-center"
      >
        <div class="icons d-flex">
          <i class="far fa-image"></i>
          <div class="emoji">
            <i
              @click="showPicker = !showPicker"
              class="far fa-smile-beam pl-3"
            ></i>
            <VEmojiPicker
              class="emoji-picker"
              :class="{ show: pickerIsShow }"
              @select="selectEmoji"
            />
          </div>

          <i class="fas fa-poll-h pl-3"></i>
          <i class="far fa-calendar-alt pl-3"></i>
        </div>
        <div class="actions-container d-flex align-items-center">
          <div class="add-extra d-flex pr-4">
            <div
              v-if="tweetText.length > 0"
              class="pr-3 d-flex align-items-center justify-content-center"
            >
              <app-progress-circle
                :completedSteps="tweetText.length"
                :totalSteps="140"
              ></app-progress-circle>
            </div>
            <div v-if="tweetText.length > 0" class="pl-3 border-left">
              <button class="plus-btn">+</button>
            </div>
          </div>
          <app-button
            @click.native="sendTweetData"
            type="primary"
            size="medium"
            title="Tweetle"
          ></app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import progressCircle from "../toolbox/progressCircle";
import button from "../toolbox/button";
import VEmojiPicker from "v-emoji-picker";
import { mapGetters } from "vuex";

export default {
  props: ["isComment"],
  components: {
    appProgressCircle: progressCircle,
    appButton: button,
    VEmojiPicker,
  },
  data() {
    return {
      isClickToTweet: false,
      tweetText: "",
      currentTweetOption: "Herkes yanıtlayabilir",
      displayTweetOption: false,
      pickerIsShow: false,
      showPicker: false,
    };
  },
  computed: {
    ...mapGetters({
      isCommentModalShow: "isCommentModalShow",
      commentModalTweet: "commentModalTweet",
    }),
  },
  watch: {
    currentTweetOption() {
      this.$store.commit("setCurrentOption", this.currentTweetOption);
    },
  },
  methods: {
    closeEmojiPicker() {
      window.addEventListener("click", (e) => {
        let a = e.path.find((el) => {
          if (el.classList && el.classList.contains("emoji")) {
            return el;
          }
        });

        if (!a) {
          this.showPicker = false;
        }
      });
    },
    selectEmoji(emoji) {
      this.tweetText += emoji.data;
    },
    sendTweetData() {
      const user = this.$store.getters.signedInUser;

      let tweet = {
        user: user._id,
        text: this.tweetText,
        followers: user.followers,
        commentSecurity: this.getTweetOption(),
      };

      if (this.tweetText) {
        if (this.isCommentModalShow) {
          this.$store.dispatch("addTweet", {
            ...tweet,
            parentId: this.commentModalTweet._id,
          });
        } else {
          this.$store.dispatch("addTweet", tweet);
        }
      } else {
        this.$store.dispatch("alert", {
          message: "lütfen tweet alanını doldurunuz",
          type: "warning",
          duration: 5000,
        });
      }

      this.tweetText = "";
    },
    getTweetOption() {
      let option;

      if (this.currentTweetOption === "Herkes yanıtlayabilir") {
        option = "public";
      } else if (this.currentTweetOption === "Takip ettiğin kişiler") {
        option = "only_followers";
      } else {
        option = "known_users";
      }

      return option;
    },
  },
  mounted() {
    this.closeEmojiPicker();
  },
};
</script>

<style scoped>
.emoji {
  position: relative;
}
.emoji-picker {
  position: absolute;
  bottom: -450px;
  left: -80px;
  opacity: 0;
  z-index: -1;
  transition: 0.3s ease opacity;
}
.add-tweet {
  border-bottom: 10px solid #253341;
  transition: 0.3s ease all;
}
.add-tweet.showEmojiPicker {
  height: 650px;
}
.add-tweet.showEmojiPicker .emoji-picker {
  opacity: 1;
  z-index: 1;
}
.profile_img {
  border-radius: 50%;
}
.textareaContainer {
  display: block;
  width: 100% !important;
}
textarea {
  width: 100%;
  margin: 0;
  min-height: 80px;
  border-width: 0;
  outline: none;
  padding-top: 17px;
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 22px;
}
.icons i {
  font-size: 21px;
  color: #51a0dc;
  overflow: hidden;
  cursor: pointer;
}
.icons i:hover {
  color: rgb(194, 194, 194);
}
.plus-btn {
  color: #51a0dc;
  border: 1px solid #51a0dc;
  font-size: 30px;
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 2px;
  outline: none;
}
.isPublicBtn {
  font-size: 15px;
  padding: 2px;
  color: #46a6f0 !important;
  font-weight: bold;
  position: relative;
  display: inline;
  cursor: pointer;
}
.isPublicBtn i {
  padding-right: 3px;
  font-size: 20px;
}
.dropdown {
  background: #15202b;
  list-style-type: none;
  padding: 0;
  width: 320px;
  box-shadow: 0 0 7px 1px rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  position: absolute;
  z-index: 8;
  left: 60%;
  transform: translateX(-50%);
  display: none;
}
.dropdown p {
  color: #7e8e9b;
}
.dropdown ul {
  list-style: none;
  padding: 0;
}
.dropdown ul li {
  padding: 15px 0;
}
.dropdown ul li:hover {
  background: #192734;
}
.showDropdown {
  display: block;
}

@media (max-width: 720px) {
  .emoji-picker {
    left: -25%;
    transform: translateX(-22.5%);
  }
}
</style>
