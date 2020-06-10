<template>
  <div class="tabla">
    <h1>{{ msg }}</h1>
    <table>
      <thead>
        <tr>
          <th :key="columna" v-for="columna in this.cabeceras">
            {{ columna }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in movimientos">
          <td>{{ item.id }}</td>
          <td>{{ item.categoria }}</td>
          <td>{{ item.monto }}</td>
          <td>{{ item.descripcion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "MovimientosTabla",
  props: {
    msg: String
  },
  data() {
    return {
      filtro: "",
      categoria: "todas"
    };
  },
  computed: {
    movimientos() {
      return this.$store.state.MOVIMIENTOS;
    },
    cabeceras() {
      return this.$store.state.CABECERAS[0];
    }
  }
};
</script>

<style scoped>
.tabla {
  font-size: 18px;
  color: brown;
}

table,
th,
td {
  border: 1px solid black;
}

table {
  margin: auto;
  width: 50%;
  padding: 10px;
}

td {
  color: black;
}
</style>
