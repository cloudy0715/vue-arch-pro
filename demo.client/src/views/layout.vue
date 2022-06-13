<template>
  
  <div class=" d-flex">
    <nav-bar />
      <router-view :style="{ 'margin-left': sidebarWidth }" />

  </div>
    <!-- <div :style="{ 'margin-left': sidebarWidth }"> -->
    <!-- </div> -->
</template>

<script>
// import NavBar from "@/components/NavBar.vue";
import NavBar from "@/components/Sidebar.vue";
// import { sidebarWidth } from "@/components/sidebar/state";
import { isLoggedIn, login } from "../utils/auth-service";


export default {
  name: "layout",
  components: {
    "nav-bar": NavBar,
  },
  data() {
    return {
      sidebarWidth: "60px"
    }
  },
  setup() {
    return { sidebarWidth };
  },
};
</script>

<style lang="scss">


</style>
