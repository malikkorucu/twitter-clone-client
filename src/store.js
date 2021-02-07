import Vue from "vue";
import Vuex from "vuex";
import auth from "./store/modules/auth";
import alert from "./store/modules/alert";
import tweet from "./store/modules/tweet";
import user from "./store/modules/user";
import io from "socket.io-client";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    _isSignUpModalShow: false,
    currentTweetOption: "Herkes yanıtlayabilir",
    _isMenuOpen: false,
    _loaderIsShow: false,
    _isSearchBarShow: false,
    _isCommentModalShow: false,
    _commentModalTweet: {},
    _routerLoaderShow: false,
    _chatLoaderShow: false,
    _newMessageModalShow: false,
  },
  getters: {
    isSignUpModalShow(state) {
      return state._isSignUpModalShow;
    },
    isMenuOpen(state) {
      return state._isMenuOpen;
    },
    loaderIsShow(state) {
      return state._loaderIsShow;
    },
    isSearchBarShow(state) {
      return state._isSearchBarShow;
    },
    isCommentModalShow(state) {
      return state._isCommentModalShow;
    },
    commentModalTweet(state) {
      return state._commentModalTweet;
    },
    routerLoaderShow(state) {
      return state._routerLoaderShow;
    },
    chatLoader(state) {
      return state._chatLoaderShow;
    },
    newMessageModalShow(state) {
      return state._newMessageModalShow
    },
    getSocket(state) {
      const socket = io('http://localhost:5000',{
          query: {
            userId: JSON.parse(localStorage.getItem('tweeter-user')) ? JSON.parse(localStorage.getItem('tweeter-user'))._id : null
          }
        })

      return socket;
    }
  },
  mutations: {
    toggleSignUpModal(state) {
      state._isSignUpModalShow = !state._isSignUpModalShow;
    },
    setCurrentOption(state, option) {
      state.currentTweetOption = option;
    },
    toggleMenu(state) {
      state._isMenuOpen = !state._isMenuOpen;
    },
    toggleLoaderIsShow(state) {
      state._loaderIsShow = !state._loaderIsShow;
    },
    toggleIsSearchBarShow(state) {
      state._isSearchBarShow = !state._isSearchBarShow;
    },
    toggleIsCommentModalShow(state, tweet) {
      state._commentModalTweet = tweet;
      state._isCommentModalShow = !state._isCommentModalShow;
    },
    setCommentModalTweet(state, tweet) {
      state._commentModalTweet = tweet;
    },
    toggleRouterLoader(state) {
      state._routerLoaderShow = !state._routerLoaderShow;
    },
    toggleChatLoader(state) {
      state._chatLoaderShow = !state._chatLoaderShow;
    },
    toggleNewMessageModal(state) {
      state._newMessageModalShow = !state._newMessageModalShow
    }

  },
  actions: {
    getTokenForSend() {
      let token = Vue.$cookies.get("token");
      return "Bearer: " + token;
    },
    alertSuccess({ dispatch }) {
      dispatch("alert", {
        message: "İşlem başarılı",
        type: "success",
        duration: 5000,
      });
    },
    sendNotification({commit,getters},payload){
      const io = getters.getSocket;
      const createdBy = getters.signedInUser._id

      let notification = {
        createdBy,
        user:payload.user,
        type:payload.type,
        about:payload.about
      }

      io.emit('notification' , notification)
    }
  },
  modules: {
    auth,
    alert,
    tweet,
    user,
  },
});
