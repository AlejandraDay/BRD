<template>
  <div class="DataAcc">
    <br />
    <h1>Register Account</h1>
    <div class="Data">
      <label for="text">Name:</label>
      <input
        name="name"
        id="name"
        type="text"
        placeholder="Name"
        v-model="name"
      />
      <label class="alarm" v-if="name == ''">*Obligatory information</label>
      <br />
      <br />
      <label for="text">CI:</label>
      <input v-model="ci" type="number" />
      <label class="alarm" v-if="ci == 0">*Obligatory information</label>

      <br />
      <br />
      <label for="text">Email:</label>
      <input v-model="email" type="text" placeholder="example@gmail.com" />
      <label class="alarm" v-if="email == ''">*Obligatory information</label>

      <label class="alarm" v-if="email != '' && !validateEmail(email)"
        >*Email is incorrect</label
      >
      <br />
      <br />
      <label for="text">Phone:</label>
      <input v-model="phone" type="text" />
      <label class="alarm" v-if="phone == ''">*Obligatory information</label>

      <br />
      <br />
      <label for="text">Password:</label>
      <input id="pwd" class="stylePwd" v-model="pwd" type="password" />
      <label class="alarm" v-if="pwd == ''">*Obligatory information</label>
      <br />
      <br />
      <label for="text">Confirm Password:</label>
      <input
        id="confirmPwd"
        class="stylePwd"
        v-model="confirmPwd"
        type="password"
      />
      <label class="alarm" v-if="confirmPwd == ''"
        >*Obligatory information</label
      >
      <br />
      <label
        id="dontEqual"
        v-if="pwd != '' && confirmPwd != '' && pwd != confirmPwd"
        >*Passwords don't match</label
      >
      <br />
      <br />
      <div class="alingButton">
        <button @click="registerNewAccount" class="button save">Save</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Usser",
  components: {},
  data() {
    return {
      name: "",
      ci: 0,
      email: "",
      phone: "",
      pwd: "",
      confirmPwd: "",
      //pwdVisible: "password",
      check: false
    };
  },

  methods: {
    ...mapActions(["profileView"]),
    redirectView() {
      this.profileView(false);
      this.$router.push("Account");
    },
    validateEmail(email) {
      var valEmail = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
      if (valEmail.test(email)) {
        //alert("The email address " + email + " is correct.");
        return true;
      } else {
        //console.log("The email address is incorrect.");
        return false;
      }
    },
    changetype(pwd) {
      if (pwd.type == "password") {
        pwd.type = "text";
      }
      return pwd;
    },
    ...mapActions(["addAccount"]),
    ...mapActions(["updateAccountUsser"]),
    registerNewAccount() {
      if (
        this.name == "" ||
        this.ci == 0 ||
        this.email == "" ||
        this.phone == "" ||
        this.changetype(this.pwd) == "" ||
        this.changetype(this.confirmPwd) == ""
      ) {
        console.log("There don't have to be empty fields");
      } else {
        if (
          this.changetype(this.pwd) == this.changetype(this.confirmPwd) &&
          this.validateEmail(this.email)
        ) {
          this.addAccount({
            name: this.name,
            ci: this.ci,
            email: this.email,
            phone: this.phone,
            pwd: this.changetype(this.pwd)
          });
          console.log("Saved Account");
          this.updateAccountUsser(this.ci);
          this.redirectView();
        } else {
          console.log("Invalid Password");
        }
      }
    }
  }
};
</script>
<style src="./style.css" scoped></style>
