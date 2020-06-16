<template>
  <div class="login">
    <h1>This is the login component</h1>
    <label for="user" type="number">Please enter your CI: </label>
    <br />
    <input name="user" type="number" v-model="ci" />
    <label>{{ ci }}</label>
    <br />
    <label for="pwd">Please enter your password: </label>
    <br />
    <input name="pwd" type="password" v-model="pwd" />
    <label>{{ pwd }}</label>
    <div>
      <button v-on:click="login()">Login</button>
      <button v-on:click="register()">Register</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      ci: -1,
      pwd: ""
    };
  },
  methods: {
    ...mapActions(["updateAccountUsser"]),
    ...mapActions(["profileView"]),
    login() {
      let user = this.getUsers.filter(u => u.ci === parseInt(this.ci));
      console.log("depurando filtrado");
      console.log(user);
      if (user.length === 0) {
        alert("Te user with that CI doesn't exist!!!");
        this.ci = -1;
        this.pwd = "";
      } else if (user[0].pwd === this.pwd) {
        alert(`Welcome ${user[0].name}`);
        this.updateAccountUsser(parseInt(user[0].ci));
        this.profileView(true);
        this.$router.push("Transaction");
      } else {
        alert("Something went wrong!!!\nPlease try again.");
        this.ci = -1;
        this.pwd = "";
      }
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
