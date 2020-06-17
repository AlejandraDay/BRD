import Account from "@/components/AccountData";
//import Login from "@/components/Login.vue";
//import perfil from "@/App.vue";
import { assert } from "chai";
import { shallowMount, createLocalVue /*mount*/ } from "@vue/test-utils";

import VueRouter from "vue-router";
import Vuex from "vuex";
import { mockStore } from "./mockStore";

describe("AccountData.vue", () => {
  let localVue;
  let router;
  let store;

  before(() => {
    global.alert = function(alertMessage) {
      console.log(alertMessage);
    };
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
  });
  it("Delete Actual Account", () => {
    const wrapper = shallowMount(Account, {
      store,
      localVue,
      router
    });
    let initialAccountListLength = wrapper.vm.$store.state.ACCOUNTS.length;
    wrapper.vm.deleteA(7815499);
    let accountListLength = wrapper.vm.$store.state.ACCOUNTS.length;
    assert.equal(accountListLength, initialAccountListLength - 1);
  });

  it("Delete Account with transactions registered", () => {
    const wrapper = shallowMount(Account, {
      store,
      localVue,
      router
    });
    let initialAccountListLength = wrapper.vm.$store.state.ACCOUNTS.length;
    wrapper.vm.deleteA(2);
    let accountListLength = wrapper.vm.$store.state.ACCOUNTS.length;
    assert.equal(accountListLength, initialAccountListLength);
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

  it("Update Account", () => {
    const wrapper = shallowMount(Account, {
      store,
      localVue,
      router
    });

    wrapper.vm.$store.state.CURRENT_USER = 2;
    wrapper.vm.accountToEdit.name = "nombre";
    wrapper.vm.accountToEdit.email = "email@gmail.com";
    wrapper.vm.accountToEdit.phone = "122212";
    wrapper.vm.pwd = "12";
    wrapper.vm.confirmPwd = "12";
    wrapper.vm.saveUpdateAccount();

    let updated = wrapper.vm.$store.state.ACCOUNTS.filter(u => u.ci === 2)[0];
    assert.equal(wrapper.vm.accountToEdit.name, updated.name);
    assert.equal(wrapper.vm.accountToEdit.email, updated.email);
    assert.equal(wrapper.vm.accountToEdit.phone, updated.phone);
    assert.equal(wrapper.vm.pwd, updated.pwd);
  });
});
