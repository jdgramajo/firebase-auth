import axios from "axios";
import { getAuth } from "firebase/auth";

import firebase from "../firebase";

export const axiosPublic = axios.create({
  baseURL: process.env.api,
});

export const axiosAuth = axios.create({
  baseURL: process.env.api,
});

axiosAuth.interceptors.request.use(
  async (config) => {
    const auth = getAuth(firebase);
    const user = auth.currentUser;
    config.headers.token = user ? await user.getIdToken(true) : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
