<template>
  <div>
    <CategoryTable msg="Categories Table" />
  </div>
</template>

<script>
// @ is an alias to /src
import CategoryTable from "@/components/CategoryTable.vue";
export default {
  name: "Categories",
  components: {
    CategoryTable
  }
};
</script>

<style scoped>
div {
  font-family: Helvetica, sans-serif;
}
</style>
