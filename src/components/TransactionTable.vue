<template>
  <div class="transactions">
    <h1>{{ msg }}</h1>
    <div class="filterByDateCategoy">
      <label>Filter by: </label>
      <label class="year">
        <input v-model="filterDateBy.year" type="checkbox" />Year
      </label>
      <label class="month">
        <input v-model="filterDateBy.month" type="checkbox" />Month
      </label>
      <label class="date">
        <input v-model="filterDateBy.date" type="checkbox" />Date
      </label>
      <label class="category">
        <input v-model="filterCategoryBy" type="checkbox" />Category
      </label>
      <br />
      <input
        class="dates"
        v-if="filterDateBy.year || filterDateBy.month || filterDateBy.date"
        type="date"
        v-model="filterDate"
      />
      <input
        class="categories"
        v-if="filterCategoryBy"
        v-model="filterCategory"
        placeholder="Category Name"
      />
    </div>
    <table>
      <thead>
        <tr class="header">
          <th :key="column" v-for="column in this.headers">
            {{ column }}
            <button class="sort" v-if="column === 'Date'" v-on:click="sort()">
              {{ sorted ? "Unsort" : "Sort" }}
            </button>
            <button
              class="direction"
              v-if="column === 'Date'"
              v-on:click="giveDirection()"
            >
              {{ direction ? "↑" : "↓" }}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="item.id"
          v-for="(item, index) in filteredPaging"
          :class="[item.amount < 0 ? 'expense' : 'profit']"
        >
          <td>{{ index + lowerLimmit + 1 }}</td>
          <td>{{ getUserName(item.user) }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ getCategoryName(item.category) }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.description }}</td>
          <td>{{ getDate(item.date) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="paging">
      <select class="select" v-model="groupBy">
        <option :key="item" v-for="item in this.groupBy_">{{ item }}</option>
      </select>
      <button class="start" v-on:click="start()">Start</button>
      <button class="goleft" v-on:click="goLeft()">Anterior</button>
      <button class="goright" v-on:click="goRight()">Siguiente</button>
      <button class="end" v-on:click="end()">End</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TransactionTable",
  props: {
    msg: String
  },
  data() {
    return {
      filterDate: "",
      filterDateBy: { year: false, month: false, date: false },
      filterCategory: "",
      filterCategoryBy: false,
      groupBy_: [5, 10, 15, 20],
      groupBy: 5,
      group: 1,
      sorted: false,
      direction: true
    };
  },
  methods: {
    goRight() {
      if (this.group < Math.ceil(this.filteredByDC.length / this.groupBy)) {
        this.group++;
      }
    },
    goLeft() {
      if (this.group > 1) {
        this.group--;
      }
    },
    start() {
      this.group = 1;
    },
    end() {
      this.group = Math.ceil(this.filteredByDC.length / this.groupBy);
    },
    getCategoryName(categoryID) {
      return this.getCategoryList.filter(
        category => category.id === categoryID
      )[0].name;
    },
    getUserName(userCI) {
      return this.accounts.filter(user => user.ci === userCI)[0].name;
    },
    getDate({ year, month, date }) {
      return `${year}-${month}-${date}`;
    },
    sort() {
      this.sorted = !this.sorted;
    },
    giveDirection() {
      this.direction = !this.direction;
    }
  },
  computed: {
    ...mapGetters(["getItemList"]),
    ...mapGetters(["getCategoryList"]),
    ...mapGetters(["getHeaders"]),
    ...mapGetters(["getAccounts"]),
    filteredPaging() {
      return this.filteredByDC.filter(
        (item, index) => index >= this.lowerLimmit && index < this.upperLimmit
      );
    },
    filteredByDC() {
      let aux = this.transactions;
      if (this.filterDate !== "") {
        let aux2 = this.filterDate.split("-");
        if (this.filterDateBy.year) {
          aux = aux.filter(t => t.date.year === parseInt(aux2[0]));
        }
        if (this.filterDateBy.month) {
          aux = aux.filter(t => t.date.month === parseInt(aux2[1]));
        }
        if (this.filterDateBy.date) {
          aux = aux.filter(t => t.date.date === parseInt(aux2[2]));
        }
      }
      if (this.filterCategoryBy) {
        aux = aux.filter(
          t => 0 <= this.getCategoryName(t.category).search(this.filterCategory)
        );
      }
      return aux;
    },
    transactions() {
      if (this.sorted) {
        if (this.direction) {
          return this.getItemList.slice().sort(function(a, b) {
            // eslint-disable-next-line prettier/prettier
            return (b.date.year * 100 + b.date.month * 10 + b.date.date) - (a.date.year * 100 + a.date.month * 10 + a.date.date)});
        }
        return this.getItemList.slice().sort(function(a, b) {
          // eslint-disable-next-line prettier/prettier
          return (a.date.year * 100 + a.date.month * 10 + a.date.date) - (b.date.year * 100 + b.date.month * 10 + b.date.date)});
      }
      return this.getItemList;
    },
    headers() {
      return this.getHeaders[0];
    },
    upperLimmit() {
      return this.groupBy * this.group;
    },
    lowerLimmit() {
      return this.upperLimmit - this.groupBy;
    },
    accounts() {
      return this.getAccounts;
    }
  }
};
</script>

<style scoped>
.sort {
  margin: auto;
}
.paging {
  margin: auto;
  width: 75%;
  right: 1;
}
.transactions {
  margin: auto;
  width: 75%;
}
table,
th,
td {
  border: 2px solid black;
  font-size: 18px;
}

table {
  border-color: black;
  padding: 10px;
  width: 100%;
}

td {
  color: black;
}

.header {
  background-color: rgb(0, 89, 255);
  color: white;
}

.expense {
  background-color: rgb(228, 50, 43);
}

.profit {
  background-color: rgb(84, 221, 84);
}
</style>
