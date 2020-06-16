<template>
  <div class="login">
    <h1>This is the login component</h1>
    <label for="user" type="number">Please enter your CI: </label>
    <br />
    <input class="ci" name="user" type="number" v-model="ci" />
    <br />
    <label for="pwd">Please enter your password: </label>
    <br />
    <input
      class="pwd"
      name="pwd"
      type="password"
      v-model="pwd"
      v-on:keyup.enter="login()"
    />
    <div>
      <button class="log" v-on:click="login()">Login</button>
      <button class="register" v-on:click="register()">Register</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      ci: "",
      pwd: "",
      alertMessage: ""
    };
  },
  methods: {
    ...mapActions(["updateAccountUsser"]),
    ...mapActions(["profileView"]),
    login() {
      let user = this.getUsers.filter(u => u.ci === parseInt(this.ci));
      if (user.length === 0) {
        this.alertMessage = "Te user with that CI doesn't exist!!!";
        this.ci = "";
        this.pwd = "";
      } else if (user[0].pwd === this.pwd) {
        this.alertMessage = `Welcome ${user[0].name}`;
        this.updateAccountUsser(parseInt(user[0].ci));
        this.profileView(true);
        this.$router.push("Transaction");
      } else {
        this.alertMessage = "Wrong password!!!\nPlease try again.";
        this.ci = "";
        this.pwd = "";
      }
      alert(this.alertMessage);
    },
    register() {
      this.$router.push("RegisterUsser");
    }
  },
  computed: {
    ...mapGetters(["getAccounts"]),
    getUsers() {
      return this.getAccounts;
    }
  }
};
</script>

<style scoped>
.login {
  margin: auto;
  width: 75%;
}
</style>
