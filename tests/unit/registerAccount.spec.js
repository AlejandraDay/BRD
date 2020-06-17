import RegisterAccount from "@/components/Usser.vue";
import { assert } from "chai";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";

import VueRouter from "vue-router";
import Vuex from "vuex";
//import store from "@/store";
import { mockStore } from "./mockStore";

describe("RegisterAccount.vue", () => {
  let localVue;
  let router;
  let store;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    router = new VueRouter({ routes: [] });
    store = new Vuex.Store(mockStore);
    // NEXT steps> move this to a util.
    // wrapper = TestUtil.get(.....)
  });
  it("All input have obligatory information", () => {
    const wrapper = mount(RegisterAccount, {
      store,
      localVue,
      router
    });
    wrapper.vm.ci = 45;
    wrapper.vm.name = "";
    wrapper.vm.email = "email@gmail.com";
    wrapper.vm.phone = "";
    wrapper.vm.pwd = "12";
    wrapper.vm.confirmPwd = "12";
    let length = wrapper.vm.$store.state.ACCOUNTS.length;
    wrapper.vm.registerNewAccount();
    assert.equal(wrapper.vm.$store.state.ACCOUNTS.length, length);
  });
  it("Equal of password and confirm Password", () => {
    const wrapper = mount(RegisterAccount, {
      store,
      localVue,
      router
    });
    wrapper.vm.pwd = "12";
    wrapper.vm.confirmPwd = "123345";
    let length = wrapper.vm.$store.state.ACCOUNTS.length;
    wrapper.vm.registerNewAccount();
    assert.equal(wrapper.vm.$store.state.ACCOUNTS.length, length);
  });
  it("Add new Account", () => {
    const wrapper = shallowMount(RegisterAccount, {
      store,
      localVue,
      router
    });
    let initialAccountListLength = wrapper.vm.$store.state.ACCOUNTS.length;
    wrapper.vm.ci = 44;
    wrapper.vm.name = "nombre";
    wrapper.vm.email = "email@gmail.com";
    wrapper.vm.phone = "122212";
    wrapper.vm.pwd = "12";
    wrapper.vm.confirmPwd = "12";
    wrapper.vm.registerNewAccount();
    let accountListLength = wrapper.vm.$store.state.ACCOUNTS.length;
    assert.equal(accountListLength, initialAccountListLength + 1);
  });
});
