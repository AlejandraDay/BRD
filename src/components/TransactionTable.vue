<template>
  <div class="table">
    <h1>{{ msg }}</h1>
    <table>
      <thead>
        <tr>
          <th :key="column" v-for="column in this.headers">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="(item, index) in filtered">
          <td>{{ index + lowerLimmit }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.description }}</td>
        </tr>
      </tbody>
    </table>
    <div>
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
      group: 1
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
    }
  },
  computed: {
    filtered() {
      return this.transactions.filter(
        (item, index) => index >= this.lowerLimmit && index < this.upperLimmit
      );
    },
    transactions() {
      return this.$store.state.TRANSACTIONS;
    },
    headers() {
      return this.$store.state.HEADERS[0];
    },
    upperLimmit() {
      return this.groupBy * this.group;
    },
    lowerLimmit() {
      return this.upperLimmit - this.groupBy;
    }
  }
};
</script>

<style scoped>
.table {
  font-size: 18px;
  color: brown;
}

table,
th,
td {
  border: 1px solid black;
}

table {
  margin: auto;
  width: 50%;
  padding: 10px;
}

td {
  color: black;
}
</style>
