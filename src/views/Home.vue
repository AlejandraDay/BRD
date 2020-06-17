<template>
  <div class="home">
    <h1>Welcome to <b>My Enterprise Wallet</b></h1>
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
h1 {
  margin: 10px;
}
.home {
  background: rgba(26, 164, 168, 0.644);
  margin: auto;
  width: 50%;
}
</style>
