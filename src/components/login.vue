<template>
  <div>
      <form class="new_user" id="new_user" @submit.prevent="login">
        <div class="field">
          <input autofocus="autofocus" placeholder="Email" type="email" v-model="formUsername" name="login_user_email" id="login_user_email">
        </div>
        <div class="field">
          <input autocomplete="off" placeholder="Password" type="password" v-model="formPassword" name="login_user_password" id="login_user_password">
        </div>
        <div class="actions">
          <div class="controls">
            <input type="submit" name="commit" value="Sign In" data-disable-with="Sign In">
            <!-- <router-link :to="{ name: 'lostpassword-id'}">Forgot your password?</router-link> -->
          </div>
        </div>
      </form>


    <!-- <div class="signup-link">
      <span>Don't have an account? </span>
      <router-link :to="{ name: 'register-id'}">Sign Up</router-link>
    </div> -->

  </div>
</template>

<script>
//import _ from "lodash";

export default {
  head: {
    title: "Vue Template",
    bodyAttrs: {
      class: "sessions-controller new-action"
    }
  },

  layout: "simple",
  name: "Login",
  data() {
    return {
      formUsername: "",
      formPassword: ""
    };
  },

  methods: {
    async login() {
      let data = await this.$store.dispatch("login", {
        username: this.formUsername,
        password: this.formPassword
      });
      console.log(data);
      if (data.status) {
        this.formUsername = "";
        this.formPassword = "";
        this.$router.push("/contracts");
      } else {
        this.showNotification({ message: data.error });
        this.formPassword = "";
      }
    }
  },

  notifications: {
    showNotification: {
      message: "Failed to authenticate",
      type: "error"
    }
  },

  mounted: function() {
    // if (this.$store.state.notifications) {
    //   this.$store.state.notifications.forEach(function(notification) {
    //     this.showNotification(notification);
    //   }, this);
    // }
  },

  beforeCreate: function() {
    // if (!_.isNull(this.$store.state.user)) {
    //   this.$router.push("/contracts");
    // }
  }
};
</script>
