const allChatBoxes = document.querySelectorAll(".chat-box")

const leftmostChatBox = allChatBoxes.item(allChatBoxes.length - 1)

window.addEventListener("resize", (e) => {
    if (e.target.innerWidth / allChatBoxes.length < 262) {
        leftmostChatBox.style.display = "none"
    } else {
        leftmostChatBox.style.display = null
    }
})

window.addEventListener("click", (e) => {
    if (e.target.classList.contains("chat-bar")) {
        let nameId = (e.target.id.split('-')[0] + ' ' + e.target.id.split('-')[1] + "-chat-box").replace(" ", "-")
        if (getComputedStyle(document.querySelector(`#${nameId}`).querySelector(".chat-box-content")).display == "grid" ||
            document.querySelector(`#${nameId}`).querySelector(".chat-box-content").style.display == "grid") {
            document.querySelector(`#${nameId}`).querySelector(".chat-box-content").style.display = "none"
            document.querySelector(`#${nameId}`).querySelector(".chat-box-content").style.transform = "none"
        } else {
            document.querySelector(`#${nameId}`).querySelector(".chat-box-content").style.display = null
        }
    } else if (e.target.classList.contains("colour-bar-name")) {
        let nameId = (e.target.innerHTML.toLowerCase().replace(" ", "-") + "-chat-box")
        if (getComputedStyle(document.querySelector(`#${nameId}`).querySelector(".chat-box-content")).display == "grid" ||
            document.querySelector(`#${nameId}`).querySelector(".chat-box-content").style.display == "grid") {
            document.querySelector(`#${nameId}`).querySelector(".chat-box-content").style.display = "none"
        } else {
            document.querySelector(`#${nameId}`).querySelector(".chat-box-content").style.display = null
        }
    }
})

document.getElementsByClassName("chat-box")[0].style.paddingRight = "184px"