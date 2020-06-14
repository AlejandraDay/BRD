<template>
  <div class="RegCateg">
    <br />
    <h1>{{ msg }}</h1>
    <div class="Data">
      <label for="text">Name:</label>
      <label class="alarm" v-if="name == ''">*Obligatory field</label>
      <br />
      <input
        v-model="name"
        type="text"
        placeholder="Category Name"
        class="addInput"
      />
      <button v-on:click="newCategory()" class="button">Add</button>
      <br />
      <label for="text">Create as:</label>
      <label> <input type="checkbox" v-model="incomeBox" />Incomes </label>
      <label> <input type="checkbox" v-model="expenseBox" />Expenses </label>
    </div>
    <!--div id="saveData">
      <button @click="registerCateg" class="savebtn">Save</button>
    </div-->
  </div>
</template>
<script>
export default {
  name: "CategoryRegister",
  props: {
    msg: String
  },
  data() {
    return {
      name: "",
      incomeBox: true,
      expenseBox: true,
      currentUser: 0
    };
  },
  methods: {
    newCategory() {
      if (this.name == null || this.name == "") {
        alert("Name field can't be empty");
      } else if (!(this.incomeBox || this.expenseBox)) {
        alert("Unchecked type, atleast one must be selected");
      } else {
        const id = this.lastId() + 1;
        if (this.incomeBox) {
          console.log("Adding new Income Category " + this.name);
          this.$store.commit("addCategory", {
            id: "I" + id, //autogen id
            name: this.name,
            user: this.currentUser
          });
        }
        if (this.expenseBox) {
          console.log("Adding new Expense Category " + this.name);
          this.$store.commit("addCategory", {
            id: "E" + id, //autogen id
            name: this.name,
            user: this.currentUser
          });
        }
        this.name = "";
      }
    },
    lastId() {
      return Math.max.apply(
        Math,
        this.categories.map(item => String(item.id).substr(1))
      );
    }
  },
  computed: {
    categories() {
      return this.$store.state.CATEGORIES;
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
  width: 10%;
  margin: 8px 2px;
  border: 2px solid #555;
  box-sizing: border-box;
  border-radius: 4px;
}

.addInput {
  width: 40%;
  padding: 10px 20px;
  margin: 8px 2px;
  border: 2px solid #555;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
