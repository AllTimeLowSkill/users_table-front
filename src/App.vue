<template>
  <div id="app">
    <template v-if="users.length === 0">
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </template>
    <template v-else>
      <template v-if="!isCreate">
        <button class="btn btn-success size-btn" @click="switchCreate">Показать форму добавления пользователя</button>
      </template>
      <template v-else>
        <button class="btn btn-danger size-btn" @click="switchCreate" type="submit">Скрыть форму добавления пользователя</button>
        <form @submit.prevent="addUser({ id, firstName, lastName, email, phone })">
          <div>
            <label class="form-label" for=""><b>ID</b></label>
            <input class="form-control" v-model="id" type="text">
          </div>
          <div>
            <label class="form-label" for=""><b>First name</b></label>
            <input class="form-control" v-model="firstName" type="text">
          </div>
          <div>
            <label class="form-label" for=""><b>Last name</b></label>
            <input class="form-control" v-model="lastName" type="text">
          </div>
          <div>
            <label class="form-label" for=""><b>Email</b></label>
            <input class="form-control" v-model="email" type="text">
          </div>
          <div>
            <label class="form-label" for=""><b>Phone</b></label>
            <input class="form-control" v-model="phone" type="text">
          </div>
          <button class="btn btn-success size-btn" type="submit">Добавить пользователя</button> 
        </form>
      </template>
        <table class="table table-hover">
          <thead>
            <th scope="col">ID</th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </thead>
          <tbody>
            <tr @click="fetchUser(user._id)" v-for="(user, idx) in displayPage" :key="idx">
              <th scope="row">{{ idx + 1 }}</th>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
            </tr>
          </tbody>  
        </table>
         <div class="clearfix btn-group col-md-2 offset-md-5">
             <button type="button" class="btn btn-sm btn-outline-secondary" v-if="page != 1" @click="page--"> - </button>
             <button type="button" class="btn btn-sm btn-outline-secondary" v-for="(pageNumber, idx) in pages.slice(page-1, page+5)" :key="idx" @click="page = pageNumber"> {{pageNumber}} </button>
             <button type="button" @click="page++" v-if="page < pages.length" class="btn btn-sm btn-outline-secondary"> + </button>
           </div>
      <template v-if="user._id">
        <div class="card">
          <div class="card-body">
            <label for="">Fullname: </label>
            <span> {{ user.firstName }} {{ user.lastName }} </span>
          </div>
          <div class="card-body">
            <label for="">Description: </label>
            <span> {{ user.description }} </span>
          </div>
          <div class="card-body">
            <label for="">Street: </label>
            <span> {{ user.address.streetAddress }} </span>
          </div>
          <div class="card-body">
            <label for="">City: </label>
            <span> {{ user.address.city }} </span>
          </div>
          <div class="card-body">
            <label for="">State: </label>
            <span>{{ user.address.state }}</span>
          </div>
          <div class="card-body">
            <label for="">Zip: </label>
            <span>{{ user.address.zip }}</span>
          </div>
        </div>
      </template>
    </template>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import paginatorMixin from './mixins/table_paginate'

export default {
  name: 'App',
  mixins: [paginatorMixin],
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
    }),

    displayPage(){
      return this.paginate(this.users)
    }
  },
  mounted(){
    this.fetchUsers()
    this.setPages()
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
      this.isCreate = !this.isCreate
    }
  }
}
</script>

<style lang="scss">
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .size-btn {
    width: 100%;
  }


</style>
