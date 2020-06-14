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
    path: "/registerUsser",
    name: "RegisterUsser",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/RegisterUsser.vue")
  },
  {
    path: "/account",
    name: "Account",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Account.vue")
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Home.vue")
  },
  {
    path: "/transaction",
    name: "Transaction",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Transaction.vue")
  },
  {
    path: "/categories",
    name: "Categories",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Categories.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
