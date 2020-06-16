<template>
  <div>
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
  }
};
</script>

<style scoped>
div {
  font-family: Helvetica, sans-serif;
}
.line {
  margin: 50px;
  border: 1px solid black;
}
</style>
