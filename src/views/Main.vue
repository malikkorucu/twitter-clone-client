<template>
  <div class="main-page" :class="{ showMenu: isMenuOpen }">
    <app-login-dropdown></app-login-dropdown>
    <div class="container-custom pt-0 d-flex">
      <div class="left-aside">
        <div class="content w-100">
          <app-menu></app-menu>
        </div>
      </div>
      <div class="right-aside">
        <div class="right-aside-container d-flex">
          <div class="router-outlet p-0 position-relative">
            <app-router-loader></app-router-loader>
            <transition
              enter-active-class="animate__fadeIn"
              leave-active-class="animate__fadeOut"
              mode="out-in"
            >
              <router-view class="animate__animated"></router-view>
            </transition>
          </div>
          <div class="right pl-4 col-md-5 p-0">
            <div class="right-content w-100">
              <app-input-search class="mb-2"></app-input-search>
              <app-aside-table></app-aside-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-message-box></app-message-box>
    <app-new-message></app-new-message>
  </div>
</template>

<script>
import menu from "../components/common/menu";
import inputSearch from "../components/toolbox/inputSearch";
import header from "../components/common/header";
import asideTable from "../components/common/asideTable";
import { mapGetters, mapMutations } from "vuex";
import loginDropdown from "../components/auth/loginDropdown";
import routerLoader from "../components/common/routerLoader";
import messageBox from "../components/message/messageBox";
import newMessage from '../components/modals/newMessage'

export default {
  components: {
    appMenu: menu,
    appInputSearch: inputSearch,
    appHeader: header,
    appAsideTable: asideTable,
    appLoginDropdown: loginDropdown,
    appRouterLoader: routerLoader,
    appMessageBox: messageBox,
    appNewMessage:newMessage
  },

  computed: {
    ...mapGetters({
      isMenuOpen: "isMenuOpen",
    }),
  },
};
</script>

<style scoped>
.animate__animated {
  animation-duration: 0.3s;
}
.container-custom {
  width: 1200px;
  margin: 0 auto;
}
.content {
  position: sticky;
  top: 7px;
  font-size: 20px;
}
.router-outlet {
  width: 100%;
  border: 1px solid #253341;
  min-height: 100vh;
}
.main-page {
  background: #15202b;
  min-height: 100vh;
  position: relative;
}
.left-aside {
  width: 20%;
}
.right-aside {
  width: 80%;
  position: relative;
}
.right-content {
  position: sticky;
  top: 7px;
  font-size: 20px;
}

@media (max-width: 1700px) {
  .container {
    padding: 0 50px !important;
  }
  .container-custom {
    width: 1080px;
  }
}

@media (max-width: 1100px) {
  .container-custom {
    width: 100%;
  }
  .left-aside {
    z-index: 25 !important;
    padding-top: 10px;
    width: 15%;
    position: relative;
  }
  .right-aside {
    width: 85%;
  }
  .right-aside .right {
    display: none;
  }

  .router-outlet {
    width: 100% !important;
  }
  .container-custom {
    width: 100%;
  }
}

@media (max-width: 720px) {
  .tweet-btn-mobile {
    display: block;
  }
  .left-aside {
    width: 0;
    position: absolute;
    transition: 0.3s ease all;
    background: #15202b;
    height: 100%;
    box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.3);
    border-right: 1px solid rgb(82, 82, 82);
    z-index: 6;
  }
  .right-aside {
    width: 100%;
    transition: 0.3s ease all;
  }
  .show {
    display: flex !important;
    position: absolute;
    z-index: 50;
    background: #15202b;
    left: 0;
    width: 100%;
    top: 0;
    height: 100%;
    padding: 0 15px !important;
  }
  .main-page.showMenu .left-aside {
    width: 15%;
    z-index: 1;
  }
  .container-custom {
    width: 100%;
  }
}
</style>
