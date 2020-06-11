<template>
  <div>
    <label for="text">Init</label>
    <table>
      <thead>
        <tr>
          <th :key="column" v-for="column in columns">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.ci" v-for="item in items">
          <td>{{ item.name }}</td>
          <td>{{ item.ci }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.pwd }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Account",
  data() {
    return {
      name: "",
      columns: ["Name", "ci", "email", "pwd"]
    };
  },
  computed: {
    ...mapGetters(["getItemList"]),
    // getList,
    items() {
      return this.getItemList;
    }
  }
};
</script>
