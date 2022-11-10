import { Api } from "../modules/api.js"
import { DarkMode} from "../modules/darkmode.js"
import { Data } from "../modules/data.js"
import { Modal } from "../modules/modal.js"


class VisaoGeraoPage {

    static async renderPage(){

        if (!localStorage.getItem("@kenzieEmpresas:token")){
            window.location.assign("../../../index.html")
        }

        let companies = document.querySelector("#companies")
        let departments = document.querySelector("#departments")
        let sectors = document.querySelector("#sectors")
        let emplyees = document.querySelector("#employees")

        let allCompanies = await Api.getAllCompanies()
        let companiesNumber = allCompanies.length
        let allDepartments = await Api.getAllDepartments()
        let departmentsNumber = allDepartments.length
        let allSectors = []
        allCompanies.forEach(element => {
            if (allSectors.includes(element.sectors.description)){

            } else { allSectors.push(element.sectors.description)}
        });
        let sectorsNumber = allSectors.length
        let allEmployees = []
        allDepartments.forEach( async (elem) => {
            let department = await Data.getDepartmentById(elem.uuid)
            department.employees.forEach(elem => {
                allEmployees.push(elem)
            })
        })
        setTimeout(() => {
            let emplyeesNumber = allEmployees.length
            emplyees.innerText = emplyeesNumber
        }, 200);

        companies.innerText = companiesNumber
        departments.innerText = departmentsNumber
        sectors.innerText = sectorsNumber        
        
    }
}


VisaoGeraoPage.renderPage()
DarkMode.activeDarkeMode()
DarkMode.logout()
Modal.toggleMenu()
Modal.toggleMenuModal()