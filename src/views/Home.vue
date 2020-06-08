<template>
  <div class="home">
    <!--img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /-->
    <label>Name: </label>
    <input type="text" v-model="InputName" />
    <br />
    <br />
    <label>CI: </label>
    <input type="text" v-model="InputCI" />
    <br />
    <br />
    <label> Email: </label>
    <input type="email" v-model="InputEmail" />
    <br />
    <br />
    <label>Password: </label>
    <input type="password" v-model="InputPwd" />
    <br />
    <br />
    <label>Confirm Password: </label>
    <input type="password" v-model="InputVerifyPwd" />
    <br />

    <AccountRegistration
      :name="InputName"
      :cd="InputCI"
      :email="InputEmail"
      :pwd="InputPwd"
      :verifyPwd="InputVerifyPwd"
    ></AccountRegistration>
    <br />
    <br />
    <br />
  </div>
</template>
<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import AccountRegistration from "@/components/AccountRegistration.vue";
export default {
  name: "Home",
  components: {
    //HelloWorld
    AccountRegistration
  },
  data() {
    return {
      InputName: "",
      InputCI: "",
      InputEmail: "",
      InputPwd: "",
      InputVerifyPwd: ""
    };
  }
};
</script>
