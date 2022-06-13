<template>
  <div class=" d-flex">
    <nav-bar />
    <div class="main-content">
    <b-jumbotron header="Notes" lead="An example Vue.js app with Auth0" />

    <b-container>
      <div class="auth-info" v-if="isLoggedIn()">
        <div class="label">
          You are logged in.
        </div>
        <hr/>
        <b-row>
          <b-col>
            <b-badge variant="primary" class="label">
              id_token
            </b-badge>
            <span class="jwt">
            {{ getIdToken() }}
          </span>
          </b-col>
          <b-col>
            <b-badge variant="primary" class="label">
              access_token
            </b-badge>
            <span class="jwt">
          {{ getAccessToken() }}
          </span>
          </b-col>
        </b-row>
      </div>
    </b-container>
    </div>
  </div>
</template>

<script>
  import {getAccessToken, getIdToken, isLoggedIn} from "../utils/auth-service";
import NavBar from "@/components/Sidebar.vue";

  export default {
    name: "Home",
    components: { "nav-bar": NavBar, },
    data() {
      return {
        idToken: "",
        accessToken: "",
      };
    },
    methods: {
      isLoggedIn() {
        return isLoggedIn();
      },
      getIdToken() {
        return getIdToken();
      },
      getAccessToken() {
        return getAccessToken();
      },
    },
    mounted() {
      this.idToken = this.getIdToken();
      this.accessToken = this.getAccessToken();
      getUser(this.accessToken);
    },
  };
</script>

<style>
.main-content {
  width: 100%;
}
  .auth-info {
    word-wrap: break-word;
    text-align: left;
    color: #88A;
  }

  .label {
    margin: 0.5rem 0;
    font-weight: bold;
  }
</style>
