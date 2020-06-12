<template>
  <div class="RegCateg">
    <br />
    <h1>{{ msg }}</h1>
    <div class="Data">
      <label for="text">Name:</label>
      <label class="alarm" v-if="name == ''">*Obligatory field</label>
      <br />
      <input v-model="name" type="text" placeholder="Category Name" />
      <button v-on:click="newCategory()" class="button">Add</button>

      <br />
      <br />
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
      currentUser: 0
    };
  },
  methods: {
    newCategory() {
      if (this.name == null || this.name == "") {
        alert("Name field can't be empty");
      } else {
        console.log("Adding new Category " + this.name);
        const id = this.lastId() + 1;
        this.$store.commit("addCategory", {
          id: "I" + id, //autogen id
          name: this.name,
          user: this.currentUser
        });
        this.$store.commit("addCategory", {
          id: "E" + id, //autogen id
          name: this.name,
          user: this.currentUser
        });
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
input {
  width: 50%;
  padding: 10px 20px;
  margin: 8px 0;
  border: 2px solid #555;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
