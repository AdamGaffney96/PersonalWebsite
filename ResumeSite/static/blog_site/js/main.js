let hamburger = document.getElementById('hamburger')
let nav_item = document.querySelectorAll('.nav-item')
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
    nav_item.forEach(item => {
        item.addEventListener('mouseover', (e) => {
            let content = item.querySelector('.sublist');
            content.style.maxHeight = content.scrollHeight + "px";
        })
        item.addEventListener('mouseleave', (e) => {
            let content = item.querySelector('.sublist');
            content.style.maxHeight = null;
        })
    })
}

function getWidth() {
    return document.documentElement.clientWidth
}

function scrollTracker(e) {
    let scrollTop = window.scrollY
    let scrollPercent = (window.innerHeight + scrollTop) / document.body.offsetHeight
    console.log(scrollPercent)
    document.getElementById('scroll-bar-tracker').style.width = scrollPercent * 100
}

window.addEventListener('scroll', scrollTracker)
    // max-device-width for mobile: 1024
    // max-device-height for mobile: 1440
    // anything higher is desktop site