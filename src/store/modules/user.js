import Vue from "vue";
import io from "socket.io-client";
import { forEach } from "lodash";
import User from "../../../../server/models/User";

export default {
  state: {
    _userProfile: {},
    _searchResults: [],
    _noResult: false,
    _bookmarks: [],
    _conversations: [],
    _currentConversation: {},
    _messagesOfSingleConversation: [],
    _notifications: [],
    _lastActions: [],
    _notificationCount: 0,
    _ding: require('../../assets/messageAlert.wav')
  },
  getters: {
    userProfile(state) {
      return state._userProfile;
    },
    searchResults(state) {
      return state._searchResults;
    },
    noResult(state) {
      return state._noResult;
    },
    bookmarks(state) {
      return state._bookmarks.reverse();
    },
    conversations(state) {
      return state._conversations
    },
    currentConversation(state) {
      return state._currentConversation
    },
    messagesOfSingleConversation(state) {
      return state._messagesOfSingleConversation
    },
    notificationCount(state) {
      return state._notificationCount
    },
    lastActions(state) { return state._lastActions },
    notifications(state) { return state._notifications },
    ding(state) { return state._ding }
  },
  mutations: {
    setUserProfile(state, user) {
      state._userProfile = user;
    },
    setSearchResults(state, results) {
      state._searchResults = results;
    },
    clearSearchResults(state) {
      state._searchResults = [];
    },
    toggleNoResult(state, value) {
      state._noResult = value;
    },
    setBookmarks(state, bookmarks) {
      state._bookmarks = bookmarks;
    },
    setConversations(state, payload) {
      state._conversations = payload
    },
    setCurrentConversation(state, payload) {
      state._currentConversation = payload
    },
    setMessagesOfSingleConversation(state, payload) {
      state._messagesOfSingleConversation = payload
    },
    addMessageToArray(state, payload) {
      let tmp = state._messagesOfSingleConversation.find(el => payload._id === el._id)

      if (!tmp) {
        state._messagesOfSingleConversation.push(payload)
      }
    },
    addNotification(state, payload) {
      state._notifications.push(payload)
    },
    setNotifications(state, payload) {
      state._notifications = payload
    },
    addNewItemToLastActions(state, payload) {
      if (state._lastActions.length < 7) {
        state._lastActions.unshift(payload)
      } else {
        state._lastActions.splice(6, 1)
        state._lastActions.unshift(payload)
      }
    },
    setLastActions(state, payload) {
      state._lastActions = payload
    },
    increaseNotificationCount(state) {
      state._notificationCount++
      localStorage.setItem('not_count', JSON.stringify(state._notificationCount))
    },
    resetNotificationCount(state) {
      state._notificationCount = 0
      state._notificationCount = localStorage.setItem('not_count', JSON.stringify(state._notificationCount))
    },
    initNotificationCount(state) {
      state._notificationCount = JSON.parse(localStorage.getItem('not_count'))
    }
  },

  actions: {


    async getSingleUser({ commit, state, dispatch }, username) {
      const token = await dispatch("getTokenForSend");

      Vue.http
        .get("user/getSingleUser/" + username, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          commit("setUserProfile", res.body.data);
        })
        .catch((err) => console.log(err));
    },


    async follow_UnfollowUser(
      { getters, commit, dispatch, state },
      userProfile
    ) {
      const token = await dispatch("getTokenForSend");
      const userId = getters.signedInUser._id;

      let signedInUser = getters.signedInUser;

      if (signedInUser.follows.includes(userProfile._id)) {
        let a = signedInUser.follows.filter((item) => item !== userProfile._id);
        signedInUser.follows = a;
      } else {
        dispatch('sendNotification', { user: userProfile._id, type: 'follow', about: { topic: 'user', user: signedInUser._id } })
        signedInUser.follows.push(userProfile._id);
      }

      Vue.http
        .post(
          "user/follow/" + userId,
          { profileId: userProfile._id },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          commit("setSignedInUser", res.body.data);
          localStorage.setItem("tweeter-user", JSON.stringify(res.body.data));
          dispatch("getAllTweets");
          dispatch("getSingleUser", userProfile.username);
          dispatch("alertSuccess");
        })
        .catch((err) => console.log(err));
    },


    async getSignedInUser({ getters, commit, dispatch }) {
      let user = JSON.parse(localStorage.getItem("tweeter-user"));
      const token = await dispatch("getTokenForSend");

      console.log(user)
      Vue.http
        .get("user/getSingleUser/" + user.username, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          commit("setSignedInUser", res.body.data);
          dispatch("getAllTweets", getters.signedInUser._id);
        })
        .catch((err) => console.log(err));
    },


    async searchUser({ commit, state, dispatch }, keyword) {
      const token = await dispatch("getTokenForSend");

      Vue.http
        .get("user/search/" + keyword, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          commit("setSearchResults", res.body.data);

          if (state._searchResults.length < 1) {
            commit("toggleNoResult", true);
          }
        })
        .catch((err) => console.log(err));
    },


    async addToBookmarks({ dispatch, commit }, tweetId) {
      const token = await dispatch("getTokenForSend");

      Vue.http
        .post(
          "user/bookmarks/add",
          { tweetId },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          commit("setSignedInUser", res.body.data);
          dispatch("getBookmarks");
          dispatch("alertSuccess");
        })
        .catch((err) => console.log(err));
    },


    async getBookmarks({ dispatch, commit }) {
      const token = await dispatch("getTokenForSend");
      Vue.http
        .get("user/bookmarks", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          commit("setBookmarks", res.body.data.bookmarks);
        })
        .catch((err) => console.log(err));
    },


    async getTweetsOfUser({ dispatch, commit }, username) {
      const token = await dispatch("getTokenForSend");
      let user = username ? username : null;
      commit("toggleRouterLoader");
      Vue.http
        .post(
          "user/tweets",
          { user },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          commit("setTweets", res.body.data);
          commit("toggleRouterLoader");
          console.log(res)
        })
        .catch((err) => console.log(err));
    },


    async addNewConversation({ dispatch, getters }, data) {
      const token = await dispatch('getTokenForSend');

      dispatch('sendNotification', { user: data.with_user, type: 'message', about: { topic: 'user', user: getters.signedInUser._id } })

      Vue.http.post('user/newConversation', data, {
        headers: {
          Authorization: token
        }
      }).then(res => {
        dispatch('getConversations')
      })
        .catch(err => {
          dispatch("alert", {
            message: err.body.message,
            type: "warning",
            duration: 5000,
          });
        })
    },


    async getConversations({ dispatch, commit }) {
      const token = await dispatch('getTokenForSend');
      commit('toggleChatLoader')

      Vue.http.get('user/conversations', {
        headers: {
          Authorization: token
        }
      }).then(res => {

        commit('setConversations', res.body.data)
        commit('toggleChatLoader')
      }).catch(err => console.log(err))
    },


    async getConversationMessages({ dispatch, commit }, conv_id) {
      const token = await dispatch('getTokenForSend')
      commit('toggleChatLoader')
      Vue.http.get('user/messages/' + conv_id, {
        headers: {
          Authorization: token
        }
      }).then(res => {
        commit('setMessagesOfSingleConversation', res.body.data)
        commit('toggleChatLoader')
      }).catch(err => console.log(err))
    },


    async sendMessage({ dispatch }, payload) {
      const token = await dispatch('getTokenForSend')

      Vue.http.post('user/message/new', payload, {
        headers: {
          Authorization: token
        }
      })
        .then(res => {
        }).catch(err => {
          console.log(err)
        })
    },

    async showNotification({ dispatch, commit, getters }, notification) {


      let res = await dispatch('notificationControl', notification)
      notification.message = res.message
      commit('addNewItemToLastActions', notification)

      let audio = new Audio(getters.ding)
      audio.play()
      dispatch('alert', {
        type: 'default',
        duration: 5000,
        position: 'top-left',
        message: res.alertMessage
      })
    },


    notificationControl(vueContext, notification) {
      let alertMessage;
      let message;

      if (notification.type == 'enjoy') {
        alertMessage = `@${notification.createdBy.username} adlı kullanıcı tweetini beğendi !`
        message = 'adlı kullanıcı tweetini beğendi !'
      } else if (notification.type == 'retweet') {
        alertMessage = `@${notification.createdBy.username} tweetini retweetledi !`
        message = 'tweetini retweetledi !'
      }
      else if (notification.type == 'follow') {
        alertMessage = `@${notification.createdBy.username} adlı kullanıcı seni takip etti !`
        message = 'adlı kullanıcı seni takip etti !'
      }
      else if (notification.type == 'admin') {
        alertMessage = `@${notification.createdBy.username} adlı kullanıcı seni takip etti !`
        message = 'adlı kullanıcı seni takip etti !'
      }
      else if (notification.type == 'message') {
        alertMessage = `@${notification.createdBy.username} tarafından yeni bir sohbet başlatıldı !`
        message = 'tarafından yeni bir sohbet başlatıldı !'
      }
      else if (notification.type == 'comment') {
        alertMessage = `@${notification.createdBy.username} adlı kullanıcı tweetini yorumladı !`
        message = 'adlı kullanıcı tweetini yorumladı ! !'
      }

      return { message, alertMessage }
    },


    async getLastActions({ dispatch, commit, state }) {
      const token = await dispatch('getTokenForSend')

      Vue.http.get('user/notifications', {
        headers: {
          Authorization: token
        }
      }).then(res => {
        res.data.notifications.reverse().forEach(async (not) => {
          let tmp = await dispatch('notificationControl', not)

          not.message = tmp.message
          commit('addNewItemToLastActions', not)
        })
      })
    },


    async getNotifications({ dispatch, commit, state }) {
      const token = await dispatch('getTokenForSend')

      Vue.http.get('user/notifications?page=1&limit=7', {
        headers: {
          Authorization: token
        }
      }).then(res => {

        let newNotifications = [];

        res.body.notifications.forEach(async (not) => {
          let res = await dispatch('notificationControl', not)
          newNotifications.push({ ...not, message: res.message })
        })
        commit('setNotifications', newNotifications)
      })
    }


  },
};
