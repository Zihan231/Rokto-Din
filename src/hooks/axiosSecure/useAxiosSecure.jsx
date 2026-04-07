const { default: axios } = require("axios");

const instance = axios.create({
    baseURL: "/api",
    withCredentials: true,
})
const useAxiosSecure = () => {
    return instance;
}
export default useAxiosSecure;