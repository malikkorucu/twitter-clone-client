<template>
  <div class="container-x d-flex">
    <app-sign-up-modal></app-sign-up-modal>
    <div class="col-md-6 left-aside p-0">
      <div class="left-aside-content">
        <div class="content-left">
          <div class="slogan my-3">
            <i class="fa fa-search pr-4"></i>
            <h5 class="m-0">İlgi alanlarını takip et.</h5>
          </div>
          <div class="slogan my-3">
            <i class="fas fa-user-friends pr-3"></i>
            <h5 class="m-0">
              İnsanların neler hakkında konuştuğuna kulak ver.
            </h5>
          </div>
          <div class="slogan my-3">
            <i class="fas fa-comments pr-4"></i>
            <h5 class="m-0">Sohbete katıl.</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 right-aside p-0">
      <div class="right-aside-content">
        <div class="content-right">
          <i class="text-white twitter-icon fab fa-twitter pb-5"></i>
          <h2 class="text-white pb-5">
            Dünyada şu anda olup bitenleri gör
          </h2>
          <h5 class="text-white pt-5">Twitter'a bugün katıl.</h5>
          <app-button
            size="medium"
            @click.native="toggleSignUpModal"
            title="Kaydol"
            type="primary"
            :block="true"
          ></app-button>
          <app-button
            title="Giriş Yap"
            size="medium"
            type="secondary"
            :block="true"
            @click.native="goLoginPage"
          ></app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import button from "../components/toolbox/button";
import signUpModal from "../components/modals/signupModal";
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {
    appButton: button,
    appSignUpModal: signUpModal,
  },
  computed: {
    ...mapGetters({
      isSignUpModalShow: "isSignUpModalShow",
    }),
  },
  methods: {
    ...mapMutations({
      toggleSignUpModal: "toggleSignUpModal",
    }),
    goLoginPage() {
      this.$router.replace({ name: "login" });
    },
  },
};
</script>

<style scoped>
h2{
  font-weight: bold;
  font-size:30px;
}
.intro-page {
  background: #15202b;
  min-height: 100vh !important;
}
.twitter-icon {
  font-size: 45px;
}

.content-left {
  color: white;
  width: 40%;
}
.content-left i,
h5 {
  font-weight: 600;
}
.left-aside-content {
  background: url("../assets/bg.png");
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.slogan {
  display: flex;
  align-items: center;
}

.slogan i {
  font-size: 25px;
}
.right-aside-content {
  background: #15202b;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-right {
  width: 50%;
}
.content-right h1 {
  font-weight: bold;
}

@media (max-width: 720px) {
  .left-aside {
    display: none;
  }
  .content-right {
    width: 80%;
  }
}
</style>
