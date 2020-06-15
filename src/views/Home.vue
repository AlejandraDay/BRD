<template>
  <div>
    <h1>This is the login page</h1>
    <Login />
  </div>
</template>
<script>
import Login from "@/components/Login.vue";
export default {
  name: "Home",
  components: {
    Login
  }
};
</script>

<style scoped>
div {
  margin: auto;
  width: 50%;
}
</style>
