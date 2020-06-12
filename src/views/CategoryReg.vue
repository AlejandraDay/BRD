<template>
  <div>
    <CategoryReg msg="Categories Register" />
  </div>
</template>

<script>
// @ is an alias to /src
import CategoryReg from "@/components/CategoryReg.vue";
export default {
  name: "CategoryRegister",
  components: {
    CategoryReg
  }
};
</script>

<style scoped>
div {
  font-family: Helvetica, sans-serif;
}
</style>
