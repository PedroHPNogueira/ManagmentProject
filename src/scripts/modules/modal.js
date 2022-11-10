import { Api } from "./api.js"
import { Data } from "./data.js"

export class Modal {

    static toggleMenu() {

        let btnOpenMenu = document.querySelector(".fa-bars").closest("div")
        btnOpenMenu.addEventListener("click", () => {

            btnOpenMenu.classList.add("menu__button__out")
            setTimeout(() => {
                btnOpenMenu.classList.remove("menu__button__out")
                btnOpenMenu.classList.add("hidden")
            }, 200)

            let btnCloseMenu = document.querySelector(".fa-xmark").closest("div")
            setTimeout(() => {
                btnCloseMenu.classList.remove("hidden")
                btnCloseMenu.classList.add("menu__button__in")
            }, 200)
            setTimeout(() => {
                btnCloseMenu.classList.remove("menu__button__in")
            }, 400)
        })

        let btnCloseMenu = document.querySelector(".fa-xmark").closest("div")
        btnCloseMenu.addEventListener("click", () => {

            btnCloseMenu.classList.add("menu__button__out")
            setTimeout(() => {
                btnCloseMenu.classList.remove("menu__button__out")
                btnCloseMenu.classList.add("hidden")
            }, 200)

            let btnOpenMenu = document.querySelector(".fa-bars").closest("div")
            setTimeout(() => {
                btnOpenMenu.classList.remove("hidden")
                btnOpenMenu.classList.add("menu__button__in")
            }, 200)
            setTimeout(() => {
                btnOpenMenu.classList.remove("menu__button__in")
            }, 400)
        })
    }

    static toggleMenuModal() {
        
        let menuModal = document.querySelector(".modal__menu")
        let btnOpenMenu = document.querySelector(".fa-bars").closest("div")
        let btnCloseMenu = document.querySelector(".fa-xmark").closest("div")

        btnOpenMenu.addEventListener("click", () => {

            menuModal.classList.remove("hidden")
            menuModal.classList.add("menu__modal__in")
            setTimeout(() => {
                menuModal.classList.remove("menu__modal__in")
            }, 500)
        })

        btnCloseMenu.addEventListener("click", () => {

            menuModal.classList.add("menu__modal__out")
            setTimeout(() => {
                menuModal.classList.remove("menu__modal__out")
                menuModal.classList.add("hidden")
            }, 180)
        })
    }

    static modalErro(tittle, mesage) {

        let modal = document.createElement("section")
        modal.classList.add("modal__erro")
        modal.classList.add("modal__information__appear")

        modal.innerHTML = `<div class="erro__body">
                            <h2 class="tittle__2">${tittle}</h2>
                            <p class="text__2">${mesage}</p>
                           </div>`

        let body = document.querySelector("body")
        body.append(modal)

        setTimeout(() => {
            modal.classList.remove("modal__information__appear")
            modal.classList.add("modal__information__disappear")
        }, 2400)

        setTimeout(() => {
            modal.remove()
        }, 2750);
    }

    static ModalSuccess(tittle, mesage) {

        let modal = document.createElement("section")
        modal.classList.add("modal__success")
        modal.classList.add("modal__information__appear")

        modal.innerHTML = `<div class="erro__body">
                            <h2 class="tittle__2">${tittle}</h2>
                            <p class="text__2">${mesage}</p>
                           </div>`

        let body = document.querySelector("body")
        body.append(modal)

        setTimeout(() => {
            modal.classList.remove("modal__information__appear")
            modal.classList.add("modal__information__disappear")
        }, 2400)

        setTimeout(() => {
            modal.remove()
        }, 2750);
    }

    static async modalCreateCompany() {

        let body = document.querySelector("body")

        let modal = document.createElement("section")
        modal.classList.add("modal__cadastrar__empresa")

        modal.innerHTML = `
        <section class="modal__cadastrar__empresa">
            <div class="modal__genericAppear">
                <h2 class="tittle__2"> Cadastrar empresa</h2>
                <input id="name" class="input__filtro" type="text" placeholder="Nome da empresa">
                <input id="opening_hours" class="input__filtro" type="time" placeholder="Horário da empresa">
                <input id="description" class="input__filtro" type="text" placeholder="Descrição da empresa">
                <select class="select__default" name="setor" id="sector_uuid">
                    <option value="">Selecione o setor da empresa</option>
                </select>
                <button class="button__primary">Cadastrar</button>
                <i class="fa-regular fa-rectangle-xmark"></i>
            </div>
        </section>`

        let select = modal.querySelector("select")

        let setores = await Api.listSectors()
        setores.forEach(setor => {
            let option = document.createElement("option")
            option.value = setor.uuid
            option.innerText = setor.description 

            select.append(option)
        });

        body.append(modal)

        setTimeout(() => {
            let modalDiv = modal.querySelector("div")
            modalDiv.classList.remove("modal__genericAppear")
        }, 400)

        Modal.closeModalCreateCompany()
    }

    static closeModalCreateCompany() {
        
        let btnClose = document.querySelector(".modal__cadastrar__empresa i")
        btnClose.addEventListener("click", () => {

            let modal = document.querySelector(".modal__cadastrar__empresa")
            let modalDiv = document.querySelector(".modal__cadastrar__empresa div")

            modalDiv.classList.add("modal__genericDisappear")

            setTimeout(() => {
                modal.remove()
            }, 350)
        })
    }

    static async modalSeeCompany(id) {

        let body = document.querySelector("body")

        let company = await Data.getCompanyById(id)

        let modal = document.createElement("section")
        modal.classList.add("modal__ver__empresa")
        modal.innerHTML = 
        `<div class="modal__genericAppear">       
            <div class="nome__empresa">
                <h1 class="tittle__2">${company.name}</h1>
                <p class="text__1">${company.description}</p>
            </div>
            <div class="informacao__basica">
                <div>
                    <p class="text__1">Horário:</p>
                    <span class="text__1">${company.opening_hours}</span>
                </div>
                <div class="linha"></div>
                <div>
                    <p class="text__1">Setor:</p>
                    <span class="text__1">${company.sectors.description}</span>
                </div>
            </div>
            <div class="departamentos">
                <div>
                    <h2 class="tittle__2">Departamentos </h2>
                    <i id="${company.name}" class="fa-solid fa-plus add__department"></i>
                </div>
                <ul>
                </ul>
            </div>
            <div class="funcionarios">
                <h2 class="tittle__2">Funcionários</h2>
                <ul>    
                </ul>
            </div>
            <i class="fa-regular fa-rectangle-xmark"></i>
        </div>`

        let departamentosLista = modal.querySelector(".departamentos ul")
        let funcionariosLista = modal.querySelector(".funcionarios ul")

        company.departments.forEach(elem => {
            let li = document.createElement("li")
            li.innerHTML = 
            `<p class="text__1">${elem.name}</p>
            <span class="text__2">${elem.description}</span>
            <button value="${elem.uuid}" class="button__default--invert see__department">Ver</button>`

            departamentosLista.appendChild(li)

            elem.employees.forEach(employee => {
                let li = document.createElement("li")
                li.innerHTML =
                `<li>
                    <p class="text__1">${employee.username}</p>
                    <p class="text__1">${elem.name}</p>
                    `+`
                </li>`

                funcionariosLista.appendChild(li)
            })
        })
        
        body.append(modal)

        Modal.closeModalSeeCompany()
        Modal.seeDepartment()
        Modal.seeCreateDepartment()
        Modal.seeModalSeeEmployee()
    }

    static closeModalSeeCompany() {
        
        let btnClose = document.querySelector(".modal__ver__empresa > div > i")
        btnClose.addEventListener("click", () => {
            
            let modal = document.querySelector(".modal__ver__empresa")
            let modalDiv = document.querySelector(".modal__ver__empresa div")

            modalDiv.classList.add("modal__genericDisappear")

            setTimeout(() => {
                modal.remove()
            }, 350)
        })
    }

    static async modalSeeDepartment(id) {

        let body = document.querySelector("body")

        let department = await Data.getDepartmentById(id)

        let modal = document.createElement("section")
        modal.classList.add("modal__ver__departamento")
        modal.innerHTML = 
        `<div class="modal__genericAppear">
            <div class="nome__departamento">
                <div>
                    <h2 class="tittle__2">${department.name}</h2>
                    <i id="${department.uuid}" class="fa-solid fa-pen-to-square edit__department"></i>
                </div>
                <p class="text__1">${department.description}</p>
            </div>
            <div class="funcionarios">
                <h2 class="tittle__2">Funcionários:</h2>
                <ul>
                </ul>
            </div>
            <button id="${id}" class="button__default--invert hire">Contratar</button>
            <button value="${id}" class="button__red">Deletar departamento</button>
            <i class="fa-regular fa-rectangle-xmark fechar"></i>
        </div>`

        let employeesList = modal.querySelector("ul")

        department.employees.forEach( elem => {
            let li = document.createElement("li")
            li.innerHTML = 
            `<h3 class="text__1">${elem.username}</h3>
                <p class="text__2">${elem.professional_level}</p>
                <p class="text__2">${elem.kind_of_work}</p>
                <div>
                    <button id="${elem.uuid}" class="button__default--invert see__employee">Ver</button>
                </div>`

                employeesList.appendChild(li)
        })

        body.append(modal)

        Modal.seeModalEditDepartment()
        Modal.seeModalHireEmployee()
        Modal.seeModalSeeEmployee()
        Modal.closeModalSeeDepartment()

        let btnDelete = modal.querySelector(".button__red")
        btnDelete.addEventListener("click", async () => {

            let deleted = await Api.deleteDepartment(id)
            console.log("oi")
           

            if (deleted == undefined){
                Modal.ModalSuccess("Sucesso!", "Departamento deletado com sucesso.")
            } else {
                Modal.modalErro("Erro!", "Departamento não encontrado")
            }
        })
    }

    static closeModalSeeDepartment() {
        
        let btnClose = document.querySelector(".modal__ver__departamento .fechar")
        btnClose.addEventListener("click", () => {

            let modal = document.querySelector(".modal__ver__departamento")
            let modalDiv = document.querySelector(".modal__ver__departamento div")

            modalDiv.classList.add("modal__genericDisappear")

            setTimeout(() => {
                modal.remove()
            }, 350)
        })
    }

    static seeDepartment() {

        let btnSeeDepatment = document.querySelectorAll(".see__department")
        btnSeeDepatment.forEach(elem => {

            elem.addEventListener("click", () => {
                
                Modal.modalSeeDepartment(elem.value)
            })
        })
    }

    static async modalCreateDepartment(companyName) {

        let body = document.querySelector("body")

        let companies = await Api.getAllCompanies()
        let company = companies.filter(elem => elem.name == companyName)

        let modal = document.createElement("section")
        modal.classList.add("modal__cadastrar__departamento")
        modal.innerHTML = 
        `<div class="modal__genericAppear">
            <h2 class="tittle__2">Criar departamento</h2>
            <p class="text__1">${companyName}</p>
            <input id="name" class="input__filtro" type="text" placeholder="Nome do departamento">
            <input id="description" class="input__filtro" type="text" placeholder="Descrição do departamento">
            <button id="${company[0].uuid}" class="button__primary">Criar departamento</button>
            <i class="fa-regular fa-rectangle-xmark"></i>
         </div>`

        body.append(modal)

        Modal.closeModalCreateDepartment()

        let btnCreateDepartment = modal.querySelector(".button__primary")
        btnCreateDepartment.addEventListener("click", async () => {

            let company_uuid = btnCreateDepartment.id
            let description = modal.querySelector("#description").value
            let name = modal.querySelector("#name").value

            let data = {
                name: name,
                description: description,
                company_uuid: company_uuid
            }

            let department = await Api.createDepartment(data)
            
            if (department.uuid){

                Modal.ModalSuccess("Sucesso!!", "Departamento criado com êxito.")
            } else {
                Modal.modalErro("Erro!", "Corrija as informações e tente novamente.")
            }
        })
    }

    static closeModalCreateDepartment() {

        
        let btnClose = document.querySelector(".modal__cadastrar__departamento i")
        btnClose.addEventListener("click", () => {

            let modal = document.querySelector(".modal__cadastrar__departamento")
            let modalDiv = document.querySelector(".modal__cadastrar__departamento div")

            modalDiv.classList.add("modal__genericDisappear")

            setTimeout(() => {
                modal.remove()
            }, 350)
        })
    }

    static seeCreateDepartment() {

        let btnSeeDepatment = document.querySelectorAll(".add__department")
        btnSeeDepatment.forEach(elem => {

            elem.addEventListener("click", () => {
                Modal.modalCreateDepartment(elem.id)
            })
        })
    }

    static async modalSeeEmployee(id) {

        let body = document.querySelector("body")

        let users = await Api.getAllUsers()
        let user = users.filter( elem => elem.uuid == id)
        let userObj = user[0]

        let department = await Data.getDepartmentById(user[0].department_uuid)

        let modal = document.createElement("section")
        modal.classList.add("modal__ver__funcionario")
        modal.innerHTML = 
        `<div class="modal__genericAppear">
            <div>
                <h2 class="tittle__2">${userObj.username}</h2>
                <i id="${userObj.uuid}" class="fa-solid fa-pen-to-square edit__employee"></i>
            </div>
            <div class="informacao">
                <span class="text__3">departamento</span>
                <p class="text__1">${department.name}</p>
            </div>
            <div class="informacao">
                <span class="text__3">level</span>
                <p class="text__1">${userObj.professional_level}</p>
            </div>
            <div class="informacao">
                <span class="text__3">tipo de trabalho</span>
                <p class="text__1">${userObj.kind_of_work}</p>
            </div>
            <button class="button__red fired">Demitir</button>
            <i class="fa-regular fa-rectangle-xmark fechar"></i>
        </div>`

        body.append(modal)

        Modal.seeModalEditEmployee()
        Modal.closeModalSeeEmployee()

        let btnFire = document.querySelector(".fired")
        btnFire.addEventListener("click", async () => {

            btnFire.classList.remove("button__red")
            btnFire.classList.add("button__default--invert")
            btnFire.classList.remove("fired")
            btnFire.innerText = "Demitido :("

            let fire = await Api.fireEmployee(id)

            console.log(fire)
        })
    }

    static closeModalSeeEmployee() {

        let btnClose = document.querySelector(".modal__ver__funcionario .fechar")
        btnClose.addEventListener("click", () => {
            
            let modal = document.querySelector(".modal__ver__funcionario")
            let modalDiv = document.querySelector(".modal__ver__funcionario div")

            modalDiv.classList.add("modal__genericDisappear")

            setTimeout(() => {
                modal.remove()
            }, 350)
        })
    }

    static seeModalSeeEmployee() {

        let btnOpenModal = document.querySelectorAll(".see__employee")
        
        if (btnOpenModal){
            btnOpenModal.forEach( btn => {
                btn.addEventListener("click", () => {
                    Modal.modalSeeEmployee(btn.id)
                })
            })
        }    
    }

    static async modalHireEmployee(id) {

        let body = document.querySelector("body")

        let users = await Api.getUsersOutOfWork()
        let department = await Data.getDepartmentById(id)

        let modal = document.createElement("section")
        modal.classList.add("modal__contratar__funcionario")
        modal.innerHTML = 
        `<div class="modal__genericAppear">
            <h2 class="tittle__2">Contratar funcionario</h2>
            <ul>
            </ul>
            <i class="fa-regular fa-rectangle-xmark fechar"></i>
        </div>`

        let employeesList = modal.querySelector("ul")

        users.forEach( elem => {
            let li = document.createElement("li")
            li.innerHTML = 
            `<h2 class="text__1">${elem.username}</h2>
            <p class="text__2">${elem.professional_level}</p>
            <button id="${elem.uuid}" value="${department.uuid}" class="button__default--invert contratar">Contratar</button>`

            employeesList.append(li)
        })

        body.append(modal)

        Modal.closeModalHireEmployee()

        let btnContratar = document.querySelectorAll(".contratar")
        btnContratar.forEach((btn) => {
            btn.addEventListener("click", async () => {

                btn.classList.remove("button__default--invert")
                btn.classList.remove("contratar")
                btn.classList.add("button__green")
                btn.innerText = "Contratado"
                let data = {
                    user_uuid: btn.id,
                    department_uuid: btn.value 
                }

                let hire = await Api.hireEmployee(data)
            })
        })
    }

    static closeModalHireEmployee() {

        let btnClose = document.querySelector(".modal__contratar__funcionario i")
        btnClose.addEventListener("click", () => {
            
            let modal = document.querySelector(".modal__contratar__funcionario")
            let modalDiv = document.querySelector(".modal__contratar__funcionario div")

            modalDiv.classList.add("modal__genericDisappear")

            setTimeout(() => {
                modal.remove()
            }, 350)
        })
    }

    static seeModalHireEmployee() {

        let btnHire = document.querySelector(".hire")
        btnHire.addEventListener("click", () => {
            Modal.modalHireEmployee(btnHire.id)
        })
    }

    static async modalUpdateEmployee(id) {

        let body = document.querySelector("body")

        let users = await Api.getAllUsers()
        let user = users.filter( elem => elem.uuid == id)
        let userObj = user[0]

        let modal = document.createElement("section")
        modal.classList.add("modal__edit__funcionario")
        modal.innerHTML = 
        `<div class="modal__genericAppear">
            <h2 class="tittle__2">Editar funcionário</h2>
            <select class="select__default" name="" id="kind_of_work">
                <option value="">Selecione tipo de trabalho</option>
                    <option value="home office">Home office</option>
                    <option value="presencial">Presencial</option>
                    <option value="hibrido">Híbrido</option>
            </select>
            <select class="select__default" name="" id="professional_level">
                <option value="">Selecione nivel de experiência</option>
                <option value="sênior">Sênior</option>
                <option value="pleno">Pleno</option>
                <option value="júnior">Júnior</option>
                <option value="estágio">Estagiário</option>
            </select>
            <button id="${id}" class="button__default--invert edit">Editar</button>
            <i class="fa-regular fa-rectangle-xmark fechar"></i>
        </div>`

        body.append(modal)

        let btnEdit = modal.querySelector(".edit")
        btnEdit.addEventListener("click", async () => {

            let idCerto = btnEdit.id
            let kind_of_work = modal.querySelector("#kind_of_work").value
            let professional_level = modal.querySelector("#professional_level").value
            let data = {
                kind_of_work: kind_of_work,
                professional_level: professional_level
            }

            let update = await Api.updateEmployee(idCerto, data)

            if (update.uuid){
                Modal.ModalSuccess("Sucesso!", "Cadastro atualizado com sucesso!")
            } else {
                Modal.modalErro("Erro!", "Corrija os dados e tente novamente.")
            }
        })

        Modal.closeModalUpdateEmployee()
    }

    static closeModalUpdateEmployee() {

        let btnClose = document.querySelector(".modal__edit__funcionario i")
        btnClose.addEventListener("click", () => {
            
            let modal = document.querySelector(".modal__edit__funcionario")
            let modalDiv = document.querySelector(".modal__edit__funcionario div")

            modalDiv.classList.add("modal__genericDisappear")

            setTimeout(() => {
                modal.remove()
            }, 350)
        })
    }

    static seeModalEditEmployee() {

        let btnEdit = document.querySelector(".edit__employee")
        btnEdit.addEventListener("click", () => {
            Modal.modalUpdateEmployee(btnEdit.id)
        })
    }

    static async modalUpdateDepartment(id) {

        let body = document.querySelector("body")

        let modal = document.createElement("section")
        modal.classList.add("modal__editar__departamento")
        modal.innerHTML = 
        `<div class="modal__genericAppear">
            <h2 class="tittle__2">Editar departamento</h2>
            <input class="input__filtro" type="text" placeholder="Editar descrição">
            <button id="${id}" class="button__default--invert edit">Editar</button>
            <i class="fa-regular fa-rectangle-xmark fechar"></i>
        </div>`

        body.append(modal)

        Modal.closeModalUpdateDepartment()

        let btnEdit = modal.querySelector(".edit")
        btnEdit.addEventListener("click", async () => {

            let id = btnEdit.id
            let description = document.querySelector(".modal__editar__departamento input").value

            let data = {
                description: description
            }

            let update = await Api.updateDepartment(id, data)

            if (update.uuid) {
                Modal.ModalSuccess("Sucesso!", "Descrição atualizada com sucesso")
            } else {
                Modal.modalErro("Erro.", "corrija as informações e tente novamente")
            }
        })
    }

    static closeModalUpdateDepartment() {

        let btnClose = document.querySelector(".modal__editar__departamento i")
        btnClose.addEventListener("click", () => {
            
            let modal = document.querySelector(".modal__editar__departamento")
            let modalDiv = document.querySelector(".modal__editar__departamento div")

            modalDiv.classList.add("modal__genericDisappear")

            setTimeout(() => {
                modal.remove()
            }, 350)
        })
    }

    static seeModalEditDepartment() {

        let btnEdit = document.querySelector(".edit__department")
        btnEdit.addEventListener("click", () => {
            Modal.modalUpdateDepartment(btnEdit.id)
        })
    }
}