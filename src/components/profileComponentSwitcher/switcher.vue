<template>
  <div class="component-switcher">
    <div class="nav d-flex justify-content-between">
      <div
        @click="selectedComponent = 'app-tweets'"
        class="nav-item flex px-2 text-center py-3"
        :class="{'custom-active': selectedComponent == 'app-tweets'}"
      >
        Tweetler
      </div>
      <div
         @click="selectedComponent = 'app-media'"
         class="nav-item flex px-2 text-center py-3"
         :class="{'custom-active': selectedComponent == 'app-media'}"
      >
        Medyalar
      </div>
      <div
        @click="selectedComponent = 'app-enjoys'"
        class="nav-item flex px-2 text-center py-3"
         :class="{'custom-active': selectedComponent == 'app-enjoys'}"
      >
        Beğeniler
      </div>
    </div>

    <component :is="selectedComponent"></component>
  </div>
</template>

<script>
import tweets from "./tweets";
import media from "./media";
import enjoys from "./enjoys";

export default {
  components: {
    appTweets: tweets,
    appMedia: media,
    appEnjoys: enjoys,
  },
  data() {
    return {
      selectedComponent: "app-tweets",
    };
  },
};
</script>

<style scoped>
.nav ul {
  list-style-type: none;
  padding: 0;
}
.nav-item {
  font-weight: bold;
  color: #7e8f9b;
  cursor: pointer;
}
.nav-item:hover {
  color: #1da1f2;
  background: #162d40;
}
.custom-active {
  border-bottom: 2px solid #1da1f2;
}
</style>
