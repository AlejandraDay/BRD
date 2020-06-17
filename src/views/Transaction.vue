<template>
  <div>
    <TransactionTable
      msg="Here you can see your balance and choose what to see"
    />
    <button class="add" v-on:click="goAdd()">add</button>
    <button class="ed" v-on:click="goEditDelete()">Edit/Delete</button>
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
button {
  border: black;
  border-color: black;
  background: rgb(255, 255, 255);
  color: rgb(19, 170, 82);
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  display: inline-block;
}

.ed,
.add {
  margin-left: 1%;
}

.cat {
  margin-left: 72%;
}

div {
  font-family: Helvetica, sans-serif;
}
</style>
