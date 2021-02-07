<template>
  <div class="login-page d-flex justify-content-center p-4">
    <div class="login-form-container">
      <i class="text-white w-100 twitter-icon fab fa-twitter text-center"></i>
      <h4 class="text-white w-100 text-center">Twitter'a giriş yap</h4>
      <app-input
        @data="usernameOrEmail = $event"
        class="mt-4 w-100"
        type="text"
        title="E-posta veya kullanıcı adı"
      ></app-input>
      <app-input
        @data="password = $event"
        class="mt-4 w-100"
        type="password"
        title="Şifre"
      ></app-input>
      <app-button
        @click.native="sendSignInUser"
        size="medium"
        class="mt-4 w-100"
        title="Giriş Yap"
        :block="true"
        type="primary"
      ></app-button>
      <div class="small-container text-center">
        <a>Şifreni mi unuttun ?</a> .
        <router-link
          @click.native="toggleSignUpModal()"
          tag="a"
          :to="{ name: 'intro' }"
          >Twitter'a kaydol</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import input from "../components/toolbox/input";
import button from "../components/toolbox/button";
import { mapMutations } from "vuex";

export default {
  components: {
    appInput: input,
    appButton: button,
    usernameOrEmail: "",
    password: "",
  },
  methods: {
    ...mapMutations({
      toggleSignUpModal: "toggleSignUpModal",
    }),
    sendSignInUser() {
      const user = {
        usernameOrEmail: this.usernameOrEmail,
        password: this.password,
      };

      this.$store.dispatch("signInUser", user);
    },
  },
};
</script>

<style scoped>
.login-page {
  background: #15202b;
  height: 100vh;
}
.login-form-container {
  width: 40%;
}
i {
  font-size: 45px;
  padding-bottom: 20px;
}
h4 {
  font-weight: 500;
}
.small-container a {
  color: #1272ad;
}
a:hover {
  color: white !important;
}
@media (max-width: 960px) {
  .login-form-container {
    width: 85%;
  }
}
</style>
