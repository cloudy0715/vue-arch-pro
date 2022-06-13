import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import AWS from "../views/AWS.vue";
import Arch from "../views/Arch.vue";
import Callback from "../components/Callback.vue";
import Notes from "../components/Notes.vue";


Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Dashboard",
    component: Home
  },
  {
    path: "/notes",
    name: "Support Services",
    component: Notes,
  },
  {
    path: "/notes",
    name: "Automation",
    component: Notes,
  },
  {
    path: "/aws",
    name: "AWS",
    component: AWS,
  },
  {
    path: "/arch",
    name: "Arch",
    component: Arch,
  },
  {
    path: "/callback",
    name: "Callback",
    component: Callback,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
