<template>
  <div>
    <br />
    <br />
    <div>
      <ul>
        <b
          ><label>ci: {{ id }} </label></b
        >
        <br />
        <br />
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
        <!--label class="alarm2" v-if="confirmPwd == ''"
          >*Obligatory information</label
        -->
        <label
          class="alarm"
          v-if="pwd != '' && confirmPwd != '' && pwd != confirmPwd"
          >*Passwords don't match</label
        >
        <br />
        <!--div class="alingButton">
          <button @click="updateData" class="btn btn-warning">
            Actualizar
          </button>
        </div-->
      </ul>
      <div class="alingButton">
        <button @click="saveUpdateAccount" class="button save">Save</button>
      </div>
      <br />
      <div class="alingButton">
        <button @click="deleteA(id)" class="delete">
          Delete Account
        </button>
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
      //  name: "",
      //  ci: 0,
      //  email: "",
      //   phone: "",
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
    // getList,
    account() {
      return this.getAccount;
    },
    id() {
      console.log(this.idAccount);
      return this.idAccount;
    }
  },
  watch: {
    /* account: {
      handler: function(oldValue, newValue) {
        // eslint-disable-next-line no-debugger
        this.accountToEdit = Object.assign({}, this.account);
        console.log("mensaje fuera de if");
        console.log(newValue);
        if (oldValue !== newValue) {
          this.accountToEdit = Object.assign({}, this.account);
          console.log(newValue);
        }
      }
    }*/
  },
  methods: {
    ...mapActions(["profileView"]),
    redirectInit() {
      this.profileView(true);
      this.$router.push("Home");
    },
    redirectLogin() {
      this.profileView(true);
      this.$router.push("RegisterUsser");
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
    ...mapActions(["updateAccount"]),
    ...mapActions(["deleteAccount"]),
    saveUpdateAccount() {
      // eslint-disable-next-line no-debugger
      // debugger;

      if (
        this.accountToEdit.name === "" ||
        this.accountToEdit.email === "" ||
        this.accountToEdit.phone === "" ||
        this.changetype(this.pwd) === "" ||
        this.changetype(this.confirmPwd) === ""
      ) {
        console.log("There don't have to be empty fields");
      } else {
        if (
          this.changetype(this.pwd) === this.changetype(this.confirmPwd) &&
          this.validateEmail(this.accountToEdit.email)
        ) {
          this.updateAccount({
            name: this.accountToEdit.name,
            ci: this.id,
            email: this.accountToEdit.email,
            phone: this.accountToEdit.phone,
            pwd: this.changetype(this.pwd)
          });
          console.log(this.account);
          alert("Changes made successsfully");
          this.$forceUpdate();
          this.redirectInit();
        } else {
          console.log("Invalid Changes");
        }
      }
    },
    deleteA(id) {
      this.deleteAccount(id);
      //console.log()
      this.redirectLogin;
    }
  }
};
</script>
<style src="./style.css" scoped></style>
