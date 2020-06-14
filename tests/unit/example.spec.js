import { expect, assert } from "chai";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import CategoryTable from "@/components/CategoryTable.vue";
import CategoryReg from "@/components/CategoryReg.vue";
//import store from "@/store";
import { mockCategories } from "./mockCategories.js";
import VueRouter from "vue-router";
import Vuex from "vuex";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });
});

describe("Category", () => {
  let localVue;
  let router;
  let store;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    router = new VueRouter({ routes: [] });
    store = new Vuex.Store(mockCategories);
  });

  it("Table title should be rendered", () => {
    const expectedTitle = "Categories Table";
    const wrapper = shallowMount(CategoryTable, { store, localVue });
    const titleInComponent = wrapper.find("#categoryTable-title");
    assert.equal(titleInComponent.text(), expectedTitle);
  });
  it("Register title should be rendered", () => {
    const expectedTitle = "Register a Category";
    const wrapper = shallowMount(CategoryReg, { store, localVue });
    const titleInComponent = wrapper.find("#categoryRegister-title");
    assert.equal(titleInComponent.text(), expectedTitle);
  });
  it("Table filter should start with All", () => {
    const expectedFilter = "All";
    const wrapper = shallowMount(CategoryTable, { store, localVue });
    const filterInComponent = wrapper.vm.$data.filter;
    assert.equal(filterInComponent, expectedFilter);
  });
  it("Next id on categories list should be 4", () => {
    const wrapper = mount(CategoryReg, { store, localVue, router });
    assert(wrapper.vm.lastId, 4);
  });
});
