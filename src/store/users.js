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

    SET_UPDATED_USERS(state, users){
        state.users = users
    }
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
    },

    async fetchCreateUser({ commit }, data){
        try {
            const items = await createUser(data)

            commit('SET_UPDATED_USERS', items.data)
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