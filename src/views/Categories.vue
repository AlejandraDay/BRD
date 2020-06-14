<template>
  <div>
    <CategoryReg />
    <CategoryTable />
  </div>
</template>

<script>
// @ is an alias to /src
import CategoryTable from "@/components/CategoryTable.vue";
import CategoryReg from "@/components/CategoryReg.vue";

export default {
  name: "Categories",
  components: {
    CategoryTable,
    CategoryReg
  }
};
</script>

<style scoped>
div {
  font-family: Helvetica, sans-serif;
}
</style>
