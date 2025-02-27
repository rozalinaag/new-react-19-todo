import { User } from "./types"

export function fetchUsers() {
 return fetch("http://localhost:3001/users").then((res) => res.json() as Promise<User[]>)
}

export function createUser(user: User){
  return fetch("http://localhost:3001/users", {
    method: "POST", 
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then((res) => res.json())
}

export function deleteUser(id: string){
  return fetch(`http://localhost:3001/users/${id}`, {
    method: "DELETE"
  }).then((res) => res.json())
}

export type Task = {
  id: string;
  userId: string;
  title: string;
  done: string;
  createdAt: string;
}

export function fetchTasks({
  page, per_page, query,
}: {
  page?: number;
  per_page: number;
  query: string;
}){
  return fetch (
    `htttp://localhost:3001/tasks?_page=${page}&_per_page=${per_page}${query}`
  ).then((res) => res.json() as Promise<Task[]>)
}