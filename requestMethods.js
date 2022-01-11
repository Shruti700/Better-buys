import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
 const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzFkNjE4NmI1YmYxMDViNjlkMGQyZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTU0ODY3MywiZXhwIjoxNjQxODA3ODczfQ.1M0lSsCh3pJjb-a12GMjepj1TIxlFwLIg0EKwYwPGoE"
  /* JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
    // .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
*/
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});