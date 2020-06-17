import Account from "@/components/AccountData";
//import Login from "@/components/Login.vue";
//import perfil from "@/App.vue";
import { assert } from "chai";
import { shallowMount, createLocalVue /*mount*/ } from "@vue/test-utils";

import VueRouter from "vue-router";
import Vuex from "vuex";
//import store from "@/store";
import { mockStore } from "./mockStore";

describe("AccountData.vue", () => {
  let localVue;
  let router;
  let store;

  before(() => {
    const originalPush = VueRouter.prototype.push;
    VueRouter.prototype.push = function push(location) {
      return originalPush.call(this, location).catch(err => err);
    };
  });

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    router = new VueRouter({ routes: [] });
    store = new Vuex.Store(mockStore);
    // NEXT steps> move this to a util.
    // wrapper = TestUtil.get(.....)
  });
  it("Delete Actual Account", async () => {
    const wrapper = shallowMount(Account, {
      store,
      localVue,
      router
    });
    let initialAccountListLength = wrapper.vm.$store.state.ACCOUNTS.length;
    await wrapper.vm.deleteA(2);
    let accountListLength = wrapper.vm.$store.state.ACCOUNTS.length;
    assert.equal(accountListLength, initialAccountListLength - 1);
  });
  it("Don't delete administrator account", async () => {
    const wrapper = shallowMount(Account, {
      store,
      localVue,
      router
    });
    let initialAccountListLength = wrapper.vm.$store.state.ACCOUNTS.length;
    await wrapper.vm.deleteA(0);
    let accountListLength = wrapper.vm.$store.state.ACCOUNTS.length;
    assert.equal(accountListLength, initialAccountListLength);
  });
  /*  it("Add new Account", () => {
    const wrapper = shallowMount(Account, {
      store,
      localVue,
      router
    });

    wrapper.vm.ci = 44;
    wrapper.vm.name = "nombre";
    wrapper.vm.email = "email@gmail.com";
    wrapper.vm.phone = "122212";
    wrapper.vm.pwd = "12";
    wrapper.vm.confirmPwd = "12";
    wrapper.vm.registerNewAccount();
  });*/
});
