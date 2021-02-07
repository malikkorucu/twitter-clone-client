import Vue from "vue";

const state = {};
const getters = {};
const mutations = {};
const actions = {
  alert(vueContext, options) {
    let icon = "";

    if (options.type === "success") {
      icon = `<i class="fas fa-thumbs-up"></i>`;
    }
    if (options.type === "warning") {
      icon = `<i class="fas fa-exclamation"></i>`;
    }
    if (options.type === "error") {
      icon = `<i class="fas fa-exclamation-triangle"></i>`;
    }
    if (options.type === "default") {
      icon = `<i class="fab fa-twitter"></i>`;
    }

    Vue.$toast.open({
      message: `<div class="message_container">
                ${icon}
                <span>${options.message}</span>
                </div>
                `,
      type: options.type || "default",
      position: options.position || "top-right",
      duration: options.duration || 3000,
      dismissible: options.dismissible || true,
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
