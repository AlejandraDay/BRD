<template>
  <div class="table">
    <h1>{{ msg }}</h1>
    <input v-model="searchName" placeholder="Search" />
    <table>
      <thead>
        <tr>
          <th :key="column" v-for="column in this.headers">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="(item, index) in filteredGroups">
          <td>{{ index + lowerLimmit }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.user }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <select v-model="groupBy">
        <option :key="item" v-for="item in this.groupBy_">{{ item }}</option>
      </select>
      <button v-on:click="start()">Start</button>
      <button v-on:click="previous()">Previous</button>
      <button v-on:click="next()">Next</button>
      <button v-on:click="last()">Last</button>
    </div>
  </div>
</template>

<script>
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
    start() {
      this.group = 1;
    },
    last() {
      this.group = Math.ceil(this.filtered.length / this.groupBy);
    }
  },
  computed: {
    filtered() {
      const categoryList = this.categories;
      //.filter(
      // (item, index) => index >= this.lowerLimmit && index < this.upperLimmit
      //);
      return this.searchName === ""
        ? categoryList
        : categoryList.filter(item => item.name.includes(this.searchName));
    },
    categories() {
      return this.$store.state.CATEGORIES;
    },
    headers() {
      return this.$store.state.HEADERCATEG[0];
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
    }
  }
};
</script>

<style scoped>
.tabla {
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
