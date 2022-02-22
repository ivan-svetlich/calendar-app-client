import axios from "axios";
import { DateTime } from "luxon";
import { ItemDto } from "./entities/Item";

type Items = {
    dueDate: Date,
    todoItems: ItemDto[]
}

const getItemsByInterval = (startDate: DateTime, endDate: DateTime) => {
    return axios.get<Items[]>(
        `https://localhost:44301/Items?startDate=${startDate.toUTC().toISO()}&endDate=${endDate.toUTC().toISO()}`, 
            {headers: {"authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImU0OWFlODcwLTg0MjEtNDUzMS04ZWM1LTBmMzE3Yzk5YjQzYiIsImVtYWlsIjoidXNlcjFAdXNlci5jb20iLCJzdWIiOiJlNDlhZTg3MC04NDIxLTQ1MzEtOGVjNS0wZjMxN2M5OWI0M2IiLCJqdGkiOiJmM2UzODcxMC04NDMwLTQ5YTgtYmFkOS1jMDcxODcyMTRhZTYiLCJuYmYiOjE2NDUzOTc4NjAsImV4cCI6MTY0NjAwMjY2MCwiaWF0IjoxNjQ1Mzk3ODYwfQ.Y9pNTEJi3EvBuN8UpXaTyQ1vyutFkSZJ5eRNlcDRs-Q"}})
}

type UpdateItemRequest = {
    description: string,
    completed: boolean,
    removed: boolean,
    dueDate: Date
}
const addItem = (item: UpdateItemRequest) => {
    return axios.post(
        `https://localhost:44301/Items`, item,
            {headers: {"authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImU0OWFlODcwLTg0MjEtNDUzMS04ZWM1LTBmMzE3Yzk5YjQzYiIsImVtYWlsIjoidXNlcjFAdXNlci5jb20iLCJzdWIiOiJlNDlhZTg3MC04NDIxLTQ1MzEtOGVjNS0wZjMxN2M5OWI0M2IiLCJqdGkiOiJmM2UzODcxMC04NDMwLTQ5YTgtYmFkOS1jMDcxODcyMTRhZTYiLCJuYmYiOjE2NDUzOTc4NjAsImV4cCI6MTY0NjAwMjY2MCwiaWF0IjoxNjQ1Mzk3ODYwfQ.Y9pNTEJi3EvBuN8UpXaTyQ1vyutFkSZJ5eRNlcDRs-Q"}})
}

const updateItem = (id: number, item: UpdateItemRequest) => {
    return axios.put(
        `https://localhost:44301/Items/${id}`, item,
            {headers: {"authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImU0OWFlODcwLTg0MjEtNDUzMS04ZWM1LTBmMzE3Yzk5YjQzYiIsImVtYWlsIjoidXNlcjFAdXNlci5jb20iLCJzdWIiOiJlNDlhZTg3MC04NDIxLTQ1MzEtOGVjNS0wZjMxN2M5OWI0M2IiLCJqdGkiOiJmM2UzODcxMC04NDMwLTQ5YTgtYmFkOS1jMDcxODcyMTRhZTYiLCJuYmYiOjE2NDUzOTc4NjAsImV4cCI6MTY0NjAwMjY2MCwiaWF0IjoxNjQ1Mzk3ODYwfQ.Y9pNTEJi3EvBuN8UpXaTyQ1vyutFkSZJ5eRNlcDRs-Q"}})
}

export {
    addItem,
    getItemsByInterval,
    updateItem
};