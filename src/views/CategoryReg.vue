<template>
  <div>
    <button @click="redirectTable()" class="addbutton">Go to Table</button>
    <CategoryReg />
  </div>
</template>

<script>
import CategoryReg from "@/components/CategoryReg.vue";
export default {
  name: "CategoryRegister",
  components: {
    CategoryReg
  },
  methods: {
    redirectTable() {
      this.$router.push("categories");
    }
  }
};
</script>

<style scoped>
div {
  font-family: Helvetica, sans-serif;
}
</style>
