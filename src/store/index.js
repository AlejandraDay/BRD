import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    USUARIOS: [
      { ci: 0, nombre: 'general', email: 'general@ejemplo.com', pwd: 'admin' }
    ],
    CABECERAS: [['Index', 'ID', 'Categoria', 'Monto', 'Descripción']],
    MOVIMIENTOS: [
      { usuario: 0, id: 101, categoria: 'I0', monto: 500, descripcion: 'descripción 1' },
      { usuario: 0, id: 111, categoria: 'E0', monto: -50, descripcion: 'descripción 2' },
      { usuario: 0, id: 112, categoria: 'E0', monto: -50, descripcion: 'descripción 3' },
      { usuario: 0, id: 113, categoria: 'E0', monto: -50, descripcion: 'descripción 4' },
      { usuario: 0, id: 114, categoria: 'E0', monto: -50, descripcion: 'descripción 5' },
      { usuario: 0, id: 115, categoria: 'E0', monto: -50, descripcion: 'descripción 6' },
      { usuario: 0, id: 116, categoria: 'E0', monto: -50, descripcion: 'descripción 7' },
      { usuario: 0, id: 117, categoria: 'E0', monto: -50, descripcion: 'descripción 8' },
      { usuario: 0, id: 118, categoria: 'E0', monto: -50, descripcion: 'descripción 9' },
      { usuario: 0, id: 102, categoria: 'I0', monto: 80, descripcion: 'descripción 10' },
      { usuario: 0, id: 103, categoria: 'I0', monto: 8, descripcion: 'descripción 11' },
      { usuario: 0, id: 104, categoria: 'I0', monto: 66, descripcion: 'descripción 12' }
    ],
    CUENTA_ACTUAL: -1,
    CATEGORIAS: [
      { id: 'I0', nombre: 'otros ingresos', usuario: 0 },
      { id: 'E0', nombre: 'otros egresos', usuario: 0 },
      { id: 'E0', nombre: 'inmuebles', usuario: 0 }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});
