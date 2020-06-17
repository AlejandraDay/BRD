<template>
  <div id="app">
    <div v-if="visible" id="position">
      <br />
      <button class="button profile" @click="redirectProfile()">
        Perfil
      </button>
    </div>
    <div id="nav">
      <router-link to="/"></router-link>
    </div>
    <router-view />
  </div>
</template>

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
#position {
  text-align: right;
}
#router {
  text-align: center;
}
.profile {
  border-radius: 50%;
  padding: 20px;
  background-color: white;
  color: black;
  border: 2px solid #4caf50;
}

.profile:hover {
  background-color: #4caf50;
  color: white;
}
</style>
