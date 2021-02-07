<template>
  <div class="notifications-page">
    <app-header title="Bildirimler"></app-header>

    <ul class="notification-list p-0">
      <li
        v-for="notification in notifications"
        :key="notification._id"
        class="d-flex px-4 py-5 align-items-center"
      >
        <div class="icon-container">
          <i v-if="notification.type == 'enjoy'" class="fas fa-heart"></i>
          <i v-if="notification.type == 'tweet'" class="fab fa-twitter"></i>
          <i v-if="notification.type == 'retweet'" class="fas fa-retweet"></i>
          <i v-if="notification.type == 'message'" class="far fa-envelope"></i>
          <i v-if="notification.type == 'follow'" class="far fa-user"></i>
          <i v-if="notification.type == 'comment'" class="far fa-comments"></i>
        </div>

        <div
          v-if="notification.message"
          class="message-info pl-4 d-flex flex-column w-100 justify-content-center"
        >
          <img
            width="30"
            src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
            alt=""
            style="border-radius: 50%"
            class="mr-2 d-flex align-self-start mb-3"
          />
          <div>
            <span class="user font-weight-bold pr-3"
              >@{{ notification.user.username }}</span
            >
            {{ notification.message }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import header from "../components/common/header";
import { mapGetters } from "vuex";

export default {
  components: {
    appHeader: header,
  },
  computed: {
    ...mapGetters({
      notifications: "notifications",
    }),
  },
  created() {
    this.$store.commit("resetNotificationCount");
    this.$store.dispatch("getNotifications");
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
li {
  color: white;
  cursor: pointer;
  word-break: break-all;
  border-bottom: 1px solid rgb(116, 116, 116);
}
.icon-container {
  display: flex;
  min-height: 70px;
  border-right: 3px solid rgb(223, 223, 223);
  align-items: center;
  min-height: 100px;
  border-radius: 50%;
}
li i {
  font-size: 30px;
  padding-right: 15px;
  width: 50px;
}
.fa-heart {
  color: tomato;
}
.fa-user {
  color: #1da1f2;
}
.fa-twitter {
  color: white;
}
.fa-retweet {
  color: rgb(164, 238, 134);
}

li:hover {
  background: #1c2732;
}
</style>