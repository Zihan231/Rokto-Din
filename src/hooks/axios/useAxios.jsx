import axios from "axios";

const instance = axios.create({
    baseURL: "https://rokto-din-server.vercel.app/",
})
const useAxios = () => {
    return instance;
}

export default useAxios;