<template>
  <div>
    <div class="sidebar-close" id="sidebar">
      <b-button v-b-toggle.leftBar
        ><b-icon icon="chevron-double-right"></b-icon
      ></b-button>
    </div>
    <b-sidebar
      id="leftBar"
      class="sidebar-menu"
      width="210px"
      shadow
      title="Clouday1"
      v-model="isLeftBarOpen"
      text-variant="light"
    >
      <template #footer>
        <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
          <strong class="mr-auto"></strong>
          <!-- <b-button size="sm" @click="hide">Close</b-button> -->

          <b-button
            v-if="!isLoggedIn()"
            @click="handleLogin"
            variant="info"
            class="my-2 my-sm-0"
            type="submit"
            size="sm"
          >
            Sign In
          </b-button>
          <div v-if="isLoggedIn()">
            <b-button class="my-2 my-sm-0 mx-1" size="sm" variant="warning">
              <b-icon icon="bell-fill"></b-icon>
            </b-button>
            <b-button class="my-2 my-sm-0 mx-1" size="sm" variant="light">
              <b-icon icon="gear-fill"></b-icon>
            </b-button>
            <b-button
              @click="handleLogout"
              variant="info"
              class="my-2 my-sm-0 mx-1"
              type="submit"
              size="sm"
            >
              <b-icon icon="box-arrow-right"></b-icon>
            </b-button>
          </div>
        </div>
      </template>
      <div class="px-3 py-2">
        <div id="router-nav" class="router-nav">
          <div class="nav-panel-mobile">
            <div class="hamburger-icon" @click="toggle()">
              &#9776; {{ currentRoute }}
            </div>
            <div class="mobile-menu" v-if="active">
              <div
                class="nav-item"
                v-for="route in $router.options.routes"
                :key="route.path"
                @click="toggle()"
              >
                <router-link class="custom-nav-item" :to="route.path">
                  {{ route.name }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="nav-panel">
            <div
              class="nav-item"
              v-for="(route, i) in handleRoute"
              :key="route.path"
              :class="{ active: route.clicked }"
            >
              <router-link
                class="custom-nav-item"
                :to="route.path"
                v-if="route.children == null"
              ><b-icon :icon="route.icon"></b-icon>
                {{ route.name }}
              </router-link>
              <a v-else 
                v-b-toggle="'collapse-' + i" 
                class="custom-nav-item not-collapsed"
                ><b-icon :icon="route.icon" class="mr-1"></b-icon
                >{{ route.name }}</a
              >
              <b-collapse 
                :id="'collapse-' + i" 
                class="mt-2"
                >
                <div class="nav-subitem">
                  <router-link
                    class="custom-nav-subitem"
                    v-for="child in route.children"
                    :key="child.path"
                    :to="child.path"
                  >
                    {{ child.name }}
                  </router-link>
                </div>
              </b-collapse>
              <!-- <router-link class="custom-nav-item"  @click="selected(e)" v-if="route.name != 'Arch'" :to="route.path">
                {{ route.name }}
              </router-link> -->
            </div>
          </div>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { isLoggedIn, login, logout } from "@/utils/auth-service";
import { routers } from "@/router/route.js";

export default {
  data: function () {
    return {
      active: false,
      isLeftBarOpen: false,
      handleRoute: routers,
    };
  },
  computed: {
    currentRoute: function () {
      return this.$route.name;
    },
  },
  methods: {
    toggle: function () {
      this.active = !this.active;
    },
    handleLogin() {
      login();
    },
    handleLogout() {
      logout();
    },
    isLoggedIn() {
      return isLoggedIn();
    },
    // check(name) {
    //   if (name != "Callback") return true;
    // },
  },
};
</script>

<style lang="scss">
.sidebar-menu {
  .b-sidebar.shadow {
    background: #3c4547 !important;
  }
  .b-sidebar > .b-sidebar-header {
    background: #ecb300;
    color: #3c4547;
    font-size: 24px;
    border-radius: 0 0 25px 0;
  }
  .bi-x {
    color: #000000;
  }
}

.bi-box-arrow-right.b-icon {
  font-size: 20px !important;
}

.sidebar-menu .b-sidebar > .b-sidebar-footer {
  background: #7c7b7b59;
}

.sidebar-close {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 55px;
  height: 100%;
  background: #3c4547;
  transition: all 0.3s ease;
  button,
  button:hover,
  button:active,
  button:focus {
    background: #ecb300;
    border: 0;
    width: 100%;
    border-radius: 0 0 25px 0;
    padding: 10px 5px 14px 0;
    .b-icon {
      color: #3c4547;
      font-size: 22px !important;
    }
  }
}

.navbar-nav {
  align-items: center;
}

.nav-panel {
  display: none;
}
.nav-panel-mobile {
  display: flex;
  flex-flow: column;
}
.mobile-menu {
  display: flex;
  flex-flow: column;
}
.hamburger-icon {
  font-size: 2em;
  text-align: left;
  cursor: pointer;
  user-select: none;
}

.nav-item * {
  text-decoration: none;
}
.nav-item a {
  color: #fff;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  padding: 0 6px;
  &:hover {
    color: #fff;
    text-decoration: none;
  }
}
.custom-nav-item,
.custom-nav-subitem {
  font-size: 1em;
  font-weight: bold;
  border-left: 4px solid transparent;
  display: block;
  cursor: pointer;
}

.custom-nav-subitem {
  font-size: 0.85em;
}

.custom-nav-subitem:hover {
  border-left: #ecb300 solid 4px;
}

.custom-nav-item.collapsed::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f105";
  font-style: normal;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: 0 0;
  margin-right: 10px;
}

.custom-nav-item.not-collapsed::before,
.custom-nav-item:hover::before,
.custom-nav-item:hover,
.custom-nav-item.not-collapsed {
  color: #ecb300 !important;
}

.custom-nav-item.not-collapsed::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f105";
  font-style: normal;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: 0 0;
  margin-right: 10px;
  transform: rotate(90deg);
}

.nav-item .nav-subitem {
  margin-left: 12px;
  margin-top: 8px;
  a {
    margin: 8px 0;
  }
}

/* media queries */
@media only screen and (min-width: 450px) {
  .nav-panel {
    display: flex;
    flex-direction: column;
    // padding: 20px 0px;
  }
  .router-link-exact-active {
    border-left: #ecb300 solid 4px;
  }
  .router-link-exact-active .nav-subitem {
    display: block;
  }
  .nav-item {
    padding-right: 1em;
    padding: 8px 0;
  }
  .nav-panel-mobile {
    display: none;
  }
}
</style>