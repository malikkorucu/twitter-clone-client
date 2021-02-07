<template>
  <div class="aside-table">
    <div
      class="title py-3 px-4 d-flex justify-content-between align-items-center"
    >
      En Son Bildirimler <i class="fas fa-cog"></i>
    </div>
    <ul>
      <h5 v-if="lastActions.length === 0" class="text-white text-center pt-5">
        henüz bildirim yok !
      </h5>
      <transition-group name="slide" mode="out-in">
        <li :key="action._id" v-for="(action, i) in lastActions">
          <small class="count">{{ i + 1 }}. Bildirim</small>
          <h6 class="font-weight-bold text-white p-0 m-0">
            @{{ action.createdBy.username }}
          </h6>
          <span class="tweet-count">{{ action.message }}</span>
          <span class="icon-group">
            <i v-if="action.type == 'enjoy'" class="fas fa-heart"></i>
            <i v-if="action.type == 'admin'" class="fab fa-twitter"></i>
            <i v-if="action.type == 'retweet'" class="fas fa-retweet"></i>
            <i v-if="action.type == 'message'" class="far fa-envelope"></i>
            <i v-if="action.type == 'follow'" class="far fa-user"></i>
            <i v-if="action.type == 'comment'" class="far fa-comments"></i>
          </span>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      lastActions: "lastActions",
    }),
  },
};
</script>

<style scoped>
.count {
  color: #8494a1;
  font-size: 13px;
}
.tweet-count {
  font-size: 17px;
  color: rgb(216, 216, 216);
}
.title {
  font-size: 25px !important;
  font-weight: bold !important;
  color: rgb(226, 226, 226);
  border-bottom: 1px solid #38444d;
}
.aside-table {
  background: #192734;
  border-radius: 20px;
}
.aside-table ul {
  list-style-type: none;
  padding: 0;
  min-height: 200px;
}
.aside-table ul li {
  padding: 10px 20px;
  border-bottom: 1px solid #38444d;
  cursor: pointer;
  background: #192734;
  position: relative;
}
.aside-table ul li:last-child {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.aside-table ul li:hover {
  background: #202e3a;
}
.fa-cog {
  color: #1e81bf;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer#1e81bf;
}
.fa-cog:hover {
  background: #193348;
}
.more {
  color: #1e81bf;
  font-size: 16px;
}
.icon-group {
  position: absolute;
  right: 10px;
  top: 32%;
  transform: translateY(-50%);
}
.icon-group i {
  font-size: 28px;
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
.fa-envelope {
  color: #dfe9f0;
}

@media (max-width: 720px) {
  .aside-table {
    display: none;
  }
}
</style>
