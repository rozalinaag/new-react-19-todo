import { User } from "./types"

export function fetchUsers() {
 return fetch("http://localhost:3001/users").then((res) => res.json() as Promise<User[]>)
}

export function createUser(user: User){
  throw new Error("Not implemented")
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