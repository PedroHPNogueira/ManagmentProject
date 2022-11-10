import { Api } from "./api.js";

export class Data {

    static async getCompanyById(id) {

        let companies = await Api.getAllCompanies()
        let companyArray = companies.filter(elem => elem.uuid == id)
        let company = companyArray[0]
        company.departments = []

        let departments = await Api.getDepartmentByCompany(company.uuid)
        departments.forEach(element => {
            element.employees = []
            company.departments.push(element)
        });
        
        let users = await Api.getAllUsers()
        let departmentsNumber = company.departments.length
        users.forEach(elem => {
            for (let i = 0 ; i < departmentsNumber ; i++){
                if (elem.department_uuid == company.departments[i].uuid){
                    company.departments[i].employees.push(elem)
                }
            }
        })


        return company
    }

    static async getDepartmentById(id) {

        let departments = await Api.getAllDepartments()
        let department = departments.filter(elem => elem.uuid == id)

        let companyId = department[0].companies.uuid
        let company = await Data.getCompanyById(companyId)

        let departmentsComplete = company.departments
        let departmentComplete = departmentsComplete.filter(elem => elem.uuid == id)

        return departmentComplete[0]
    }
}