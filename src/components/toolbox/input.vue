<template>
  <div>
    <div ref="inputContainer" class="input" :class="{ 'w-100': block }">
      <div class="label pl-2">{{ title }}</div>
      <input
        @change="$emit('data', data)"
        v-model="data"
        ref="input"
        :type="type"
        class="pl-2 pb-2 pr-2"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["type", "title", "block"],
  data() {
    return {
      data: "",
    };
  },
  mounted() {
    this.$refs.input.addEventListener("focus", () => {
      this.$refs.inputContainer.classList.add("active");
    });
    this.$refs.input.addEventListener("blur", () => {
      this.$refs.inputContainer.classList.remove("active");
    });
  },
  
};
</script>

<style scoped>
.input {
  width: 100%;
  border-bottom: 3px solid #8899a6;
  background: #192734;
}

.input input,
label {
  background: #192734;
  color: white;
  outline: none;
  width: 100%;
}

.label {
  color: #8899a6;
  background: #192734;
}

.input.active .label {
  color: #1da1f2;
}

.input.active {
  border-bottom: 3px solid #1da1f2 !important;
}
</style>
