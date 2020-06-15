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
        <div class="field half first">
          <label for="name">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Name"
            v-model="name"
          />
          <label class="alarmName" v-if="name == ''"
            >*Obligatory information</label
          >
        </div>
        <div class="field half">
          <label for="categories">Category</label>
          <select v-model="category" id="categories">
            <option
              :key="cate.id"
              v-for="cate in categoryFilter()"
              class="optionsCategory"
            >
              {{ cate.name }}
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
          ></textarea>
          <label class="alarmAmount" v-if="amount == ''"
            >*Obligatory information</label
          >
        </div>
        <div class="fieldDate">
          <label for="date">Date</label>
          <input type="date" id="date" name="date" v-model="date" />
          <label class="alarmdate" v-if="date == ''"
            >*Obligatory information</label
          >
        </div>
        <ul class="actions">
          <li>
            <router-link to="/ModifyDeleteItem" tag="button" class="button mod"
              >Modify/Delete existing Item</router-link
            >
          </li>
          <li>
            <button @click="registerItem" class="button save">Save</button>
          </li>
        </ul>
        <div class="container-table">
          <TransactionTable msg="This is the transaction's table" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TransactionTable from "@/components/TransactionTable.vue";
export default {
  name: "RegisterIncomeExpenseView",
  components: {
    TransactionTable
  },
  data() {
    return {
      types: ["expense", "income"],
      name: "",
      category: "",
      amount: 0,
      type: "",
      date: {}
    };
  },
  computed: {
    ...mapGetters([
      "getItemList",
      "getUser",
      "getLastItemId",
      "getCategoryList"
    ]),
    items() {
      return this.getItemList;
    },
    user() {
      return this.getUser;
    },
    lastId() {
      return this.getLastItemId;
    },
    categories() {
      return this.getCategoryList;
    }
  },
  methods: {
    ...mapActions(["addItem"]),
    registerItem() {
      if (
        this.name == "" ||
        this.category == "" ||
        this.amount == 0 ||
        this.type == "" ||
        this.date == {}
      ) {
        alert("The spaces can not be empty");
      } else {
        if (this.type == "expense") {
          this.amount = this.amount * -1;
        }
        this.findCategoryId(this.category);
        this.addItem({
          name: this.name,
          category: this.category,
          amount: this.amount,
          type: this.type,
          user: this.user,
          id: this.lastId + 1,
          date: this.date.split("-")
        });
      }
    },
    findCategoryId() {
      var index = this.categories.findIndex(c => c.name == this.category);
      this.category = this.categories[index].id;
    },
    categoryFilter() {
      if (this.type === "income") {
        return this.categories.filter(ca => ca.type);
      } else {
        return this.categories.filter(ca => !ca.type);
      }
    }
  }
};
</script>

<style src="./Register.css" scoped></style>
