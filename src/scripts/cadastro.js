import { Api } from "./modules/api.js"
import { DarkMode} from "./modules/darkmode.js"
import { Modal } from "./modules/modal.js"


class RegisterPage {
    

    static async criarCadastro(){

        let btnCadastro = document.querySelector(".button__primary")
        btnCadastro.addEventListener("click", async() => {

            let username = document.querySelector("#username").value
            let email = document.querySelector("#email").value
            let password = document.querySelector("#password").value
            let level = document.querySelector("#level").value


            let data = {
                password: password,
                email: email,
                professional_level: level,
                username: username,
            }

            let user = await Api.register(data)


            if (user.uuid) {

                Modal.ModalSuccess("Sucesso!", "O usuário foi criado com êxito")
            } else {

                Modal.modalErro(user.error, "corrija os dados e tente novamente")
            }
        })
    }
}

RegisterPage.criarCadastro()
DarkMode.activeDarkeMode()
Modal.toggleMenu()
Modal.toggleMenuModal()