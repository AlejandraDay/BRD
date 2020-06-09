import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/registerIncomeExpense",
    name: "RegisterIncomeExpenseView",
    component: () => import("../views/RegisterIncomeExpenseView.vue")
  },
  {
    path: "/ModifyDeleteItem",
    name: "ModifyDeleteItemView",
    component: () => import("../views/ModifyDeleteItemView.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
