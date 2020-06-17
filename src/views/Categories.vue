<template>
  <div>
    <button v-on:click="redirectTransactions()" class="redirectButton">
      Transactions
    </button>
    <CategoryReg />
    <div class="line"></div>
    <CategoryTable />
  </div>
</template>

<script>
import CategoryTable from "@/components/CategoryTable.vue";
import CategoryReg from "@/components/CategoryReg.vue";

export default {
  name: "Categories",
  components: {
    CategoryTable,
    CategoryReg
  },
  methods: {
    redirectTransactions() {
      this.$router.push("Transaction");
    }
  }
};
</script>

<style scoped>
.redirectButton {
  width: 10%;
  padding: 10px 10px;
  margin: 5px 5%;
  border: 2px solid rgb(212, 212, 212);
  background-color: rgb(208, 253, 255);
  box-sizing: border-box;
  border-radius: 4px;
}
div {
  font-family: Helvetica, sans-serif;
}
.line {
  margin: 50px;
  border: 1px solid black;
}
</style>
