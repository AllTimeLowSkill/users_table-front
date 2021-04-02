import { request } from './api.service'

const getUsers = () => request({ url: 'user', method: 'get' })
const getUser = (id) => request({ url: `user/${id}`, method: 'get' })
const createUser = data => request({ url: 'user', method: 'post', data })

export {
    getUser,
    getUsers,
    createUser
}