<template>
  <div id="app">
    <template v-if="users.length === 0">
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </template>
    <template v-else>
      <template v-if="!isCreate">
      <button @click="switchCreate">Показать форму добавления пользователя</button>
    </template>
    <template v-else>
      <button @click="switchCreate" type="submit">Скрыть форму добавления пользователя</button>
      <form @submit.prevent="addUser({ id, firstName, lastName, email, phone })">
        <div>
          <label for="">ID</label>
          <input v-model="id" type="text">
        </div>
        <div>
          <label for="">First name</label>
          <input v-model="firstName" type="text">
        </div>
        <div>
          <label for="">Last name</label>
          <input v-model="lastName" type="text">
        </div>
        <div>
          <label for="">Email</label>
          <input v-model="email" type="text">
        </div>
        <div>
          <label for="">Phone</label>
          <input v-model="phone" type="text">
        </div>
        <button type="submit">Добавить пользователя</button> 
      </form>
    </template>
      <ul class="list-group">
        <li class="list-group-item">
          <div class="list">
            <span>id</span>
            <span>Firstname</span>
            <span>Lastname</span>
            <span>Email</span>
            <span>Phone</span>
          </div>
        </li>
        <li class="list-group-item" @click="fetchUser(user._id)" v-for="(user, idx) in users" :key="idx">
          <div class="list">
            <span>{{ idx + 1 }}</span>
            <span>{{ user.firstName }}</span>
            <span>{{ user.lastName }}</span>
            <span>{{ user.email }}</span>
            <span>{{ user.phone }}</span>
          </div>
        </li>
      </ul>
      <template v-if="user._id">
        <form>
          <div>
            <label for="">Fullname: </label>
            <span> {{ user.firstName }} {{ user.lastName }} </span>
          </div>
          <div>
            <label for="">Description: </label>
            <span> {{ user.description }} </span>
          </div>
          <div>
            <label for="">Street: </label>
            <span> {{ user.address.streetAddress }} </span>
          </div>
          <div>
            <label for="">City: </label>
            <span> {{ user.address.city }} </span>
          </div>
          <div>
            <label for="">State: </label>
            <span>{{ user.address.state }}</span>
          </div>
          <div>
            <label for="">Zip: </label>
            <span>{{ user.address.zip }}</span>
          </div>
        </form>
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  data(){
    return {
      isCreate: false,
      id: null,
      firstName: null,
      lastName: null,
      phone: null,
      email: null
    }
  },
  computed: {
    ...mapGetters({
      users: 'users',
      user: 'user'
    })
  },
  mounted(){
    this.fetchUsers()
  },
  methods: {
    ...mapActions({
      fetchUsers: 'fetchUsers',
      fetchUser: 'fetchUser',
      fetchCreateUser: 'fetchCreateUser'
    }),

    switchCreate(){
      this.isCreate = !this.isCreate
    },

    addUser(data){
      this.fetchCreateUser(data)
      this.fetchUsers()
    }
  }
}
</script>

<style lang="scss">
  .list {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .loader{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vh;
    height: 100vh;
  }
</style>
