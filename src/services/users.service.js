import { request } from './api.service'

const getUsers = () => request({ url: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}', method: 'get' })
const getUser = (id) => request({ url: `user/${id}`, method: 'get' })
const createUser = data => request({ url: 'user', method: 'post', data })

export {
    getUser,
    getUsers,
    createUser
}