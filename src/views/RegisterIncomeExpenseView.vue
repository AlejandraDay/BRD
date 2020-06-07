<template>
  <div class="SelectOperation">
    <label>Select an Operation:</label>
    <select v-model="type" name="types" id="types">
      <option :key="ty" v-for="ty in types">
        {{ ty }}
      </option>
    </select>
    <label>Data:</label>
    <div class="Data">
      <label for="text">Name:</label>
      <input v-model="name" type="text" id="OperationName" />
      <label for="categories">Category:</label>
      <select v-model="category" name="categories" id="categories">
        <option :key="cate" v-for="cate in categories">
          {{ cate }}
        </option>
      </select>
      <label for="text">Amount:</label>
      <input v-model="amount" type="text" id="Amount" />
    </div>
    <div>
      <button class="button modify">Modify existing item</button>
      <button @click="registerItem" class="button save">Save</button>
    </div>
    <table>
      <thead>
        <tr>
          <th :key="column" v-for="column in columns">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.name" v-for="item in items">
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.type }}</td>
        </tr>
      </tbody>
    </table>
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
      type: ""
    };
  },
  computed: {
    ...mapGetters(["getItemList"]),
    // getList,
    items() {
      return this.getItemList;
    }
  },
  methods: {
    ...mapActions(["addItem"]),
    registerItem() {
      this.addItem({
        name: this.name,
        category: this.category,
        amount: this.amount,
        type: this.type
      });
    }
    //<style src="./Register.css" scoped></style>
  }
};
</script>
