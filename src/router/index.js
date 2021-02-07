import Vue from "vue";
import Router from "vue-router";
import Intro from "../views/Intro";

Vue.use(Router);

const routes = [
  { path: "", redirect: { name: "intro" } },
  {
    path: "",
    name: "main",
    component: () => import("../views/Main"),
    children: [
      { path: "/home", name: "home", component: () => import("../views/Home") },
      {
        path: "/messages",
        name: "messages",
        component: () => import("../views/Messages"),
      },
      {
        path: "/bookmarks",
        name: "bookmarks",
        component: () => import("../views/Bookmarks"),
      },
      {
        path: "/lists",
        name: "lists",
        component: () => import("../views/Lists"),
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("../views/Profile"),
      },
      {
        path: "/notifications",
        name: "notifications",
        component: () => import("../views/Notifications"),
      },
      {
        path: "/:username",
        name: "profile-user",
        component: () => import("../views/ProfileOtherUser"),
      },
      {
        path: "/search",
        name: "search",
        component: () => import("../views/Search"),
      },
      {
        path: "/tweet/:tweetId",
        name: "single-tweet",
        component: () => import("../views/SingleTweet"),
      },
    ],
  },
  { path: "/intro", name: "intro", component: () => import("../views/Intro") },
  { path: "/login", name: "login", component: () => import("../views/Login") },
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
