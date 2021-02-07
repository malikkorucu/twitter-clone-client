import Vue from "vue";
import router from "../../router";


export default {
  state: {
    isSignedIn: false,
    _signedInUser: {},
    access_token: "",
  },
  getters: {
    signedInUser(state) {
      return state._signedInUser;
    },
  },
  mutations: {
    setSignedInUser(state, user) {
      state._signedInUser = user;
    },
    setToken(state, token) {
      state.access_token = token;
    },
  },
  actions: {
    signUpUser({ dispatch,commit }, user) {
      Vue.http
        .post("auth/register", user)
        .then((res) => {
          router.push({ name: "login" });
          commit('toggleSignUpModal')
          dispatch("alert", {
            message: "Kayıt işlemi başarılı",
            type: "success",
            duration: 5000,
          });
        })
        .catch((err) => console.log(err));
    },
    signInUser({ commit, dispatch, state }, user) {
      Vue.http
        .post("auth/login", user)
        .then((res) => {
          const { access_token, expiresIn } = res.body.authentication;
          const second = parseInt(expiresIn) / 1000;

          dispatch("alert", {
            message: res.body.message,
            type: "default",
            duration: 5000,
          });

          localStorage.setItem("tweeter-user", JSON.stringify(res.body.user));
          commit("setSignedInUser", res.body.user);
          Vue.$cookies.set("token", access_token, `${second}s`);
          router.replace("/home");
        })
        .catch((err) => console.log(err));
    },
    signOut() {
      router.replace({ name: "intro" });
      Vue.$cookies.remove("token");
      localStorage.removeItem("tweeter-user");
    },
    initAuth({ commit, dispatch, getters }) {
      const token = Vue.$cookies.get("token");

      if (token) {
        commit("setToken", token);
        dispatch("getSignedInUser");

      } else {
        dispatch("signOut");
      }
    },
  },
};
