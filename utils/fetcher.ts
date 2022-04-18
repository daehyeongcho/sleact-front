import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3095'

type MethodType = 'get' | 'post' | 'patch' | 'delete' // method
type Options = {
    withCredentials?: boolean
}

const defaultOptions = {
    withCredentials: true, // cookie
}

const Fetcher = async (type: MethodType, url: string, data: any, options: Options = defaultOptions) => {
    let response

    switch (type) {
        case 'get':
            response = await axios.get(url, options)
            return response.data
        case 'post':
            response = await axios.post(url, data, options)
            return response.data
        case 'patch':
            response = await axios.patch(url, data, options)
            return response.data
        case 'delete':
            response = await axios.delete(url, options)
            return response.data
        default:
            break
    }
}

export default Fetcher
