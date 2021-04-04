<template>
  <div id="app">
    <template v-if="users.length === 0">
      <div class="loader-container">
        <div class="spinner-border text-info" role="status">
          <span class="visually-hidden">Загружаем...</span>
        </div>
      </div>
    </template>
    <template v-else>
      <template v-if="!isCreate">
        <button class="btn btn-success size-btn" @click="switchCreate">Показать форму добавления пользователя</button>
      </template>
      <template v-else>
        <button class="btn btn-danger size-btn" @click="switchCreate" type="submit">Скрыть форму добавления пользователя</button>
        <form @submit.prevent="addUser({ id, firstName, lastName, email, phone })">
          <template v-if="isError">
            <h3>Введите корректные данные</h3>
          </template>
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
          <button class="btn btn-success size-btn" :disabled="id == '' || firstName == '' || lastName == '' || email == '' || phone == ''" type="submit">Добавить пользователя</button> 
        </form>
      </template>
        <div class="d-flex">
          <input v-model="searchingString" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button @click="searchUser(searchingString)" class="btn btn-outline-success" type="submit">Search</button>
        </div>
        <table class="table table-hover">
          <thead>
            <th scope="col">
              ID
              <template v-if="!isSorted">
                <button @click="users.sort(sortByFieldUp('id'))" class="btn">&darr;</button>
              </template>
              <template v-else>
                <button @click="users.sort(sortByFieldDown('id'))" class="btn">&uarr;</button>
              </template>
            </th>
            <th scope="col">
              Firstname
              <template v-if="!isSorted">
                <button @click="users.sort(sortByFieldUp('firstName'))" class="btn">&darr;</button>
              </template>
              <template v-else>
                <button @click="users.sort(sortByFieldDown('firstName'))" class="btn">&uarr;</button>
              </template>
            </th>
            <th scope="col">
              Lastname
              <template v-if="!isSorted">
                <button @click="users.sort(sortByFieldUp('lastName'))" class="btn">&darr;</button>
              </template>
              <template v-else>
                <button @click="users.sort(sortByFieldDown('lastName'))" class="btn">&uarr;</button>
              </template>
            </th>
            <th scope="col">
              Email
              <template v-if="!isSorted">
                <button @click="users.sort(sortByFieldUp('email'))" class="btn">&darr;</button>
              </template>
              <template v-else>
                <button @click="users.sort(sortByFieldDown('email'))" class="btn">&uarr;</button>
              </template>
            </th>
            <th scope="col">
              Phone
              <template v-if="!isSorted">
                <button @click="users.sort(sortByFieldUp('phone'))" class="btn">&darr;</button>
              </template>
              <template v-else>
                <button @click="users.sort(sortByFieldDown('phone'))" class="btn">&uarr;</button>
              </template>
            </th>
          </thead>
          <tbody>
            <tr @click="SET_USER(user)" v-for="(user, idx) in displayPage" :key="idx">
              <th scope="row">{{ user.id }}</th>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
            </tr>
          </tbody>  
        </table>
         <div class="clearfix btn-group col-md-2 offset-md-5">
             <button type="button" class="btn btn-sm btn-outline-secondary" v-if="page != 1" @click="page--"> &laquo; </button>
             <button type="button" class="btn btn-sm btn-outline-secondary" v-for="(pageNumber, idx) in pages.slice(page - 1, page + 2)" :key="idx" @click="page = pageNumber"> {{pageNumber}} </button>
             <button type="button" @click="page++" v-if="page < pages.length - 1" class="btn btn-sm btn-outline-secondary"> &raquo; </button>
           </div>
      <template v-if="user.id">
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
import { mapGetters, mapActions, mapMutations } from 'vuex'
import paginatorMixin from './mixins/table_paginate'

export default {
  name: 'App',
  mixins: [paginatorMixin],
  data(){
    return {
      isCreate: false,
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      validErrors: [],
      isSorted: false,
      searchingString: '',
      isError: false
    }
  },
  computed: {
    ...mapGetters({
      users: 'users',
      user: 'user',
    }),

    displayPage(){
      return this.paginate(this.users)
    },
  },
  mounted(){
    this.fetchUsers()
    this.setPages()
  },
  watch: {
    users(){
      this.setPages()
    },

  },
  methods: {
    ...mapActions({
      fetchUsers: 'fetchUsers',
    }),

    ...mapMutations({
      SET_USER: 'SET_USER',
      SET_NEW_USER: 'SET_NEW_USER',
      SET_SEARCHING_USER: 'SET_SEARCHING_USER'
    }),

    switchCreate(){
      this.isCreate = !this.isCreate
    },

    searchUser(searchingString){
     this.SET_SEARCHING_USER(searchingString)
    },

    addUser(data){
      const flag = this.checkValid()
      if(flag){
        this.SET_NEW_USER(data)
        //this.fetchUsers()
        this.isCreate = !this.isCreate
      }else {
        this.isError = true
      }
    },

    checkValid(){
      this.validErrors = []

      if(!this.id){
        this.validErrors.push('Укажите ID')
      } else if(!this.validId){
        this.validErrors.push('Укажите корректный ID.')
      }

      if(!this.firstName){
        this.validErrors.push('Укажите имя')
      }

      if(!this.lastName){
        this.validErrors.push('Укажите фамилию')
      }

      if(!this.phone){
        this.validErrors.push('Введите номер телефона')
      }else if(!this.validPhone(this.phone)){
        this.validErrors.push('Укажите корректный номер телефона')
      }

      if(!this.email){
        this.validErrors.push('Укажите почту')
      }else if(!this.validEmail(this.email)){
        this.validErrors.push('Укажите корректный адрес электронной почты.')
      }

      if(this.validErrors.length === 0){
        return true
      }else {
        return false
      }
    },

    validEmail(email){
      const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regular.test(email)
    },

    validPhone(phone){
      const regular = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
      return regular.test(phone)
    },

    validId(id){
      return /^-?\d+$/.test(id);
    },

    sortByFieldUp(field){
      this.isSorted = !this.isSorted
      return (a, b) => a[field] > b[field] ? 1 : -1
    },

    sortByFieldDown(field){
      this.isSorted = !this.isSorted
      return (a, b) => a[field] < b[field] ? 1 : -1
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

  .loader-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }

</style>
