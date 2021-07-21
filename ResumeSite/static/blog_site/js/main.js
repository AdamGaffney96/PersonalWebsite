let hamburger = document.getElementById('hamburger')
let ham_nav = document.getElementById('hamburger-nav-list')
if (screen.width <= 1024) {
    hamburger.addEventListener('touchend', (e) => {
        let content = document.getElementById('hamburger-nav-list');
        // content.style.width = document.getElementsByTagName('main')[0].offsetWidth + "px"
        // console.log(content.style.width)
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            setTimeout(function() { document.getElementById("overlay").className = "fadeOutOverlay" }, 1)
            setTimeout(function() { document.getElementById("overlay").style.display = "none" }, 301)
        } else {
            document.getElementById("overlay").style.display = null
            content.style.maxHeight = content.scrollHeight + "px";
            document.getElementById("overlay").classList.remove("fadeOutOverlay")
            setTimeout(function() { document.getElementById("overlay").className = "fadeInOverlay" }, 1)
        }
    })
} else {
    hamburger.addEventListener('click', (e) => {
        let content = document.getElementById('hamburger-nav-list');
        // content.style.width = document.getElementsByTagName('main')[0].offsetWidth + "px"
        // console.log(content.style.width)
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            setTimeout(function() { document.getElementById("overlay").className = "fadeOutOverlay" }, 1)
            setTimeout(function() { document.getElementById("overlay").style.display = "none" }, 301)
        } else {
            document.getElementById("overlay").style.display = null
            content.style.maxHeight = content.scrollHeight + "px";
            document.getElementById("overlay").classList.remove("fadeOutOverlay")
            setTimeout(function() { document.getElementById("overlay").className = "fadeInOverlay" }, 1)
        }
    })
}

function getWidth() {
    return document.documentElement.clientWidth
}

window.addEventListener('resize', (e) => {
    ham_nav.style.maxHeight = null;
    document.getElementById("overlay").style.display = null
    document.getElementById("overlay").classList.remove("fadeInOverlay")
    document.getElementById("overlay").classList.add("fadeOutOverlay")
})

// max-device-width for mobile: 1024
// max-device-height for mobile: 1440
// anything higher is desktop site