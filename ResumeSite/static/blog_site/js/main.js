let hamburger = document.getElementById('hamburger')
let ham_nav = document.getElementById('hamburger-nav-list')
if (screen.width <= 1024) {
    hamburger.addEventListener('touchend', (e) => {
        let content = document.getElementById('hamburger-nav-list');
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    })
} else {
    hamburger.addEventListener('click', (e) => {
        let content = document.getElementById('hamburger-nav-list');
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    })
}

function getWidth() {
    return document.documentElement.clientWidth
}

window.addEventListener('resize', (e) => {
    ham_nav.style.maxHeight = null;
})

// max-device-width for mobile: 1024
// max-device-height for mobile: 1440
// anything higher is desktop site