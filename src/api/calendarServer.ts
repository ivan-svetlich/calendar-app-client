import { DateTime } from "luxon";
import { getCookie } from "../services/cookies/cookies";
import { ItemDto } from "../types/Item";
import { UserDto } from "../types/User";
import apiClient from "./apiClient";

type Items = {
  dueDate: Date;
  todoItems: ItemDto[];
};

const getItemsByInterval = (startDate: DateTime, endDate: DateTime) => {
  return apiClient.get<Items[]>(
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
  return apiClient.post(`https://localhost:5001/Items`, item, {
    headers: { authorization: `Bearer ${getCookie("id_token")}` },
  });
};

const updateItem = (id: number, item: UpdateItemRequest) => {
  return apiClient.put(`https://localhost:5001/Items/${id}`, item, {
    headers: { authorization: `Bearer ${getCookie("id_token")}` },
  });
};

const removeItem = (id: number) => {
  return apiClient.delete(`https://localhost:5001/Items/${id}`, {
    headers: { authorization: `Bearer ${getCookie("id_token")}` },
  });
};

export type LoginArgs = {
  email: string;
  password: string;
};

const login = (loginArgs: LoginArgs) => {
  return apiClient.post<UserDto>(
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
  return apiClient.post<UserDto>(
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
