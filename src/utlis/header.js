import axios from "axios"

export const setHeader = (key, payload) =>{
    axios.defaults.headers.common[key] = payload;
}

export const deleteHeader = (key) => {
    delete axios.defaults.headers.common[key];
}