import axios from 'axios'

const SERVER_URL = 'http://localhost:3000/api/v1'

export const request = ({ url, method, data = {} }) => {
    const response = axios[method](`${url}`, data)
    return response
}

