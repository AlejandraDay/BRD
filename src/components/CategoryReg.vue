<template>
  <div class="RegCateg">
    <br />
    <h1 id="categoryRegister-title" class="centeredText">
      Register a Category
    </h1>
    <div class="moduleCentered">
      <label for="text">Name:</label>
      <label class="alarm" v-if="name === ''" id="alarmInput"
        >*Obligatory field</label
      >
      <br />
      <input
        v-model="name"
        type="text"
        placeholder="Category Name"
        class="addInput"
      />
      <button v-on:click="newCategory()" class="button">Add</button>
      <br />
      <div class="moduleCentered">
        <label for="text">Create as:</label>
        <label> <input type="checkbox" v-model="incomeBox" />Incomes </label>
        <label> <input type="checkbox" v-model="expenseBox" />Expenses </label>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CategoryRegister",
  props: {
    msg: String
  },
  data() {
    return {
      name: "",
      incomeBox: true,
      expenseBox: true
    };
  },
  methods: {
    ...mapActions(["addCategory"]),
    newCategory() {
      if (this.name === null || this.name === "") {
        alert("Name field can't be empty");
      } else if (!(this.incomeBox || this.expenseBox)) {
        alert("Unchecked type, atleast one must be selected");
      } else {
        if (this.incomeBox) {
          console.log(
            "User: " +
              this.currentUserId +
              " Adding new Income Category " +
              this.name
          );
          const id = this.lastId() + 1;
          this.addCategory({
            id: id, //autogen id
            name: this.name,
            user: this.currentUserId,
            type: true
          });
        }
        if (this.expenseBox) {
          const id = this.lastId() + 1;
          console.log(
            "User: " +
              this.currentUserId +
              " Adding new Expense Category " +
              this.name
          );
          this.addCategory({
            id: id, //autogen id
            name: this.name,
            user: this.currentUserId,
            type: false
          });
        }
        this.name = "";
      }
    },
    lastId() {
      return Math.max.apply(
        Math,
        this.categories.map(item => item.id)
      );
    }
  },
  computed: {
    ...mapGetters(["getCategoryList", "idAccount"]),
    categories() {
      return this.getCategoryList;
    },
    currentUserId() {
      return this.idAccount;
    }
  }
};
</script>

<style scoped>
.alarm {
  color: red;
  font-size: 12px;
}
.button {
  padding: 10px 20px;
  width: 20%;
  margin: 8px 1%;
  border: 2px solid #555;
  box-sizing: border-box;
  border-radius: 4px;
}

.addInput {
  width: 70%;
  padding: 10px 20px;
  margin: 8px 2%;
  border: 2px solid #555;
  box-sizing: border-box;
  border-radius: 4px;
}

.centeredText {
  margin: auto;
  padding: 20px;
  text-align: center;
}

.moduleCentered {
  width: 80%;
  margin: auto;
}
</style>
