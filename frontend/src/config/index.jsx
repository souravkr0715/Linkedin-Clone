const { default : axios} = require("axios");

export const BASE_URL = "https://linkedin-clone-66o2.onrender.com"
export const clientServer = axios.create({
    baseURL:BASE_URL,
})