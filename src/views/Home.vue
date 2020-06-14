<template>
  <label for="text"> {{ getAccount.name }} </label>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    //HelloWorld
  },
  computed: {
    ...mapGetters(["getAccount"]),
    // getList,
    account() {
      return this.getAccount;
    }
  }
};
</script>
