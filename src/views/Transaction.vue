<template>
  <div>
    <TransactionTable msg="This is the transaction's table" />
    <br />
    <button>Add/Edit/Delete</button>
    <br />
    <button>Categories</button>
  </div>
</template>

<script>
// @ is an alias to /src
import TransactionTable from "@/components/TransactionTable.vue";

export default {
  name: "Transaction",
  components: {
    TransactionTable
  }
};
</script>

<style scoped>
div {
  font-family: Helvetica, sans-serif;
}
</style>
