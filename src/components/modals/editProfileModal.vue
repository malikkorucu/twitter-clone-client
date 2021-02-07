<template>
  <div
    class="edit-profile-modal d-flex justify-content-center align-items-center"
  >
    <div class="modal-content">
      <div
        class="header d-flex px-4 py-2 justify-content-between align-items-center"
      >
        <div class="left d-flex">
          <i class="fas fa-times"></i>
          <h3 class="text-white pl-3 my-0 font-weight-bold">Profili Düzenle</h3>
        </div>
        <div class="right">
          <app-button type="primary" size="medium" title="Kaydet"></app-button>
        </div>
      </div>

      <div class="content p-3">
      asdlşfkjsadfşlaksldfjşlaskdjfşlaskd
      </div>
    </div>
  </div>
</template>

<script>
import button from "../toolbox/button";

export default {
  components: {
    appButton: button,
  },
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid grey;
}
.edit-profile-modal {
  position: fixed;
  z-index: 25;
  background: rgba(255, 255, 255, 0.5);
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}
.modal-content {
  width: 60%;
  background: #15202b;
  border-radius: 25px;
}
.fa-times {
  font-size: 31px;
  color: rgb(14, 174, 209);
  cursor: pointer;
}
@media (max-width: 720px) {
  .modal-content {
    width: 100%;
    height: 100%;
    border-radius: 0;
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>