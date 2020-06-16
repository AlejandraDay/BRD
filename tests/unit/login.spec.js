import Home from "@/views/Home.vue";
import Login from "@/components/Login.vue";

import { assert, expect } from "chai";
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";

import VueRouter from "vue-router";
import Vuex from "vuex";
//import store from "@/store";
import { mockStore } from "./mockStore";

describe("Testing Login", () => {
  let wrapper;
  let localVue;
  let store;
  let router;

  before(function() {
    global.alert = function(alertMessage) {
      wrapper.vm.alertMessage == alertMessage;
    };
    const originalPush = VueRouter.prototype.push;
    VueRouter.prototype.push = function push(location) {
      return originalPush.call(this, location).catch(err => err);
    };
  });

  beforeEach(function() {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    store = new Vuex.Store(mockStore);
    router = new VueRouter({ routes: [] });
    router.push("/");
  });

  it("The full home view is rendered", () => {
    wrapper = mount(Home, {
      store
    });
    expect(wrapper.find(".login").exists()).true;
    expect(wrapper.find(".home").exists()).true;
    expect(wrapper.find("input.ci").exists()).true;
    expect(wrapper.find("input.pwd").exists()).true;
    expect(wrapper.find("button.log").exists()).true;
    expect(wrapper.find("button.register").exists()).true;
  });

  it("A unregistered user can't log in", () => {
    wrapper = shallowMount(Login, {
      store
    });
    wrapper.vm.alertMessage = "";
    wrapper.vm.ci = 123456789;
    wrapper.vm.pwd = "hola bola";
    wrapper.vm.login();
    assert.equal(
      wrapper.vm.alertMessage,
      "Te user with that CI doesn't exist!!!"
    );
  });

  it("A registered user can't log in with wrong password", () => {
    wrapper = shallowMount(Login, {
      store
    });
    wrapper.vm.alertMessage = "";
    wrapper.vm.ci = 0;
    wrapper.vm.pwd = "hola bola";
    wrapper.vm.login();
    assert.equal(
      wrapper.vm.alertMessage,
      "Wrong password!!!\nPlease try again."
    );
  });

  it("A registered user can log in", () => {
    wrapper = shallowMount(Login, {
      store,
      router,
      localVue
    });
    wrapper.vm.alertMessage = "";
    wrapper.vm.ci = 0;
    wrapper.vm.pwd = "admin";
    let path = wrapper.vm.$router.currentRoute.path;
    wrapper.vm.login();
    assert.equal(
      wrapper.vm.alertMessage,
      // eslint-disable-next-line prettier/prettier
      `Welcome ${wrapper.vm.getUsers.filter(u => u.ci === parseInt(wrapper.vm.ci))[0].name}`
    );
    assert.notEqual(path, wrapper.vm.$router.currentRoute.path);
    assert.equal(wrapper.vm.$router.currentRoute.path, "/Transaction");
  });

  it("Login test by interface (login button)", () => {
    wrapper = shallowMount(Login, {
      store,
      router,
      localVue
    });
    wrapper.vm.alertMessage = "";
    wrapper.vm.ci = "";
    wrapper.vm.pwd = "";
    let path = wrapper.vm.$router.currentRoute.path;
    wrapper.find("input.ci").setValue("0");
    wrapper.find("input.pwd").setValue("admin");
    wrapper.find("button.log").trigger("click");
    assert.equal(
      wrapper.vm.alertMessage,
      // eslint-disable-next-line prettier/prettier
      `Welcome ${wrapper.vm.getUsers.filter(u => u.ci === parseInt(wrapper.vm.ci))[0].name}`
    );
    assert.notEqual(path, wrapper.vm.$router.currentRoute.path);
    assert.equal(wrapper.vm.$router.currentRoute.path, "/Transaction");
  });

  it("Login test by interface (password input enter)", () => {
    wrapper = shallowMount(Login, {
      store,
      router,
      localVue
    });
    wrapper.vm.alertMessage = "";
    wrapper.vm.ci = "";
    wrapper.vm.pwd = "";
    let path = wrapper.vm.$router.currentRoute.path;
    wrapper.find("input.ci").setValue("0");
    wrapper.find("input.pwd").trigger("click");
    wrapper.find("input.pwd").setValue("admin");
    wrapper.find("input.pwd").trigger("keyup.enter");
    assert.equal(
      wrapper.vm.alertMessage,
      // eslint-disable-next-line prettier/prettier
      `Welcome ${wrapper.vm.getUsers.filter(u => u.ci === parseInt(wrapper.vm.ci))[0].name}`
    );
    assert.notEqual(path, wrapper.vm.$router.currentRoute.path);
    assert.equal(wrapper.vm.$router.currentRoute.path, "/Transaction");
  });
  it("Going to register a user", () => {
    wrapper = shallowMount(Login, {
      store,
      router,
      localVue
    });
    let path = wrapper.vm.$router.currentRoute.path;
    wrapper.find("button.register").trigger("click");
    assert.notEqual(path, wrapper.vm.$router.currentRoute.path);
    assert.equal(wrapper.vm.$router.currentRoute.path, "/RegisterUsser");
  });
});
