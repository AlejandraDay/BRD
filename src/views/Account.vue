<template>
  <div>
    <label>Data Account</label>
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
