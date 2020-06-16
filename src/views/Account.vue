<template>
  <div class="registerAccount">
    <h3>Account</h3>
    <AccountData id="account">Account</AccountData>
  </div>
</template>
<script>
import AccountData from "@/components/AccountData.vue";
export default {
  name: "Account",
  components: {
    AccountData
  }
};
</script>
<style scoped>
.registerAccount {
  background-color: #d3daeb;
}
h3 {
  color: #555;
  font-weight: 400;
  line-height: 1.5;
  margin: 0 0 1em 0;
  color: inherit;
  text-decoration: none;
  font-size: 1.75em;
}
</style>
