<template>
  <div class="transactions">
    <h1>{{ msg }}</h1>
    <table>
      <thead>
        <tr class="header">
          <th :key="column" v-for="column in this.headers">
            {{ column }}
            <button
              class="sort"
              v-if="column === 'Date' && !sorted"
              v-on:click="sort()"
            >
              Sort
            </button>
            <button
              class="sort"
              v-else-if="column === 'Date' && sorted"
              v-on:click="sort()"
            >
              Unsort
            </button>
            <button
              class="direction"
              v-if="column === 'Date' && sorted && direction"
              v-on:click="giveDirection()"
            >
              ↑
            </button>
            <button
              class="direction"
              v-else-if="column === 'Date' && sorted && !direction"
              v-on:click="giveDirection()"
            >
              ↓
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
      <select v-model="groupBy">
        <option :key="item" v-for="item in this.groupBy_">{{ item }}</option>
      </select>
      <button v-on:click="start()">Start</button>
      <button v-on:click="goLeft()">Anterior</button>
      <button v-on:click="goRight()">Siguiente</button>
      <button v-on:click="end()">End</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
/*
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
 */
export default {
  name: "TransactionTable",
  props: {
    msg: String
  },
  data() {
    return {
      filter: "",
      groupBy_: [5, 10, 15],
      groupBy: 5,
      group: 1,
      sorted: false,
      direction: true
    };
  },
  methods: {
    goRight() {
      if (this.group < Math.ceil(this.transactions.length / this.groupBy)) {
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
      this.group = Math.ceil(this.transactions.length / this.groupBy);
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
      return this.transactions.filter(
        (item, index) => index >= this.lowerLimmit && index < this.upperLimmit
      );
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
