<template>
  <div class="registerAccount">
    <br />
    <h3>Register Account</h3>
    <div class="aline">
      <button @click="redirectInit()" class="buttonback">←</button>
    </div>
    <div class="Data">
      <ul class="actions">
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
          v-on:keyup.enter="registerNewAccount"
        />
        <label class="alarm" v-if="confirmPwd == ''"
          >*Obligatory information</label
        >
        <br />
        <label
          class="notEqual"
          v-if="pwd != '' && confirmPwd != '' && pwd != confirmPwd"
          >*Passwords don't match</label
        >
        <br />
        <br />
        <div class="aline">
          <button @click="registerNewAccount" class="button save">
            Save Account
          </button>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Usser",
  components: {},
  data() {
    return {
      name: "",
      ci: 0,
      email: "",
      phone: 0,
      pwd: "",
      confirmPwd: "",
      check: false
    };
  },
  computed: {
    ...mapGetters(["getAccounts"]),
    getAllAccount() {
      return this.getAccounts;
    }
  },
  methods: {
    ...mapActions(["profileView"]),
    redirectView() {
      this.profileView(true);
      this.$router.push("/transaction");
    },
    redirectInit() {
      this.profileView(false);
      this.$router.push("/");
    },
    validateEmail(email) {
      var valEmail = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
      if (valEmail.test(email)) {
        return true;
      } else {
        return false;
      }
    },
    ...mapActions(["addAccount"]),
    ...mapActions(["updateAccountUsser"]),
    registerNewAccount() {
      var ciRepeat = false;
      if (
        this.name === "" ||
        this.ci === 0 ||
        this.email === "" ||
        this.phone === 0 ||
        this.pwd === "" ||
        this.confirmPwd === ""
      ) {
        alert("There don't have to be empty fields");
      } else {
        this.getAllAccount.forEach(account => {
          if (account.ci === parseInt(this.ci)) {
            ciRepeat = true;
          }
        });
        if (ciRepeat) {
          alert("Code already exists");
        } else {
          if (this.pwd === this.confirmPwd && this.validateEmail(this.email)) {
            this.addAccount({
              name: this.name,
              ci: this.ci,
              email: this.email,
              phone: parseInt(this.phone),
              pwd: this.pwd
            });
            alert("Saved Account");
            this.updateAccountUsser(this.ci);
            this.redirectView();
          } else {
            alert("Invalid Password");
          }
        }
      }
    }
  }
};
</script>
<style src="./style.css" scoped></style>
