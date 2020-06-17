<template>
  <div class="registerAccount">
    <div>
      <div class="alingR">
        <ul class="actions">
          <div class="alingButton">
            <button @click="redirectInit()" class="buttonback">←</button>
          </div>
          <div class="alingButton">
            <button @click="redirectLogin()" class="button delete">
              Sign out
            </button>
          </div>
        </ul>
      </div>
      <ul>
        <b
          ><h1>CI: {{ id }}</h1></b
        >
        <label for="text">Name:</label>
        <input v-model="accountToEdit.name" />
        <br />
        <br />
        <label for="text">Email:</label>
        <input v-model="accountToEdit.email" />
        <br />
        <br />
        <label for="text">Phone:</label>
        <input v-model="accountToEdit.phone" />
        <br />
        <br />
        <label for="text">Password:</label>
        <br />
        <input
          v-model="pwd"
          type="password"
          class="stylePwd"
          placeholder="*New password"
        />
        <input
          type="password"
          v-model="confirmPwd"
          class="stylePwd"
          placeholder="*Confirm password"
        />
        <label class="alarm" v-if="pwd == ''">*Obligatory information</label>
        <label
          class="alarm"
          v-if="pwd != '' && confirmPwd != '' && pwd != confirmPwd"
          >*Passwords don't match</label
        >
        <br />
      </ul>
      <div class="aline">
        <ul class="actions">
          <div class="alingButton">
            <button @click="saveUpdateAccount" class="button save">
              Save Changes
            </button>
          </div>
          <div class="alingButton">
            <button @click="deleteA(id)" class="button delete">
              Delete Account
            </button>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Account",
  data() {
    return {
      pwd: "",
      confirmPwd: "",
      accountToEdit: {}
    };
  },
  mounted() {
    this.accountToEdit = Object.assign({}, this.account);
  },
  computed: {
    ...mapGetters(["getAccount"]),
    ...mapGetters(["idAccount"]),
    account() {
      return this.getAccount;
    },
    id() {
      return this.idAccount;
    }
  },
  methods: {
    ...mapActions(["profileView"]),
    redirectInit() {
      this.profileView(true);
      this.$router.push("/transaction");
    },
    redirectLogin() {
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
    ...mapActions(["updateAccount"]),
    ...mapActions(["deleteAccount"]),
    saveUpdateAccount() {
      if (
        this.accountToEdit.name === "" ||
        this.accountToEdit.email === "" ||
        this.accountToEdit.phone === 0 ||
        this.pwd === "" ||
        this.confirmPwd === ""
      ) {
        alert("There don't have to be empty fields");
      } else {
        if (
          this.pwd === this.confirmPwd &&
          this.validateEmail(this.accountToEdit.email)
        ) {
          this.updateAccount({
            name: this.accountToEdit.name,
            ci: this.id,
            email: this.accountToEdit.email,
            phone: parseInt(this.accountToEdit.phone),
            pwd: this.pwd
          });
          alert("Changes made successsfully");
          this.$forceUpdate();
          this.redirectInit();
        } else {
          alert("Invalid Changes");
        }
      }
    },
    deleteA(id) {
      if (id === 0) {
        alert("This account can't be deleted because is Administrator account");
      } else {
        this.deleteAccount(id);
        this.redirectLogin();
      }
    }
  }
};
</script>
<style src="./style.css" scoped></style>
