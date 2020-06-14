import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
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
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
