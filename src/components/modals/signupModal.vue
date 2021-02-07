<template>
  <div class="sign-up-modal" :class="{ show: isSignUpModalShow }">
    <div class="inner-modal p-5">
      <i @click="toggleSignUpModal" class="fas close-btn fa-times"></i>
      <div class="text-center pb-3">
        <i class="text-white twitter-icon fab fa-twitter"></i>
      </div>
      <h4 class="mt-3">Hesabını oluştur</h4>
      <app-button
        @click.native="sendRegisterUser"
        size="small"
        class="next-btn"
        title="İleri"
        type="primary"
      ></app-button>
      <app-input
        @data="name = $event"
        class="mt-5"
        title="İsim"
        :block="true"
        type="text"
      ></app-input>
      <app-input
        @data="email= $event"
        class="mt-5"
        title="Mail adresi"
        :block="true"
        type="email"
      ></app-input>
      <app-input
        @data="username=$event"
        class="mt-5"
        title="username"
        type="text"
        :block="true"
      ></app-input>
      <app-input
        @data="password=$event"
        class="mt-5"
        title="Şifre"
        type="password"
        :block="true"
      ></app-input>

      <h5 class="mt-4 font-weight-bold">Doğum tarihi</h5>
      <p>
        Bu herkese açık olarak gösterilmeyecek. Bu hesap bir işletme, evcil
        hayvan veya başka bir şey için olsa bile kendi yaşını doğrulaman
        gerekir.
      </p>
      <div class="row">
        <div class="col-md-4">
          <app-input-select
            @data="month = $event"
            title="Ay"
            :array="months"
          ></app-input-select>
        </div>
        <div class="col-md-4">
          <app-input-select
            @data="day = $event"
            title="Gün"
            :array="31"
          ></app-input-select>
        </div>
        <div class="col-md-4">
          <app-input-select
            @data="year = $event"
            title="Yıl"
            :array="years"
          ></app-input-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import button from "../toolbox/button";
import input from "../toolbox/input";
import inputSelect from "../toolbox/inputSelect";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    appButton: button,
    appInput: input,
    appInputSelect: inputSelect,
  },
  data() {
    return {
      months: [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
      ],
      years: this.getYears(),
      month: "Ocak",
      day: "31",
      year: "2020",
      username: "",
      email: "",
      name: "",
      password: "",
    };
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
    getYears() {
      let years = [];
      const currentYear = parseInt(new Date().getFullYear());

      for (let i = 1900; i <= currentYear; i++) {
        years.push(i);
      }

      years.reverse();
      return years;
    },
    sendRegisterUser() {
      const day = parseInt(this.day);
      const month = this.months.indexOf(this.month);
      const year = parseInt(this.year);
      const birth = new Date(year, month, day);

      const user = {
        name:this.name,
        username:this.username,
        email:this.email,
        password:this.password,
        birthDate:birth
      }

      this.$store.dispatch('signUpUser' ,user)
    },
  },
  created() {
    this.getYears();
  },
};
</script>

<style scoped>
.close-btn {
  position: absolute;
  left: 15px;
  top: 15px;
  font-size: 25px;
  cursor: pointer;
}
::-webkit-scrollbar {
  display: none;
}
.sign-up-modal {
  background: rgba(255, 255, 255, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
  overflow-y: scroll;
}
.show {
  display: flex;
}
.inner-modal {
  width: 45%;
  background: #15202b;
  color: white;
  position: relative;
  border-radius: 20px;
  padding-bottom: 150px !important;
}

.next-btn {
  position: absolute;
  top: 0;
  right: 10px;
}
h4,
h5 {
  font-weight: 500;
}
.twitter-icon {
  font-size: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 15px;
}

@media (max-width: 1000px) {
  .inner-modal {
    width: 100%;
    height: 100%;
    background: transparent;
  }
  .sign-up-modal {
    background: #15202b;
  }
}
</style>
