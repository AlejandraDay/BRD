<template>
  <div class="register">
    <footer id="footer">
      <div class="inner">
        <label>Select an Operation:</label>
        <select v-model="type" id="types" class="text option">
          <option :key="ty" v-for="ty in types">
            {{ ty }}
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
              <router-link
                to="/ModifyDeleteItem"
                tag="button"
                class="button mod"
                >Modify/Delete existing Item</router-link
              >
            </li>
            <li>
              <button @click="registerItem" class="button save">Save</button>
            </li>
          </ul>
        </form>
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
