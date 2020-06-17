import Transaction from "@/views/Transaction.vue";
import TTable from "@/components/TransactionTable.vue";

import { assert, expect } from "chai";
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";

import VueRouter from "vue-router";
import Vuex from "vuex";
import { mockStore } from "./mockStore";

describe("Testing Transactions", () => {
  let wrapper;
  let localVue;
  let store;
  let router;

  before(function() {
    global.alert = function(alertMessage) {
      console.log(alertMessage);
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
    router.push("/Transaction");
  });

  it("The full transaction view is rendered", () => {
    wrapper = mount(Transaction, {
      store
    });
    wrapper.vm.$store.state.CURRENT_USER = 0;
    wrapper = mount(Transaction, {
      store
    });
    expect(wrapper.find(".add").exists()).true;
    expect(wrapper.find(".ed").exists()).true;
    expect(wrapper.find(".cat").exists()).true;
    expect(wrapper.find(".transactions").exists()).true;
    expect(wrapper.find(".filterByDateCategoy").exists()).true;
    expect(wrapper.find(".year").exists()).true;
    expect(wrapper.find(".month").exists()).true;
    expect(wrapper.find(".date").exists()).true;
    expect(wrapper.find(".category").exists()).true;
    expect(wrapper.find(".header").exists()).true;
    expect(wrapper.find(".sort").exists()).true;
    expect(wrapper.find(".direction").exists()).true;
    expect(wrapper.find(".paging").exists()).true;
    expect(wrapper.find(".select").exists()).true;
    expect(wrapper.find(".start").exists()).true;
    expect(wrapper.find(".goleft").exists()).true;
    expect(wrapper.find(".goright").exists()).true;
    expect(wrapper.find(".end").exists()).true;
    expect(wrapper.find(".profit").exists()).true;
    expect(wrapper.find(".expense").exists()).true;
    expect(wrapper.find("label.total").exists()).true;
  });

  it("Redirects to add transactions", () => {
    wrapper = shallowMount(Transaction, {
      router,
      localVue
    });

    let path = wrapper.vm.$router.currentRoute.path;
    wrapper.find(".add").trigger("click");
    assert.notEqual(path, wrapper.vm.$router.currentRoute.path);
    assert.equal(
      wrapper.vm.$router.currentRoute.path,
      "/registerIncomeExpense"
    );
  });

  it("Redirects to edit/delete transactions", () => {
    wrapper = shallowMount(Transaction, {
      router,
      localVue
    });

    let path = wrapper.vm.$router.currentRoute.path;
    wrapper.find(".ed").trigger("click");
    assert.notEqual(path, wrapper.vm.$router.currentRoute.path);
    assert.equal(wrapper.vm.$router.currentRoute.path, "/ModifyDeleteItem");
  });

  it("Redirects to Categories view", () => {
    wrapper = shallowMount(Transaction, {
      router,
      localVue
    });

    let path = wrapper.vm.$router.currentRoute.path;
    wrapper.find(".cat").trigger("click");
    assert.notEqual(path, wrapper.vm.$router.currentRoute.path);
    assert.equal(wrapper.vm.$router.currentRoute.path, "/categories");
  });

  it("Testing the filter's checkboxes", () => {
    wrapper = shallowMount(TTable, {
      store
    });

    wrapper.find(".year").trigger("click");
    expect(wrapper.vm.filterDateBy.year).true;

    wrapper.find(".month").trigger("click");
    expect(wrapper.vm.filterDateBy.month).true;

    wrapper.find(".date").trigger("click");
    expect(wrapper.vm.filterDateBy.date).true;

    wrapper.find(".category").trigger("click");
    expect(wrapper.vm.filterCategoryBy).true;
  });

  it("Filters by year", () => {
    wrapper = shallowMount(TTable, {
      store
    });

    wrapper.find(".year").trigger("click");
    wrapper.vm.filterDate = "2001-12-03";
    wrapper.vm.filteredByDC.forEach(item => {
      assert.equal(item.date.year, 2001);
    });
  });

  it("Filters by month", () => {
    wrapper = shallowMount(TTable, {
      store
    });

    wrapper.find(".month").trigger("click");
    wrapper.vm.filterDate = "2001-11-03";
    wrapper.vm.filteredByDC.forEach(item => {
      assert.equal(item.date.month, 11);
    });
  });

  it("Filters by date", () => {
    wrapper = shallowMount(TTable, {
      store
    });

    wrapper.find(".date").trigger("click");
    wrapper.vm.filterDate = "2001-11-03";
    wrapper.vm.filteredByDC.forEach(item => {
      assert.equal(item.date.date, 3);
    });
  });

  it("Filters by year, month and date", () => {
    wrapper = shallowMount(TTable, {
      store
    });

    wrapper.find(".year").trigger("click");
    wrapper.find(".month").trigger("click");
    wrapper.find(".date").trigger("click");
    wrapper.vm.filterDate = "2000-12-01";
    wrapper.vm.filteredByDC.forEach(item => {
      assert.equal(item.date.year, 2000);
      assert.equal(item.date.month, 12);
      assert.equal(item.date.date, 1);
    });
  });

  it("Filters by year, month and date that don't exist", () => {
    wrapper = shallowMount(TTable, {
      store
    });

    wrapper.find(".year").trigger("click");
    wrapper.find(".month").trigger("click");
    wrapper.find(".date").trigger("click");
    wrapper.vm.filterDate = "2012-12-01";
    assert.equal(wrapper.vm.filteredByDC.length, 0);
  });

  it("Filters by category", () => {
    wrapper = shallowMount(TTable, {
      store
    });

    wrapper.find(".category").trigger("click");
    wrapper.vm.filterCategory = "OtherI";
    wrapper.vm.filteredByDC.forEach(item => {
      assert.equal(item.category, 0);
    });
  });

  it("Filters by a nonexistent category", () => {
    wrapper = shallowMount(TTable, {
      store
    });
    wrapper.find(".category").trigger("click");
    wrapper.vm.filterCategory = "Random Category";
    assert.equal(wrapper.vm.filteredByDC.length, 0);
  });

  it("Sorts the transactions by date in both ways", () => {
    wrapper = shallowMount(TTable, {
      store
    });
    const verify = function(list, way) {
      let s = true;
      let a = 0;
      let b = 0;
      for (let i = 1; i < list.length; i++) {
        // eslint-disable-next-line prettier/prettier
        a = list[i - 1].date.year * 100 + list[i - 1].date.month * 10 + list[i - 1].date.date;
        // eslint-disable-next-line prettier/prettier
        b = list[i].date.year * 100 + list[i].date.month * 10 + list[i].date.date;
        if (way) {
          s = s && a >= b;
        } else {
          s = s && a <= b;
        }
      }
      return s;
    };

    wrapper.vm.$store.state.CURRENT_USER = 0;
    wrapper.find(".sort").trigger("click");
    expect(verify(wrapper.vm.filteredByDC, true)).true;
    wrapper.find(".direction").trigger("click");
    expect(verify(wrapper.vm.filteredByDC, true)).false;

    expect(verify(wrapper.vm.filteredByDC, false)).true;
    wrapper.find(".direction").trigger("click");
    expect(verify(wrapper.vm.filteredByDC, false)).false;
  });

  it("Paging (grouping)", () => {
    wrapper = shallowMount(TTable, {
      store
    });

    wrapper.vm.$store.state.CURRENT_USER = 0;
    wrapper.find(".select").setValue("5");
    assert.equal(wrapper.vm.groupBy, 5);
    assert.equal(wrapper.vm.filteredPaging.length, 5);

    wrapper.find(".select").setValue("10");
    assert.equal(wrapper.vm.groupBy, 10);
    assert.equal(wrapper.vm.filteredPaging.length, 10);

    wrapper.find(".select").setValue("15");
    assert.equal(wrapper.vm.groupBy, 15);
    assert.equal(wrapper.vm.filteredPaging.length, 15);

    wrapper.find(".select").setValue("20");
    assert.equal(wrapper.vm.groupBy, 20);
    assert.equal(wrapper.vm.filteredPaging.length, 20);
  });

  it("Paging (navigating)", () => {
    wrapper = shallowMount(TTable, {
      store
    });

    wrapper.vm.$store.state.CURRENT_USER = 0;
    assert.equal(wrapper.vm.group, 1);
    assert.equal(wrapper.vm.filteredPaging[0], wrapper.vm.filteredByDC[0]);
    assert.equal(wrapper.vm.filteredPaging[4], wrapper.vm.filteredByDC[4]);

    wrapper.find(".goleft").trigger("click");
    assert.equal(wrapper.vm.group, 1);
    assert.equal(wrapper.vm.filteredPaging[0], wrapper.vm.filteredByDC[0]);
    assert.equal(wrapper.vm.filteredPaging[4], wrapper.vm.filteredByDC[4]);

    wrapper.find(".goright").trigger("click");
    assert.equal(wrapper.vm.group, 2);
    assert.equal(wrapper.vm.filteredPaging[0], wrapper.vm.filteredByDC[5]);
    assert.equal(wrapper.vm.filteredPaging[4], wrapper.vm.filteredByDC[9]);

    wrapper.find(".goright").trigger("click");
    assert.equal(wrapper.vm.group, 3);
    assert.equal(wrapper.vm.filteredPaging[0], wrapper.vm.filteredByDC[10]);
    assert.equal(wrapper.vm.filteredPaging[4], wrapper.vm.filteredByDC[14]);

    wrapper.find(".goright").trigger("click");
    assert.equal(wrapper.vm.group, 4);
    assert.equal(wrapper.vm.filteredPaging[0], wrapper.vm.filteredByDC[15]);
    assert.equal(wrapper.vm.filteredPaging[4], wrapper.vm.filteredByDC[19]);

    wrapper.find(".start").trigger("click");
    assert.equal(wrapper.vm.group, 1);
    assert.equal(wrapper.vm.filteredPaging[0], wrapper.vm.filteredByDC[0]);
    assert.equal(wrapper.vm.filteredPaging[4], wrapper.vm.filteredByDC[4]);

    wrapper.find(".end").trigger("click");
    let last = Math.ceil(wrapper.vm.filteredByDC.length / wrapper.vm.groupBy);
    assert.equal(wrapper.vm.group, last);
  });

  it("Balanche shown and properly calculated", () => {
    wrapper = shallowMount(TTable, {
      store
    });

    wrapper.vm.$store.state.CURRENT_USER = 0;
    let total = 0;
    wrapper.vm.filteredByDC.forEach(t => (total += t.amount));
    assert.equal(wrapper.vm.total, total);
  });

  it("Shows only user's transactions exept for SUDO", () => {
    wrapper = shallowMount(TTable, {
      store
    });

    let prove = function(list, i) {
      if (i === list.length) {
        return true;
      } else {
        return list[i - 1].user === list[i].user && prove(list, i + 1);
      }
    };

    wrapper.vm.$store.state.CURRENT_USER = 2;
    expect(prove(wrapper.vm.filteredByDC, 1)).true;

    wrapper.vm.$store.state.CURRENT_USER = 0;
    expect(prove(wrapper.vm.filteredByDC, 1)).false;
  });
});
