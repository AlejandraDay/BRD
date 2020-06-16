<template>
  <div>
    <TransactionTable msg="This is the transaction's table" />
    <br />
    <button class="add" v-on:click="goAdd()">add</button>
    <br />
    <button class="ed" v-on:click="goEditDelete()">Edit/Delete</button>
    <br />
    <button class="cat" v-on:click="goCategories()">Categories</button>
  </div>
</template>

<script>
// @ is an alias to /src
import TransactionTable from "@/components/TransactionTable.vue";

export default {
  name: "Transaction",
  components: {
    TransactionTable
  },
  methods: {
    goEditDelete() {
      this.$router.push("/ModifyDeleteItem");
    },
    goAdd() {
      this.$router.push("/registerIncomeExpense");
    },
    goCategories() {
      this.$router.push("/categories");
    }
  }
};
</script>

<style scoped>
div {
  font-family: Helvetica, sans-serif;
}
</style>
