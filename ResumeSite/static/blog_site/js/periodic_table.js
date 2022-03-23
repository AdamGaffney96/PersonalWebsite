const elements = document.getElementsByClassName("element")
const element = document.getElementById("chosen-element")
const popup = document.querySelector("#popup-window")

const elementShift = event => {
    // When closing element
    if (event.currentTarget.classList.contains("clicked") || event.currentTarget.classList.contains("visible")){
        document.querySelector('#periodic-table').style.display = "block"
        document.getElementById("overlay").style.display = "block"
        setTimeout(function(){
            element.classList.remove("visible")
        }, 200)
        popup.classList.remove("visible")
        element.getElementsByClassName("atomic-number")[0].innerHTML = ""
        element.getElementsByClassName("chemical-symbol")[0].innerHTML = ""
        element.getElementsByClassName("chemical-name")[0].innerHTML = ""
        element.getElementsByClassName("atomic-weight")[0].innerHTML = ""
        element.classList.remove(event.currentTarget.className.split(" ")[0])
        document.querySelector("#periodic-table").classList.remove("fadeOut")
        document.querySelector("#periodic-table").classList.add("fadeIn")
        document.querySelector(".example-element").classList.remove("fadeOut")
        document.querySelector(".example-element").classList.add("fadeIn")
        popup.classList.remove("fadeIn")
        popup.classList.add("fadeOut")
        document.getElementsByClassName("clicked")[0].classList.remove("clicked")
        setTimeout(function(){
            document.getElementById("overlay").style.display = null
        }, 700)
    } else {
        // When clicking new element
        document.getElementById("overlay").style.display = "block"
        event.currentTarget.classList.add("clicked")
        document.querySelector("#periodic-table").classList.remove("fadeIn")
        document.querySelector("#periodic-table").classList.add("fadeOut")
        document.querySelector(".example-element").classList.remove("fadeIn")
        document.querySelector(".example-element").classList.add("fadeOut")
        popup.classList.remove("fadeOut")
        popup.classList.add("fadeIn")
        element.getElementsByClassName("atomic-number")[0].innerHTML = event.currentTarget.getElementsByClassName("atomic-number")[0].innerHTML
        element.getElementsByClassName("chemical-symbol")[0].innerHTML = event.currentTarget.getElementsByClassName("chemical-symbol")[0].innerHTML
        element.getElementsByClassName("chemical-name")[0].innerHTML = event.currentTarget.getElementsByClassName("chemical-name")[0].innerHTML
        element.getElementsByClassName("atomic-weight")[0].innerHTML = event.currentTarget.getElementsByClassName("atomic-weight")[0].innerHTML
        element.classList.add(event.currentTarget.className.split(" ")[0])
        setTimeout(function(){
        element.classList.add("visible")
        popup.classList.add("visible")
        }, 500)
        setTimeout(function(){
            document.getElementById("overlay").style.display = null
            document.querySelector('#periodic-table').style.display = "none"
        }, 700)
        // this.classList.toggle("active");
        // let content = this.nextElementSibling;
        // if (content.style.maxHeight){
        //     content.style.maxHeight = null;
        //     setTimeout(function(){
        //     content.style.border = 'none'
        //     }, 500)
        // } else {
        //     content.style.maxHeight = content.scrollHeight + "px";
        //     content.style.border = '#0e387d solid 1px'
        // }
    }  
}

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', elementShift)
}

element.addEventListener('click', elementShift)
