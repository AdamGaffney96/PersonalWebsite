const listItems = document.querySelectorAll(".list-item-contents");
const startButton = document.querySelector(".start-button");
const onlineButton = document.querySelector(".online-services-button");
const onlineList = [];

listItems.forEach(element => {
    element.addEventListener("keypress", e => {
        element.firstElementChild.classList.toggle("selected");
        element.lastElementChild.classList.toggle("check-selected");
    })
    if (screen.width >= 1024) {
        element.addEventListener("click", e => {
            element.firstElementChild.classList.toggle("selected");
            element.lastElementChild.classList.toggle("check-selected");
        })
        element.addEventListener("touchend", e => {
            element.firstElementChild.classList.remove("click-start");
            element.lastElementChild.classList.remove("check-click-start");
        })
    } else {
        element.addEventListener("touchend", e => {
            element.firstElementChild.classList.remove("click-start");
            element.lastElementChild.classList.remove("check-click-start");
            element.firstElementChild.classList.toggle("selected");
            element.lastElementChild.classList.toggle("check-selected");
        })
    }
    element.addEventListener("mousedown", e => {
        element.firstElementChild.classList.add("click-start");
        element.lastElementChild.classList.add("check-click-start");
    })
    window.addEventListener("mouseup", e => {
        element.firstElementChild.classList.remove("click-start");
        element.lastElementChild.classList.remove("check-click-start");
    })
    element.addEventListener("touchstart", e => {
        element.firstElementChild.classList.add("click-start");
        element.lastElementChild.classList.add("check-click-start");
    })
})

const fadeOut = content => {
    if (content == "start") {
        startButton.classList.add("fade-out");
        setTimeout(() => {
            startButton.style.display = "none";
        }, 200);
    }
}

const fadeIn = content => {
    if (content == "online") {
        online
    }
}

startButton.addEventListener("click", e => {
    fadeOut("start");

    setTimeout(fadeIn, 500, "online");
})

onlineButton.addEventListener("mousedown", e => {
    onlineButton.classList.add("click-start");
});

window.addEventListener("mouseup", e => {
    onlineButton.classList.remove("click-start");
});

onlineButton.addEventListener("keydown", e => {
    onlineButton.classList.add("click-start");
});

onlineButton.addEventListener("keyup", e => {
    onlineButton.classList.remove("click-start");
});

const fetchOnlineAnswers = () => {
    const checked = document.querySelectorAll(".selected");
    let item;
    checked.forEach(element => {
        switch (element.alt) {
            case "YouTube":
                item = "youtube";
                break;
            case "Twitch":
                item = "twitch";
                break;
            case "Amazon Prime Video":
                item = "prime";
                break;
            case "Netflix":
                item = "netflix";
                break;
            case "BBC iPlayer":
                item = "iplayer";
                break;
            case "ITV Hub":
                item = "itv";
                break;
            case "Now TV":
                item = "nowtv";
                break;
            case "All 4":
                item = "four";
                break;
        }
        if (!onlineList.includes(item)) {
            onlineList.push(item);
        }
    })
}

onlineButton.addEventListener("click", fetchOnlineAnswers);