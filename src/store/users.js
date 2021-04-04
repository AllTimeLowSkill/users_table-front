import Vue from 'vue'
import Vuex from 'vuex'

import { getUsers, getUser, createUser } from '../services/users.service'

const mutations = {
    SET_USERS(state, users){
        state.users = users
    },

    SET_USER(state, user){
        state.user = user
    },

    SET_NEW_USER(state, user){
        state.users.unshift(user)
    },

    SET_SEARCHING_USER(state, searchingString){
        if(searchingString !== ''){
            const searchUsers = []
            state.users.filter(user => {
                if(user.id === searchingString || user.firstName === searchingString || user.lastName === searchingString || user.email === searchingString || user.phone === searchingString){
                    searchUsers.push(user)
                }
            })
            state.users = searchUsers
        }
    },
}
const actions = {
    async fetchUsers({ commit }){
        try {
            const items = await getUsers()
            commit('SET_USERS', items.data)
        } catch (error) {
            
        }
    },

    async fetchUser({ commit }, id){
        try {
            const item = await getUser(id)
            commit('SET_USER', item.data)
        } catch (error) {
            
        }
    }
}
const getters = {
    users: ({ users }) => users,
    user: ({ user }) => user
}
const state = () => ({
    users: [],
    user: {}
})

export default {
    mutations,
    actions,
    getters,
    state
}