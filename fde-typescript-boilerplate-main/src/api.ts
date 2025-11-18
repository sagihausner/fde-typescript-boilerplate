import axios from "axios";

export const API = axios.create({
    baseURL: "https://fde-task.onrender.com",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});