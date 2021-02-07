<template>
  <div class="button">
    <button
      :disabled="disabled"
      :class="{
        'btn-block': block,
        'primary-custom': type === 'primary',
        'secondary-custom': type === 'secondary',
        'py-4': size === 'large',
        'py-3': size === 'medium',
        'py-1': size === 'small',
      }"
      class="px-3 my-2 btns"
    >
      {{ title }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Boolean,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    disabled:{
      required:false,
      default:false,
      type:Boolean
    }
  },
};
</script>

<style scoped>
.primary-custom {
  color: white;
  border: 2px solid #1a91da;
  border-radius: 30px;
  background: #1a91da;
  font-weight: bold;
  transition: 0.3s;
}
.secondary-custom {
  color: #1a91da;
  border: 2px solid #1a91da;
  border-radius: 30px;
  background: #15202b;
  font-weight: bold;
  transition: 0.3s;
}
.secondary-custom:hover {
  background: #23303d;
}
.btns{
  font-size:14px;
}
.primary-custom:hover {
  background: #1272ad;
  border: 2px solid #1272ad;
}
button {
  outline: none;
}
</style>
