<template>
  <div class="login">
    <h1>This is the component for login</h1>
    <h2>{{ hola }}</h2>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      hola: "hola mundo"
    };
  }
};
</script>

<style scoped>
.login {
  margin: auto;
}
</style>
