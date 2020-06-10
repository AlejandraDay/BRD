<template>
  <div class="SelectOperation">
    <br />
    <label>Register Account </label>
    <div class="Data">
      <label for="text">Name:</label>
      <input v-model="name" type="text" />
      <br />
      <br />
      <label for="text">CI:</label>
      <input v-model="ci" type="text" />
      <br />
      <br />
      <label for="text">Email:</label>
      <input v-model="email" type="text" />
      <br />
      <br />
      <label for="text">Phone:</label>
      <input v-model="phone" type="text" />
      <br />
      <br />
      <label for="text">Password:</label>
      <input v-model="pwd" type="password" />
      <!--input type="checkbox" v-model="check" /-->
      Show Password
      <br />
      <br />
      <label for="text">Confirm Password:</label>
      <input v-model="confirmPwd" type="password" />
      <br />
      <br />
    </div>
    <div>
      <button @click="registerItem" class="button save">Save</button>
    </div>
    <table>
      <thead>
        <tr>
          <th :key="column" v-for="column in columns">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.name" v-for="item in items">
          <td>{{ item.name }}</td>
          <td>{{ item.ci }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.pwd }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Usser",
  components: {},
  data() {
    return {
      columns: ["Name", "ci", "email", "pwd"],
      name: "",
      ci: "",
      email: "",
      phone: "",
      pwd: "",
      confirmPwd: "",
      //pwdVisible: "password",
      check: false
    };
  },
  watch: {
    /*  check: {
      handler: function(newType, oldType) {
        var inputPwd = this.pwd;
        if (inputPwd.type == "password" && newType != oldType) {
          inputPwd.type = "text";
          console.log("hecho");
        } else {
          inputPwd.type = "password";
        }
      }
    }*/
  },
  computed: {
    ...mapGetters(["getItemList"]),
    // getList,
    items() {
      return this.getItemList;
    }
  },
  methods: {
    validarEmail(email) {
      var valEmail = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
      if (valEmail.test(email)) {
        alert("La dirección de email " + email + " es correcta.");
        return true;
      } else {
        alert("La dirección de email es incorrecta.");
        return false;
      }
    },
    changetype(pwd) {
      if (pwd.type == "password") {
        pwd.type = "text";
      }
      return pwd;
    },
    ...mapActions(["addItem"]),
    registerItem() {
      if (
        this.name == "" ||
        this.ci == "" ||
        this.email == "" ||
        this.phone == "" ||
        this.changetype(this.pwd) == "" ||
        this.changetype(this.confirmPwd) == ""
      ) {
        console.log("Llenar campos");
      } else {
        if (
          this.changetype(this.pwd) == this.changetype(this.confirmPwd) &&
          this.validarEmail(this.email)
        ) {
          this.addItem({
            name: this.name,
            ci: this.ci,
            email: this.email,
            phone: this.phone,
            pwd: this.changetype(this.pwd)
          });
          console.log("saved");
        } else {
          console.log("contraseña invalida");
        }
      }
    }
    //<style src="./Register.css" scoped></style>
  }
};
</script>
