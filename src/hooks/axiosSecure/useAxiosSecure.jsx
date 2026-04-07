const { default: axios } = require("axios");

const instance = axios.create({
    baseURL: "https://rokto-din-server.vercel.app/",
    withCredentials: true,
})
const useAxiosSecure = () => {
    return instance;
}
export default useAxiosSecure;