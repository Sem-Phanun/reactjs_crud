import axios from "axios"

export const config = {
    baseUrl: "http://localhost:8000/api/"
}
export const handleApi = async (url,method, param) => {
    return await axios({
        url: config.baseUrl+url,
        method: method,
        data: param
    }).then(res => {
        return res.data
    }).catch(err => console.error("Error fetching", err))
}