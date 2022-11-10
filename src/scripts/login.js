import { Api } from "./modules/api.js"
import { DarkMode} from "./modules/darkmode.js"
import { Modal } from "./modules/modal.js"

class LoginPage {

    static async login(){

        let btnLogin = document.querySelector(".button__primary")
        btnLogin.addEventListener("click", async () => {

            let email = document.querySelector("#email").value
            let password = document.querySelector("#password").value

            let data = {
                email: email,
                password:password
            }

            let user =  await Api.login(data)


            if (user.token){
                
                localStorage.setItem("@kenzieEmpresas:token", user.token)
                localStorage.setItem("@kenzieEmpresas:id", user.uuid)

                if ( user.is_admin == true){
                    window.location.assign("./dashaadmin/visaogeral.html")
                } else { window.location.assign("./dashcomum.html")}
            } else {
                Modal.modalErro(user.error,"corriga os dados e tente novamente")
            }
            
        })

    }
}

LoginPage.login()
DarkMode.activeDarkeMode()
Modal.toggleMenu()
Modal.toggleMenuModal()