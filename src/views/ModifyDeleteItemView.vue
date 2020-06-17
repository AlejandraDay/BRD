<template>
  <div class="SelectOperation">
    <footer id="footer">
      <li>
        <router-link to="/transaction" tag="button" class="buttonback"
          >­←</router-link
        >
      </li>
      <div class="inner">
        <label>Select an Item:</label>
        <select v-model="selectedItem" name="types" id="types">
          <option :key="ty.name" v-for="ty in items" class="optionsName">
            {{ ty.name }}
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
              v-for="cate in categoryFilter"
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
            placeholder="Amount"
          ></textarea>
          <label class="alarmAmount" v-if="amount == ''"
            >*Obligatory information</label
          >
        </div>
        <div class="fieldDate">
          <label for="dateP">Date</label>
          <input type="date" id="dateP" name="dateP" v-model="date" />
          <label class="alarmdate" v-if="date == ''"
            >*Obligatory information</label
          >
        </div>
        <ul class="actions">
          <li>
            <button @click="ModifyItem" class="button save">Save</button>
            <button @click="Delete" class="button delete">Delete</button>
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
  name: "ModifyDeleteItemView",
  components: {
    TransactionTable
  },
  data() {
    return {
      types: ["expense", "income"],
      name: "",
      category: "",
      amount: 0,
      date: {},
      selectedItem: "",
      type: ""
    };
  },
  computed: {
    ...mapGetters([
      "getItemList",
      "getUser",
      "getLastItemId",
      "getCategoryList",
      "getItemTableHeader"
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
    },
    headers() {
      return this.getItemTableHeader;
    }
  },
  methods: {
    ...mapActions(["updateItem", "deleteItem"]),
    ModifyItem() {
      if (
        this.name == "" ||
        this.category == "" ||
        this.amount == 0 ||
        this.type == "" ||
        this.date == {} ||
        this.selectedItem == ""
      ) {
        alert("The spaces can't be empty");
      } else {
        if (this.type == "expense") {
          this.amount = this.amount * -1;
        }
        let aux = this.date.split("-");
        this.findItemtype();
        this.findCategoryId();
        this.findItemId();
        this.updateItem({
          name: this.name,
          category: this.category,
          amount: this.amount,
          type: this.type,
          user: this.user,
          id: this.selectedItem,
          date: { year: aux[0], month: aux[1], date: aux[2] }
        });
      }
    },
    Delete() {
      if (this.selectedItem == "") {
        alert("Select an item to delete");
      } else {
        this.findItemId();
        this.deleteItem(this.selectedItem);
      }
    },
    findCategoryId() {
      var index = this.categories.findIndex(c => c.name == this.category);
      this.category = this.categories[index].id;
    },
    findItemId() {
      var index = this.items.findIndex(c => c.name == this.selectedItem);
      this.selectedItem = this.items[index].id;
    },
    findItemtype() {
      var index = this.items.findIndex(c => c.name == this.selectedItem);
      if (this.items[index].amount > 0) {
        this.type = "income";
      } else {
        this.type = "expense";
      }
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
