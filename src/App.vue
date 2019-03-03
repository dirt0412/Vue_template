<template>
  <div id="app">    
    <img style="width:50px" alt="Vue logo" src="./assets/logo.png">
      <div id="nav">
            <router-link v-if="authenticated" to="/login" @click.native="logout" replace>Logout</router-link>
        </div>
        <router-view @authenticated="setAuthenticated" />
    <!-- <login /> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import login from "./components/login.vue";

export default {
  name: "app",
  data() {
    return {
      authenticated: false
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  components: {
    login
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    async logout() {
      this.authenticated = false;
      let data = await this.$store.dispatch("logout", {
        username: "",
        password: ""
      });
      this.$router.push("/login");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
