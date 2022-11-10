export class Api {

    static baseUrl = "http://localhost:6278/"
    static token = localStorage.getItem("@kenzieEmpresas:token") || ""
    static headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
    }

    static async login(data) {

        let user = await fetch(`${this.baseUrl}auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return user
    }

    static async register(data) {

        let user = await fetch(`${this.baseUrl}auth/register/user`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then( resp => resp.json())
        .catch( err => console.log(err))

        return user
    }

    static async getAllCompanies() {

        let companies = await fetch(`${this.baseUrl}companies`, {
            method: "GET",
            headers: this.headers,
        })
        .then( resp => resp.json())
        .catch( err => console.log(err))

        return companies
    }

    static async getProfileInformation() {

        let user = await fetch(`${this.baseUrl}users/profile`, {
            method: "GET",
            headers: this.headers
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return user
    }

    static async createCompany(data) {

        let company = await fetch(`${this.baseUrl}companies`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return company
    }

    static async listSectors() {

        let sectors = await fetch(`${this.baseUrl}sectors`, {
            method: "GET",
            headers: this.headers,
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return sectors
    }

    static async getDepartmentByCompany(id) {

        let departments = await fetch(`${this.baseUrl}departments/${id}`, {
            method: "GET",
            headers: this.headers
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return departments
    }

    static async createDepartment(data) {

        let department = await fetch(`${this.baseUrl}departments`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return department
    }

    static async getAllUsers() {

        let users = await fetch(`${this.baseUrl}users`, {
            method: "GET",
            headers: this.headers
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return users
    }

    static async hireEmployee(data) {

        let hire = await fetch(`${this.baseUrl}departments/hire/`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return hire
    }

    static async getAllDepartments() {

        let departments = await fetch(`${this.baseUrl}departments`, {
            method: "GET",
            headers: this.headers
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return departments
    }

    static async deleteDepartment(id) {

        let deleted = await fetch(`${this.baseUrl}departments/${id}`, {
            method: "DELETE",
            headers: this.headers,
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return deleted
    }

    static async getUsersOutOfWork() {

        let user = await fetch(`${this.baseUrl}admin/out_of_work`, {
            method: "GET",
            headers:  this.headers
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return user
    }

    static async fireEmployee(id) {

        let fire = await fetch(`${this.baseUrl}departments/dismiss/${id}`, {
            method: "PATCH",
            headers: this.headers
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return fire
    }

    static async updateEmployee(id, data) {

        let employee = await fetch(`${this.baseUrl}admin/update_user/${id}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return employee
    }

    static async updateDepartment(id, data) {

        let update = await fetch(`${this.baseUrl}departments/${id}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return update
    }

    static async getCoworkers() {

        let coworkers = await fetch(`${this.baseUrl}users/departments/coworkers`, {
            method: "GET",
            headers: this.headers
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return coworkers
    }

    static async getUserDepartment() {

        let department = await fetch(`${this.baseUrl}users/departments`, {
            method: "GET",
            headers: this.headers
        })
        .then( resp => resp.json())
        .catch(err => console.log(err))

        return department
    }
}