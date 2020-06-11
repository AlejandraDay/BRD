<template>
  <div class="register">
    <footer id="footer">
      <li>
        <router-link to="/home" tag="button" class="buttonback">­←</router-link>
      </li>
      <div class="inner">
        <label>Select an Operation:</label>
        <select v-model="type" id="types" class="text option">
          <option :key="ty" v-for="ty in types">
            {{ ty }}
          </option>
        </select>
        <h3>Information:</h3>

        <form>
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
              placeholder="Bs."
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
    ...mapGetters(["getItemList", "getUser", "getLastItemId"]),
    items() {
      return this.getItemList;
    },
    user() {
      return this.getUser;
    },
    lastId() {
      return this.getLastItemId;
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
        alert("The spaces can not be empty");
      } else {
        this.addItem({
          name: this.name,
          category: this.category,
          amount: this.amount,
          type: this.type,
          user: this.user,
          id: this.lastId + 1
        });
      }
    }
  }
};
</script>

<style src="./Register.css" scoped></style>
