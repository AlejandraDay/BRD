import AccountView from "@/views/Account.vue";
//import Account from "@/components/AccountData";
import RegisterAccountView from "@/views/RegisterUsser.vue";
import RegisterAccount from "@/components/Usser.vue";
import { assert } from "chai";
import { shallowMount, createLocalVue /*mount*/ } from "@vue/test-utils";

import VueRouter from "vue-router";
import Vuex from "vuex";
//import store from "@/store";
import { mockStore } from "./mockStore";

describe("Account.vue", () => {
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
  it("The Account-Actual should be rendered", () => {
    const wrapper = shallowMount(AccountView, {
      router,
      store,
      localVue
    }); // wrapper = { new Vue(), html, find, findAll, etc }
    const account = "Account";
    const titleAccountActual = wrapper.find("#account");

    assert.equal(titleAccountActual.text(), account);
  });
  /*it("Delete actual account", () => {
    const wrapper = shallowMount(Account, {
      store,
      localVue
    });
    let initialAccountListLength = 3;
    wrapper.$store.state.CURRENT_USER;
  });*/
});
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
  it("The Register Account should be rendered", () => {
    const wrapper = shallowMount(RegisterAccountView, {
      store,
      localVue
    }); // wrapper = { new Vue(), html, find, findAll, etc }
    const titleAccountActual = wrapper.find("#usser");

    assert.equal(titleAccountActual.text(), "Register Account");
  });
  it("All input have obligatory information", () => {
    const wrapper = shallowMount(RegisterAccount, {
      data: {
        message: "*Obligatory information",
        name: "",
        ci: 0,
        email: "",
        phone: "",
        pwd: "",
        confirmPwd: ""
      },
      store,
      localVue
      //router
    });
    const alarmMessage = wrapper.find(".alarm");
    assert.isTrue(wrapper.exists());
    assert.equal(alarmMessage.text(), "*Obligatory information");
    wrapper.setData({
      name: "nombre",
      ci: 0,
      email: "",
      phone: "122212",
      pwd: "12",
      confirmPwd: "12"
    });
    assert.isFalse(wrapper.isEmpty());
  });
  it("Equal of password and confirm Password", () => {
    const wrapper = shallowMount(RegisterAccount, {
      store,
      localVue,
      router
    });
    wrapper.vm.pwd = "12";
    wrapper.vm.confirmPwd = "123345";
    wrapper.vm.registerNewAccount();
    const password = wrapper.find("#pwd");
    const confirmPwd = wrapper.find("#confirmPwd");
    //console.log(password);
    assert.isTrue(wrapper.exists());
    assert.equal(password.text(), confirmPwd.text());
    //assert.isFalse(wrapper.isEmpty());
  });
  it("Add new Account", () => {
    const wrapper = shallowMount(RegisterAccount, {
      store,
      localVue,
      router
    });
    let initialAccountListLength = wrapper.vm.$store.state.ACCOUNTS.length;
    wrapper.vm.ci = 7;
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
