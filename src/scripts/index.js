import { Api } from "./modules/api.js"
import { DarkMode} from "./modules/darkmode.js"
import { Modal } from "./modules/modal.js"

class Homepage {

    static async generateCompaniesTable(filter) {

        let data = document.querySelectorAll(".data")
        data.forEach(elem => {
            elem.remove()
        })

        let table = document.querySelector(".table__default table")

        let companies = filter || await Api.getAllCompanies()
        companies.forEach(elem => {
            let tr = document.createElement("tr")
            tr.classList.add("data")
            tr.innerHTML = `<td>${elem.name}</td>
                            <td>${elem.description}</td>
                            <td>${elem.sectors.description}</td>
                            <td>${elem.opening_hours}</td>`

            table.append(tr)
        });
    }
    

    static async filterBySector() {

        let btnSearch = document.querySelector(".button__search")
        btnSearch.addEventListener("click", async () => {

            let search = document.querySelector(".input__filtro").value.toLowerCase()

            let companies = await Api.getAllCompanies()
            
            let filerCompaines = companies.filter(elem => elem.sectors.description.toLowerCase().includes(search))

            Homepage.generateCompaniesTable(filerCompaines)
            })
            
    }
}

Homepage.generateCompaniesTable()
Homepage.filterBySector()
DarkMode.activeDarkeMode()
Modal.toggleMenu()
Modal.toggleMenuModal()