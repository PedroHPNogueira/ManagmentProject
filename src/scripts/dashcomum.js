import { Api } from "./modules/api.js"
import { DarkMode} from "./modules/darkmode.js"
import { Data } from "./modules/data.js"
import { Modal } from "./modules/modal.js"


class Dashcomum {

    static async renderPage() {

        if (!localStorage.getItem("@kenzieEmpresas:token")){
            window.location.assign("../../../index.html")
        }

        let user = await Api.getProfileInformation()
        let department = await Api.getUserDepartment()
        let coworkers = await Api.getCoworkers()
        console.log(coworkers)

        let companyHtml = document.querySelector("#company")
        let departmentHtml = document.querySelector("#department")

        company.innerText = department.name || "Sem empresa"
        departmentHtml.innerText = department.departments[0].name || "Sem departamento"

        let coworkersList = document.querySelector(".informacao ul")

        coworkers[0].users.forEach(element => {

            if (element.username == user.username){

            } else{
                let li = document.createElement("li")
            li.innerHTML = 
            `<p>${element.username}</p>
            <span>${element.professional_level}</span>
            <span>${element.kind_of_work}</span>`

            coworkersList.append(li)
            }
        });
    }
}


Dashcomum.renderPage()
DarkMode.activeDarkeMode()
DarkMode.logout()
Modal.toggleMenu()
Modal.toggleMenuModal()
