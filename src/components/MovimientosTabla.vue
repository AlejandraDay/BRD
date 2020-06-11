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
        <tr :key="item.id" v-for="(item, index) in movimientos">
          <td v-if="index >= limiteInferior && index <= limiteSuperior">
            {{ index }}
          </td>
          <td v-if="index >= limiteInferior && index <= limiteSuperior">
            {{ item.id }}
          </td>
          <td v-if="index >= limiteInferior && index <= limiteSuperior">
            {{ item.categoria }}
          </td>
          <td v-if="index >= limiteInferior && index <= limiteSuperior">
            {{ item.monto }}
          </td>
          <td v-if="index >= limiteInferior && index <= limiteSuperior">
            {{ item.descripcion }}
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <select v-model="elemento">
        <option :key="item" v-for="item in this.elementos">{{ item }}</option>
      </select>
      <button>Inicio</button>
      <button>Anterior</button>
      <button>Siguiente</button>
      <button>Final</button>
    </div>
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
      elementos: [5, 10, 15],
      elemento: 5,
      agrupar: 1
    };
  },
  computed: {
    movimientos() {
      return this.$store.state.MOVIMIENTOS;
    },
    cabeceras() {
      return this.$store.state.CABECERAS[0];
    },
    limiteSuperior() {
      return this.elemento * this.agrupar;
    },
    limiteInferior() {
      return this.limiteSuperior - this.elemento;
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
