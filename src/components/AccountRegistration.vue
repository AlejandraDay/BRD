<template>
  <div>
    <br />
    <button @click="AddNewAccount()">Register Account</button>
  </div>
</template>
<script>
import account from "./account.json";
export default {
  name: "AccountRegistration",
  props: {
    name: {
      type: String,
      default: ""
    },
    cd: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      default: ""
    },
    pwd: {
      type: String,
      default: ""
    },
    verifyPwd: {
      type: String,
      default: ""
    }
  },
  methods: {
    AddNewAccount() {
      var obj = account;
      JSON.stringify(obj.push({ b: 2 }));
    }
  }
};
</script>
