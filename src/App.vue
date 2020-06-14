<template>
  <div id="app">
    <div id="router">
      <router-link to="/registerUsser">Register Usser</router-link>
    </div>
    <div v-if="visible" id="position">
      <button id="profile" @click="redirectProfile()">Perfil</button>
    <div id="nav">
      <router-link to="/transaction">transactions</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#profile {
  border-radius: 50%;
  padding: 20px;
}
#position {
  text-align: right;
}
#router {
  text-align: center;
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    ...mapActions(["profileView"]),
    redirectProfile() {
      this.profileView(false);
      this.$router.push("Account");
    }
  },
  computed: {
    ...mapGetters(["getProfileView"]),
    visible() {
      return this.getProfileView;
    }
  }
};
</script>
