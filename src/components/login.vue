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
      if (this.formUsername.length > 2 && this.formPassword.length > 0) {
        let data = await this.$store.dispatch("login", {
          username: this.formUsername,
          password: this.formPassword
        });
        if (data.status) {
          this.formUsername = "";
          this.formPassword = "";
          this.$emit("authenticated", true);
          this.$router.push("/list");
        } else {
          this.showNotification({ message: data.error });
          this.formPassword = "";
        }
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
    //   this.$router.push("/list");
    // }
  }
};
</script>
