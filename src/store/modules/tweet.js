import Vue from "vue";


export default {
  state: {
    _tweets: [],
    _singleTweet: {},
    _comments: [],
  },
  getters: {
    tweets(state) {
      return state._tweets;
    },
    singleTweet(state) {
      return state._singleTweet;
    },
    comments(state) {
      return state._comments;
    },
  },
  mutations: {
    setTweets(state, tweets) {
      state._tweets = tweets;
    },
    addTweetToArray(state, tweet) {
      state._tweets.unshift(tweet);
    },
    setEnjoysOfTweet(state, tweetData) {
      const { tweetId, userId } = tweetData;
      const tw_ = state._tweets.find((tweet) => tweet._id === tweetId);
      const tw_com = state._comments.find((tweet) => tweet._id === tweetId);

      let tweet = tw_ ? tw_ : tw_com;

      if (tweet.enjoys.includes(userId)) {
        tweet.enjoys = tweet.enjoys.filter((user) => user !== userId);
      } else {
        tweet.enjoys.push(userId);
      }
    },
    setSingleTweet(state, tweet) {
      state._singleTweet = tweet;
    },
    setComments(state, comments) {
      state._comments = comments.reverse();
    },
    addTweetToComments(state, comment) {
      const tweet = state._tweets.find(
        (tweet) => comment.parentId === tweet._id
      );
      tweet.comments.push(comment._id);
    },
  },
  actions: {
    async addTweet({ commit, getters, dispatch }, tweet) {
      const token = await dispatch("getTokenForSend");

      Vue.http
        .post("tweet/addTweet", tweet, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          dispatch("alert", {
            message: "tweet başarıyla eklendi",
            type: "success",
            duration: 5000,
          });

          let tweet = { ...res.body.data, user: getters.signedInUser };

          if (!tweet.parentId) {
            commit("addTweetToArray", tweet);
          } else {
            if (tweet.parentId === getters.singleTweet._id) {
              commit("addTweetToComments", tweet);
            }
            commit("toggleIsCommentModalShow");
          
            if(tweet.parentId){
              dispatch("getCommentsOfTweet",getters.singleTweet._id);
            }else{
              dispatch("getCommentsOfTweet",tweet._id);
            }
          }
        })
        .catch((err) => console.log(err));
    },
    async getAllTweets({ getters, commit, dispatch }) {
      const token = await dispatch("getTokenForSend");

      let userID = getters.signedInUser._id;
      if (userID) {
        commit("toggleRouterLoader");
        Vue.http
          .get("tweet/getTweets/" + userID, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            commit("setTweets", res.body.data);
            commit("toggleRouterLoader");
          })
          .catch((err) => console.log(err));
      }
    },
    async enjoyTweet({ getters, commit, dispatch }, tweet) {
      let userId = getters.signedInUser._id;
      const token = await dispatch("getTokenForSend");
      
      commit("setEnjoysOfTweet", { tweetId: tweet._id, userId });
      dispatch('sendNotification', { user: tweet.user._id, type: 'enjoy', about: { topic: 'tweet', tweet: tweet._id } })
      
      dispatch("alert", {
        message: "başarılı",
        type: "success",
        duration: 5000,
      });
      Vue.http
        .post(
          "tweet/enjoyTweet",
          { tweetId: tweet._id, userId },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .catch((err) => console.log(err));
    },

    async getSingleTweet({ dispatch, commit }, tweetId) {
      const token = await dispatch("getTokenForSend");

      commit("toggleRouterLoader");
      Vue.http
        .get("tweet/" + tweetId, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          commit("setSingleTweet", res.body.data);
          commit("toggleRouterLoader");
        })
        .catch((err) => console.log(err));
    },
    updateSingleTweet({ commit, getters }, tweetId) {
      const tweet = getters.tweets.find((tweet) => tweet._id === tweetId);
      commit("setSingleTweet", tweet);
    },

    async getCommentsOfTweet({ dispatch, commit }, tweetId) {
      const token = await dispatch("getTokenForSend");

      Vue.http
        .get("tweet/comments/" + tweetId, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          commit("setComments", res.body.data);
        })
        .catch((err) => console.log(err));
    },
  },
};
