<template>
  <div class="SelectOperation">
    <br />
    <label>Update Account </label>
    <div class="Data">
      <label for="text">Name:</label>
      <input v-model="name" type="text" />
      <br />
      <br />
      <label for="text">CI:</label>
      <input v-model="ci" type="text" />
      <br />
      <br />
      <label for="text">Email:</label>
      <input v-model="email" type="text" />
      <br />
      <br />
      <label for="text">Phone:</label>
      <input v-model="phone" type="text" />
      <br />
      <br />
      <label for="text">Password:</label>
      <input v-model="pwd" type="text" />
      <button @click="pwd">Pwd</button>
      <br />
      <br />
      <label for="text">Confirm Password:</label>
      <input v-model="confirmPwd" type="text" />
      <br />
      <br />
    </div>
    <div>
      <button @click="registerItem" class="button save">Save</button>
    </div>
    <table>
      <thead>
        <tr>
          <th :key="column" v-for="column in columns">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.name" v-for="item in items">
          <td>{{ item.name }}</td>
          <td>{{ item.ci }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.pwd }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
