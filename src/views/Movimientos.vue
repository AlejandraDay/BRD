<template>
  <div>
    <MovimientosTabla msg="Esta es la sección de la tabla de movimientos" />
  </div>
</template>

<script>
// @ is an alias to /src
import MovimientosTabla from "@/components/MovimientosTabla.vue";

export default {
  name: "Movimientos",
  components: {
    MovimientosTabla
  }
};
</script>

<style scoped>
div {
  font-family: Helvetica, sans-serif;
}
</style>
