<template>
  <div>
    <b-modal
      id="modal-1"
      class="loadingModal"
      ref="sending-modal"
      no-close-on-backdrop
      hide-footer
      hide-header-close
      no-border
      v-show="loadingmodalShow"
      size="sm"
      centered
    >
      <div class="text-center">
        <b-spinner label="Loading..."></b-spinner>
      </div>
    </b-modal>
    <div class="d-flex">
      <nav-bar />
      <router-view :style="{ 'margin-left': sidebarWidth }" style="width: 100%" />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/Sidebar.vue";
import { isLoggedIn, login } from "@/utils/auth-service";

export default {
  name: "App",
  components: {
    "nav-bar": NavBar,
  },
  data() {
    return {
      sidebarWidth: "55px",
      loadingmodalShow: true,
    };
  },
  methods: {
    isLoggedIn() {
      return isLoggedIn();
    },
  },
  setup() {
    // return { sidebarWidth };
  },
  mounted() {
    if (!isLoggedIn()) {
      console.log("not");
      login();
    } else {
      this.loadingmodalShow = false;
      console.log("isLoggedIn()", isLoggedIn(), this.loadingmodalShow);
    }
  },
};
</script>

<style lang="scss">
@import "~bootstrap";
@import "~bootstrap-vue";
@import "./assets/scss/main.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#modal-1___BV_modal_content_ {
  border: 0;
  background: transparent;
  .modal-header {
    border: 0;
  }
}
</style>
