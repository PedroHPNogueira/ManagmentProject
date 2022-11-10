export class DarkMode {

    static activeDarkeMode() {

        let btnDarkMode = document.querySelector(".dark__button")
        btnDarkMode.addEventListener("click", () => {
            let html = document.querySelector("html")

            if (html.classList.value.includes("dark-mode")){

                html.classList.remove("dark-mode")

                let bolinha = btnDarkMode.querySelector("div")
                bolinha.classList.remove("dark__active")
                bolinha.classList.add("light__active")

            } else {
                html.classList.add("dark-mode")

                let bolinha = btnDarkMode.querySelector("div")
                bolinha.classList.remove("light__active")
                bolinha.classList.add("dark__active")
            }
            
        })
    }

    static logout() {

        let btnLogout = document.querySelectorAll("#logout")
        btnLogout.forEach(elem => {
            elem.addEventListener("click", () => {
                localStorage.removeItem("@kenzieEmpresas:token")
                localStorage.removeItem("@kenzieEmpresas:id")
    
                window.location.assign("../../../index.html")
            })
        })
    }

} 