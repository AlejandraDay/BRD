<template>
  <div class="login">
    <h1>This is the component for login</h1>
    <label for="userName">Please enter your user name: </label>
    <br />
    <input name="userName" v-model="name" />
    <!--abel>{{ name }}</label-->
    <br />
    <label for="pwd">Please enter your password: </label>
    <br />
    <input name="pwd" type="password" v-model="pwd" />
    <!--label>{{ pwd }}</label-->
    <div>
      <button>Login</button>
      <button>Register</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      name: "",
      pwd: ""
    };
  }
};
</script>

<style scoped>
.login {
  margin: auto;
  width: 75%;
}
</style>
