// const hamburgerButton = document.querySelector(".hamburger-button");

// const hamburgerClick = function(event) {
//     let lineOneIn = document.querySelector("#line1-animate-1");
//     let lineOneOut = document.querySelector("#line1-animate-2");
//     let lineTwoIn = document.querySelector("#line2-animate-1");
//     let lineTwoOut = document.querySelector("#line2-animate-2");
//     let lineThreeIn = document.querySelector("#line3-animate-1");
//     let lineThreeOut = document.querySelector("#line3-animate-2");
//     let navButton = document.querySelector(".hamburger-button");
//     let navMenu = document.querySelector(".nav-sidebar");
//     let navList = document.querySelector(".nav-list");
//     if (navButton.getAttribute("aria-expanded") === 'true') {
//         navButton.setAttribute("aria-expanded", "false");
//         lineOneIn.removeAttribute("active");
//         lineOneOut.beginElement();
//         lineThreeOut.beginElement();
//         lineTwoOut.beginElement();
//         navList.style.opacity = null;
//         navList.style.paddingRight = null;
//         setTimeout(function() { navList.style.visibility = null }, 300);
//         navMenu.removeAttribute("style");
//     } else {
//         navButton.setAttribute("aria-expanded", "true");
//         lineOneIn.beginElement();
//         lineThreeIn.beginElement();
//         lineTwoIn.beginElement();
//         navList.style.opacity = 1;
//         navMenu.style.width = `${navList.scrollWidth}px`;
//         navList.style.visibility = "visible";
//         navMenu.style.paddingLeft = `3rem`;
//         navList.style.paddingRight = `1rem`;
//     }
// }

// const escapeMenu = function(event) {
//     if (event.code == 'Escape' && event.target.classList.contains("navitem-link")) {
//         document.querySelector(".hamburger-button").focus();
//     }
// }

// hamburgerButton.addEventListener("click", hamburgerClick);
// window.addEventListener("keyup", escapeMenu);

const body = document.body;
const nav = document.querySelector("nav");
const main = document.querySelector("main");
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');
const lightDarkButton = document.querySelector('.light-dark-container');
const basePreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
const lightPreference = localStorage.getItem("lightPreference") ? localStorage.getItem("lightPreference") : basePreference;

if (lightPreference == "dark") {
    lightDarkButton.firstElementChild.style.transform = "translateX(200%)";
    sun.style.display = "none";
    moon.style.display = null;
} else {
    moon.style.display = "none";
    sun.style.display = null;
}

function lightDarkSwap() {
    if (lightDarkButton.firstElementChild.style.transform == "translateX(200%)") {
        lightDarkButton.firstElementChild.style.transform = null;
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
        moon.style.display = "none";
        sun.style.display = null;
        localStorage.setItem("lightPreference", "light");
    } else {
        lightDarkButton.firstElementChild.style.transform = "translateX(200%)";
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        sun.style.display = "none";
        moon.style.display = null;
        localStorage.setItem("lightPreference", "dark");
    }
}

function minimiseNav() {
    if (body.scrollHeight > document.querySelector("html").clientHeight || body.style == undefined) {
        console.log("scrollable.")
        main.style.transform = "translateY(-80px)";
        nav.style.transform = "translateY(-100%)";
        setTimeout(e => {
                body.style.gridTemplateRows = "0 1fr 160px";
                main.style.transform = null;
            }, 300)
            // main.style.gridRow = "1/3";
    } else {
        nav.style = null;
        main.style = null;
    }
}

function maximiseNav() {
    body.style.gridTemplateRows = "80px 1fr 160px";
    main.style.transform = "translateY(0)";
    nav.style.transform = "translateY(0)";
    setTimeout(e => {
        main.style.transform = null;
        nav.style.transform = null;
    }, 300)
}

lightDarkButton.addEventListener('click', lightDarkSwap)
minimiseNav();