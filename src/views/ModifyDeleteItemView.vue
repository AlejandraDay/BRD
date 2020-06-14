<template>
  <div class="SelectOperation">
    <footer id="footer">
      <li>
        <router-link to="/home" tag="button" class="buttonback">­←</router-link>
      </li>
      <div class="inner">
        <label>Select an Item:</label>
        <select v-model="selectedItem" name="types" id="types">
          <option :key="ty.name" v-for="ty in items" class="optionsName">
            {{ ty.name }}
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
            <label class="alarmName" v-if="name == ''"
              >*Obligatory information</label
            >
          </div>
          <div class="field half">
            <label for="categories">Category</label>
            <select v-model="category" id="categories">
              <option
                :key="cate"
                v-for="cate in categories"
                class="optionsCategory"
              >
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
            <label class="alarmAmount" v-if="amount == ''"
              >*Obligatory information</label
            >
          </div>
          <ul class="actions">
            <li>
              <button @click="ModifyItem" class="button save">Save</button>
              <button @click="deleteItem" class="button delete">Delete</button>
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
  name: "ModifyDeleteItemView",
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
    ...mapActions(["updateItem", "deleteItem"]),
    ModifyItem() {
      if (
        this.name == "" ||
        this.category == "" ||
        this.amount == "" ||
        this.type == ""
      ) {
        alert("The spaces can't be empty");
      } else {
        this.updateItem({
          name: this.name,
          category: this.category,
          amount: this.amount,
          type: this.type,
          user: this.selectedItem.user,
          id: this.selectedItem.id
        });
      }
    },
    deleteItem() {
      if (
        this.name == "" ||
        this.category == "" ||
        this.amount == "" ||
        this.type == ""
      ) {
        alert("The spaces can't be empty");
      } else {
        this.deleteItem(this.selectedItem);
      }
    }
  }
};
</script>
<style src="./Register.css" scoped></style>
