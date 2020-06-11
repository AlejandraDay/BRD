<template>
  <div class="SelectOperation">
    <footer id="footer">
      <div class="inner">
        <label>Select an Item:</label>
        <select
          v-model="selectedItem"
          name="types"
          id="types"
          class="text option"
        >
          <option :key="ty.name" v-for="ty in items">
            {{ ty.name }}
          </option>
        </select>
        <h3>Information:</h3>

        <form action="#" method="post">
          <div class="field half first">
            <label for="name">Name</label>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Name"
              v-model="name"
            />
          </div>
          <div class="field half">
            <label for="categories">Category</label>
            <select v-model="category" id="categories" class="text option">
              <option :key="cate" v-for="cate in categories">
                {{ cate }}
              </option>
            </select>
          </div>
          <div class="field">
            <label for="amount">Amount</label>
            <textarea
              v-model="amount"
              name="amount"
              id="amount"
              rows="6"
              placeholder="Amount"
            ></textarea>
          </div>
          <ul class="actions">
            <li>
              <button @click="registerItem" class="button save">Save</button>
            </li>
          </ul>
        </form>
        <div class="container-table">
          <div class="wrap-table">
            <table class="table">
              <thead>
                <tr class="row head">
                  <th class="column" :key="column" v-for="column in columns">
                    {{ column }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="row body" :key="item.name" v-for="item in items">
                  <td class="column">{{ item.name }}</td>
                  <td class="column">{{ item.category }}</td>
                  <td class="column">{{ item.amount }}</td>
                  <td class="column">{{ item.type }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RegisterIncomeExpenseView",
  components: {},
  data() {
    return {
      categories: ["transfer", "other"],
      types: ["expense", "income"],
      columns: ["Name", "Category", "Amount", "Type"],
      name: "",
      category: "",
      amount: "",
      selectedItem: {}
    };
  },
  computed: {
    ...mapGetters(["getItemList"]),
    items() {
      return this.getItemList;
    }
  },
  methods: {
    ...mapActions(["addItem"]),
    registerItem() {
      if (
        this.name == "" ||
        this.category == "" ||
        this.amount == "" ||
        this.type == ""
      ) {
        alert("The spaces can't be empty");
      } else {
        this.addItem({
          name: this.name,
          category: this.category,
          amount: this.amount,
          type: this.type
        });
      }
    }
  }
};
</script>
<style src="./Register.css" scoped></style>
