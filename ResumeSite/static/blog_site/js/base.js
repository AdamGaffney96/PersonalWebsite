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