import axios from "axios";
import { DateTime } from "luxon";
import { getCookie } from "../services/cookies/cookies";
import { ItemDto } from "../types/Item";
import { UserDto } from "../types/User";

type Items = {
  dueDate: Date;
  todoItems: ItemDto[];
};

const getItemsByInterval = (startDate: DateTime, endDate: DateTime) => {
  return axios.get<Items[]>(
    `https://localhost:5001/Items?startDate=${startDate
      .toUTC()
      .toISO()}&endDate=${endDate.toUTC().toISO()}`,
    { headers: { authorization: `Bearer ${getCookie("id_token")}` } }
  );
};

type UpdateItemRequest = {
  description: string;
  completed: boolean;
  removed: boolean;
  dueDate: Date;
};
const addItem = (item: UpdateItemRequest) => {
  return axios.post(`https://localhost:5001/Items`, item, {
    headers: { authorization: `Bearer ${getCookie("id_token")}` },
  });
};

const updateItem = (id: number, item: UpdateItemRequest) => {
  return axios.put(`https://localhost:5001/Items/${id}`, item, {
    headers: { authorization: `Bearer ${getCookie("id_token")}` },
  });
};

const removeItem = (id: number) => {
  return axios.delete(`https://localhost:5001/Items/${id}`, {
    headers: { authorization: `Bearer ${getCookie("id_token")}` },
  });
};

export type LoginArgs = {
  email: string;
  password: string;
};

const login = (loginArgs: LoginArgs) => {
  return axios.post<UserDto>(
    `https://localhost:5001/Accounts/Login`,
    loginArgs
  );
};

export type SignupArgs = {
  username: string;
  email: string;
  password: string;
};

const signup = (signupArgs: SignupArgs) => {
  return axios.post<UserDto>(
    `https://localhost:5001/Accounts/signup`,
    signupArgs
  );
};

const server = {
  addItem,
  getItemsByInterval,
  updateItem,
  login,
  signup,
  removeItem,
};

export default server;
