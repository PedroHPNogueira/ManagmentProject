import { Api } from "../modules/api.js"
import { DarkMode} from "../modules/darkmode.js"
import { Modal } from "../modules/modal.js"
import { Data } from "../modules/data.js"


export class EmpresasPage {

    static logout() {

        let btnLogout = document.querySelector("#logout")
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("@kenzieEmpresas:token")
            localStorage.removeItem("@kenzieEmpresas:id")

            window.location.assign("../../../index.html")
        })
    }

    static async createCompanyFunction() {

        let btncreate = document.querySelector(".cadastrar__empresa button")
        btncreate.addEventListener("click", async () => {

            await Modal.modalCreateCompany()

            let btnCadastrar = document.querySelector(".modal__cadastrar__empresa button")
            btnCadastrar.addEventListener("click", async () => {

                let modal = document.querySelector(".modal__cadastrar__empresa")

                let name = modal.querySelector("#name").value
                let opening_hours = modal.querySelector("#opening_hours").value
                let description = modal.querySelector("#description").value
                let sector_uuid = modal.querySelector("#sector_uuid").value

                let data = {
                    name: name,
                    opening_hours: opening_hours,
                    description: description,
                    sector_uuid: sector_uuid,
                }

                let company = await Api.createCompany(data)

                if (company.uuid){

                    Modal.ModalSuccess("Sucesso!!", "Empresa cadastrada com êxito")
                } else {

                    Modal.modalErro('Erro!', "Corrija os dados e tente novamente.")
                }
            })
        })
    }

    static async buildTable(filter) {

        if (!localStorage.getItem("@kenzieEmpresas:token")){
            window.location.assign("../../../index.html")
        }

        let data = document.querySelectorAll(".data")
        data.forEach(elem => {
            elem.remove()
        })

        let table = document.querySelector(".table__default table")

        let companies = filter || await Api.getAllCompanies()
        companies.forEach(async (elem) => {

            if (document.querySelector("body").clientWidth > 762) {

                let departments = await Api.getDepartmentByCompany(elem.uuid)

                let tr = document.createElement("tr")
                tr.classList.add("data")
                tr.innerHTML = `<td>${elem.name}</td>
                                <td>${elem.description}</td>
                                <td>${elem.sectors.description}</td>
                                <td>${departments.length}</td>
                                <td>${elem.opening_hours
                                }</td>
                                <td><button value="${elem.uuid}" class="button__default--invert see__company">Ver</button></td>`

                table.append(tr)
            } else {

                let departments = await Api.getDepartmentByCompany(elem.uuid)

                let tr = document.createElement("tr")
                tr.classList.add("data")
                tr.innerHTML = `<td>${elem.name}</td>
                                <td>${elem.sectors.description}</td>
                                <td><button value="${elem.uuid}" class="button__default--invert see__company">Ver</button></td>`

                table.append(tr)
            }

            
     
        });

        setTimeout(() => {
            EmpresasPage.seeCompany()
        },200)
        
        
    }

    static async filterBySector() {

        let selectInput = document.querySelector("#setor__filtro")
        selectInput.addEventListener("input", async () => {

            let search = document.querySelector("#setor__filtro").value

            let companies = await Api.getAllCompanies()
            
            let filerCompaines = companies.filter(elem => elem.sectors.description.includes(search))

            EmpresasPage.buildTable(filerCompaines)
            }) 
    }

    static async filterByName() {

        let btnPesquisa = document.querySelector(".button__search")
        btnPesquisa.addEventListener("click", async () => {

            let setor = document.querySelector("#setor__filtro").value

            let companies = await Api.getAllCompanies()
            
            let filerCompaines = companies.filter(elem => elem.sectors.description.includes(setor))

            let search = document.querySelector("#name__filtro").value.toLowerCase()

            let filterNameCompanies = filerCompaines.filter( elem => elem.name.toLowerCase().includes(search))

            EmpresasPage.buildTable(filterNameCompanies)
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

    static seeCompany() {

        let btnSeeCompany = document.querySelectorAll(".see__company")
        btnSeeCompany.forEach(btn => {
            btn.addEventListener("click", async () => {

                Modal.modalSeeCompany(btn.value)
            })
        })
    }

}

EmpresasPage.buildTable()
EmpresasPage.filterBySector()
EmpresasPage.filterByName()
EmpresasPage.createCompanyFunction()
DarkMode.activeDarkeMode()
DarkMode.logout()
Modal.toggleMenu()
Modal.toggleMenuModal()
EmpresasPage.adjustTable()