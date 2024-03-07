import { DatabaseMethods } from "../types";




const databaseMethods: DatabaseMethods = {
    login: (email: string, password: string) => {
        console.log(email, password)
    },
    register: (form) => {
        console.log(form)
    },
    getUsers: (role, id) => {
        console.log(role, id)
        return []
    },
}

export default databaseMethods