import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3095'

const Fetcher = async (type: string, url: string, data: any) => {
    let response

    switch (type) {
        case 'get':
            response = await axios.get(url)
            return response.data
        case 'post':
            response = await axios.post(url, data)
            return response.data
        case 'patch':
            response = await axios.patch(url, data)
            return response.data
        case 'delete':
            response = await axios.delete(url)
            return response.data
        default:
            break
    }
}

export default Fetcher
