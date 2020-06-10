import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    USUARIOS: [
      { ci: 0, nombre: "general", email: "general@ejemplo.com", pwd: "admin" }
    ],
    CABECERAS: [["ID", "Categoria", "Monto", "Descripción"]],
    MOVIMIENTOS: [
      {
        usuario: 0,
        id: 101,
        categoria: "I0",
        monto: 500,
        descripcion: "descripción 1"
      },
      {
        usuario: 0,
        id: 111,
        categoria: "E0",
        monto: 50,
        descripcion: "descripción 2"
      }
    ],
    CUENTA_ACTUAL: -1,
    CATEGORIAS: [
      { id: "I0", nombre: "otros ingresos", usuario: 0 },
      { id: "E0", nombre: "otros egresos", usuario: 0 }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});
