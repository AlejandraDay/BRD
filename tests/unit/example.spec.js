/*import { assert } from "chai";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";

import AccountView from "@/views/Account.vue";
import RegisterAccount from "@/views/RegisterUsser.vue";
import RegisterAccountView from "@/components/Usser.vue";

import VueRouter from "vue-router";
import Vuex from "vuex";
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
});
describe("RegisterAccount.vue", () => {
  let localVue;
  // let router;
  let store;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    //router = new VueRouter({ routes: [] });
    store = new Vuex.Store(mockStore);
    // NEXT steps> move this to a util.
    // wrapper = TestUtil.get(.....)
  });
  it("The Register Account should be rendered", () => {
    const wrapper = shallowMount(RegisterAccount, {
      store,
      localVue
    }); // wrapper = { new Vue(), html, find, findAll, etc }
    const titleAccountActual = wrapper.find("#usser");

    assert.equal(titleAccountActual.text(), "Register Account");
  });
  it("All input have obligatory information", () => {
    const wrapper = shallowMount(RegisterAccountView, {
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
      email: "email@gmail.com",
      phone: "122212",
      pwd: "12",
      confirmPwd: "12"
    });
    assert.isFalse(wrapper.isEmpty());
  });
});
*/
