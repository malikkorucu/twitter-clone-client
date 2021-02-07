<template>
  <radial-progress-bar
    :completed-steps="completedSteps"
    :total-steps="totalSteps"
    :innerStrokeWidth="1"
    startColor="#fff"
    stopColor="#fff"
    :diameter="20"
    :strokeWidth="2"
  >
  </radial-progress-bar>
</template>

<script>
import RadialProgressBar from "vue-radial-progress";

export default {
  props: ["completedSteps", "totalSteps"],
  components: {
    RadialProgressBar,
  },
};
</script>

<style scoped></style>
