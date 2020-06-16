<template>
  <div class="table">
    <h1 id="categoryTable-title" class="centeredText">Categories Table</h1>
    <div class="moduleCentered">
      <select v-model="filter" id="selectableFilter" class="selectableFilter">
        <option>All</option>
        <option>Incomes</option>
        <option>Expenses</option>
      </select>
      <input v-model="searchName" placeholder="Search by name" />
    </div>
    <br />
    <br />

    <table>
      <thead>
        <tr class="header">
          <th :key="column" v-for="column in this.headers">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="item.id"
          v-for="(item, index) in filteredGroups"
          class="content"
        >
          <td class="index">{{ index + lowerLimmit }}</td>
          <td class="id">{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.user }}</td>
          <td v-if="item.type">Income</td>
          <td v-else>Expense</td>
          <td
            class="categbtn"
            v-if="item.user === currentUserId || currentUserId === 0"
          >
            <!--If the current user created this category or its admin, can edit it-->
            <button class="editButton" @click="editCat(item)">EDIT</button>
          </td>
          <td
            class="categbtn"
            v-if="item.user === currentUserId || currentUserId === 0"
          >
            <!--If the current user created this category or its admin, can delete it-->
            <button class="deleteButton" @click="deleteCat(item)">
              DELETE
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="moduleCentered">
      <br />
      <label>Items per Page:</label>
      <select v-model="groupBy">
        <option :key="item" v-for="item in this.groupBy_">{{ item }}</option>
      </select>
      <br />
      <br />
      <div class="moduleCentered">
        <button v-on:click="first()" class="pagingButton">First</button>
        <button v-on:click="previous()" class="pagingButton">Previous</button>
        <button v-on:click="next()" class="pagingButton">Next</button>
        <button v-on:click="last()" class="pagingButton">Last</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CategoryTable",
  props: {
    msg: String
  },
  data() {
    return {
      filter: "All",
      searchName: "",
      groupBy_: [5, 10, 15],
      groupBy: 5,
      group: 1
    };
  },
  methods: {
    ...mapActions(["deleteCategory", "updateCategory"]),
    next() {
      if (this.group < Math.ceil(this.filtered.length / this.groupBy)) {
        this.group++;
      }
    },
    previous() {
      if (this.group > 1) {
        this.group--;
      }
    },
    first() {
      this.group = 1;
    },
    last() {
      this.group = Math.ceil(this.filtered.length / this.groupBy);
    },
    redirectRegister() {
      this.$router.push("register-categories");
    },
    checkForTransactions(categ) {
      var hasTransactions = false;
      const transactionList = this.transactionList;
      transactionList.forEach(item => {
        if (item.category == categ.id) {
          console.log("Found in transaction " + item.id);
          hasTransactions = true;
        }
      });

      return hasTransactions;
    },
    deleteCat(categ) {
      var hasTransactions = this.checkForTransactions(categ);
      if (hasTransactions) {
        alert("Unable to Delete, transactions still using this category");
        //to do function when exists incomes or expenses available with this category
      } else {
        if (confirm("Are you sure you want to delete " + categ.name + "?")) {
          console.log("Deleting " + categ.name + " | " + categ.id);
          this.deleteCategory(categ);
          //  this.$store.commit("deleteCategory", categ);
        }
      }
    },
    editCat(categ) {
      var updatedName = prompt("Insert the updated name:", "");
      if (updatedName === null || updatedName === "") {
        console.log("Tried to change for empty name, cancelling");
      } else {
        if (
          confirm(
            "Are you sure you want to change " +
              categ.name +
              " with " +
              updatedName +
              "?"
          )
        ) {
          console.log("Updating " + categ.id);
          categ.name = updatedName;
          this.updateCategory(categ);
          //this.$store.commit("editCategory", categ);
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      "getCategoryList",
      "getCategoryTableHeader",
      "getItemList",
      "idAccount"
    ]),
    filtered() {
      const self = this;
      const categoryList =
        this.filter === "All"
          ? this.categories
          : this.categories.filter(function(item) {
              if (
                (self.filter === "Incomes" && item.type) ||
                (self.filter === "Expenses" && !item.type)
              ) {
                return true;
              }
              return false;
            });
      return this.searchName === ""
        ? categoryList
        : categoryList.filter(item => item.name.includes(this.searchName));
    },
    categories() {
      //return this.$store.state.CATEGORIES;
      return this.getCategoryList.filter(
        category => category.user === this.currentUserId || category.user === 0
      );
    },
    headers() {
      return this.getCategoryTableHeader;
      // return this.$store.state.HEADERCATEG[0];
    },
    transactionList() {
      return this.getItemList;
    },
    upperLimmit() {
      return this.groupBy * this.group;
    },
    lowerLimmit() {
      return this.upperLimmit - this.groupBy;
    },
    filteredGroups() {
      return this.filtered.filter(
        (item, index) => index < this.upperLimmit && index >= this.lowerLimmit
      );
    },
    currentUserId() {
      return this.idAccount;
    }
  }
};
</script>

<style scoped>
.selectableFilter {
  width: 20%;
  padding: 9px 9px;
  margin: 5px 3%;
  border: 2px solid #555;
  box-sizing: border-box;
  border-radius: 4px;
}
input {
  width: 70%;
  padding: 10px 10px;
  margin: 5px 2%;
  border: 2px solid #555;
  box-sizing: border-box;
  border-radius: 4px;
}
.centeredText {
  margin: auto;
  padding: 20px;
  text-align: center;
}
.index,
.id {
  width: 10%;
}
.categbtn {
  width: 5%;
}
.addbutton {
  width: 10%;
  padding: 10px 20px;
  margin: 8px 2px;
  border: 2px solid #555;
  box-sizing: border-box;
  border-radius: 4px;
}
.deleteButton,
.editButton {
  border-style: solid;

  margin: 1px 1px;
  padding: 2px 9px;
  width: 100%;
  height: 100%;
}
.pagingButton {
  border-style: solid;
  border: 2px solid #555;
  margin: 4px 2%;
  padding: 2px 9px;
  width: 20%;
}
.tabla {
  font-size: 18px;
  color: brown;
}
.moduleCentered {
  width: 80%;
  margin: auto;
}
table,
th,
td {
  border: 1px solid black;
}
table {
  margin: auto;
  width: 80%;
  padding: 10px;
}
.header {
  background-color: rgb(0, 89, 255);
  color: white;
  text-align: center;
}

.content {
  background-color: rgb(170, 220, 240);
  text-align: center;
}
</style>
