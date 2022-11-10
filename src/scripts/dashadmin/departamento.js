import { Api } from "../modules/api.js"
import { DarkMode} from "../modules/darkmode.js"
import { Data } from "../modules/data.js"
import { Modal } from "../modules/modal.js"

class DepartamentoPage {

    static async buildOptions() {

        if (!localStorage.getItem("@kenzieEmpresas:token")){
            window.location.assign("../../../index.html")
        }

        let select = document.querySelectorAll("#companys")
        

        let companies = await Api.getAllCompanies()
        companies.forEach(element => {  
            select.forEach((elem) => {
                let option = document.createElement("option")
                option.innerText = element.name
                option.value = element.name

                elem.append(option)
            })
        });

        let btnCadastrar = document.querySelector(".cadastrar")
        btnCadastrar.addEventListener("click", () => {

            let companyName = document.querySelector("#companys").value

            if (companyName){
                Modal.modalCreateDepartment(companyName)
            } else {
                Modal.modalErro("Erro!", "Selecione uma empresa para realizar o cadastro.")
            }
        })
    }

    static async buildTable(filter) {

        let data = document.querySelectorAll(".data")
        data.forEach(elem => {
            elem.remove()
        })

        let table = document.querySelector(".table__default table")

        let departments = filter || await Api.getAllDepartments()
        departments.forEach(async (elem) => {

            if (document.querySelector("body").clientWidth > 762) {

                let department = await Data.getDepartmentById(elem.uuid)

                let tr = document.createElement("tr")
                tr.classList.add("data")
                tr.innerHTML = `<td>${elem.name}</td>
                                <td>${elem.description}</td>
                                <td>${elem.companies.name}</td>
                                <td>${department.employees.length}</td>
                                <td><button value="${elem.uuid}" class="button__default--invert see__department">Ver</button></td>`

                table.append(tr)
            } else {

                let departments = await Api.getDepartmentByCompany(elem.uuid)

                let tr = document.createElement("tr")
                tr.classList.add("data")
                tr.innerHTML = `<td>${elem.name}</td>
                                <td>${elem.companies.name}</td>
                                <td><button value="${elem.uuid}" class="button__default--invert see__department">Ver</button></td>`

                table.append(tr)
            }

            
     
        });

        setTimeout(() => {
            Modal.seeDepartment()
        },200)
        
        
    }

    static async filterBySector() {

        let selectInput = document.querySelector(".filtro__empresa")
        selectInput.addEventListener("input", async () => {

            let search = document.querySelector(".filtro__empresa").value

            let departments = await Api.getAllDepartments()
            
            let filerDepartments = departments.filter(elem => elem.companies.name.includes(search))

            DepartamentoPage.buildTable(filerDepartments)
            }) 
    }

    static async filterByName() {

        let btnPesquisa = document.querySelector(".button__search")
        btnPesquisa.addEventListener("click", async () => {

            let empresa = document.querySelector(".filtro__empresa").value

            let departments = await Api.getAllDepartments()
            
            let filerDepartments = departments.filter(elem => elem.companies.name.includes(empresa))

            let search = document.querySelector("#name__filtro").value.toLowerCase()

            let filterNameDepartments = filerDepartments.filter( elem => elem.name.toLowerCase().includes(search))

            DepartamentoPage.buildTable(filterNameDepartments)
        })
    }

    static adjustTable() {

        if (document.querySelector("body").clientWidth > 762) {
            let tags = document.querySelectorAll(".desktop")
            tags.forEach(elem => {
                elem.classList.remove("desktop")
            })
        }
    }
}

DepartamentoPage.filterByName()
DepartamentoPage.filterBySector()
DepartamentoPage.buildTable()
DepartamentoPage.buildOptions()
DarkMode.activeDarkeMode()
DarkMode.logout()
Modal.toggleMenu()
Modal.toggleMenuModal()
DepartamentoPage.adjustTable()