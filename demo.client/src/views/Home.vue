<template>
  <div>
    <!-- <nav-bar /> -->
    <div class="main-content">
      <!-- <b-jumbotron header="Welcome to Clouday1." lead="" /> -->
      <b-container>
        <h3 class="text-primary">
          <strong>Dashboard</strong>
        </h3>
        <hr />
        <section class="d-flex justify-content-between">
          <b-card>
            <h5>
              <b-icon icon="bar-chart-fill" class="mr-1"></b-icon>Monthly Cost
            </h5>
            <div class="tip">
              <b-button id="popover-monthly-cost"
              >
                2022/06 Total Cost: USD$20.60
                <b-icon icon="info-circle-fill" class="mr-1"></b-icon>
              </b-button>
              <b-popover
                target="popover-monthly-cost"
                triggers="hover"
                placement="top"
              >
                <template #title>Total Cost</template>
                2022/06 USD$20.60
              </b-popover>
            </div>
            <b-card-text>
              <Bar />
            </b-card-text>

          </b-card>

          <b-card>
            <h5>
              <b-icon icon="pie-chart-fill" class="mr-1"></b-icon>Cost
              Frequently Used Services
            </h5>
           <div class="tip">
              <b-button
                id="popover-negative-cost"
              >
                Exclude all items with negative cost
                <b-icon icon="info-circle-fill" class="mr-1"></b-icon>
              </b-button>
              <b-popover
                target="popover-negative-cost"
                triggers="hover"
                placement="top"
              >
                <template #title>Total Cost</template>
                2022/06 USD$20.0
              </b-popover>
            </div>
            <b-card-text>
              <Pie />
            </b-card-text>
          </b-card>
        </section>
        <div class="auth-info" v-if="isLoggedIn()">
          <!-- <b-row>
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
        </b-row> -->
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import { getAccessToken, getIdToken, isLoggedIn } from "../utils/auth-service";
import NavBar from "@/components/Sidebar.vue";
import Bar from "@/components/chart/lineChart.vue"
import Pie from "@/components/chart/pieChart.vue"


export default {
  name: "Home",
  components: { 
    "nav-bar": NavBar, 
    Bar,
    Pie
  },
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
    generateChart() {
      this.dataChart["labels"] = [];
      this.dataChart["datasets"] = [];

      // ... compute datasets and formattedLabels

      this.dataChart["labels"] = formattedLabels;
      this.dataChart["datasets"] = datasets;
    },
  },
  mounted() {
    this.idToken = this.getIdToken();
    this.accessToken = this.getAccessToken();
    getUser(this.accessToken);
  },
};
</script>

<style lang="scss">
.main-content {
  width: 100%;
}
.auth-info {
  word-wrap: break-word;
  text-align: left;
  color: #88a;
}
.container {
  padding: 20px 16px;
}
.card {
  width: 48%;
  .tip {
    margin-bottom: 8px;
  }
}
.label {
  margin: 0.5rem 0;
  font-weight: bold;
}
</style>
