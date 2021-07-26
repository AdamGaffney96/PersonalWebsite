Emily = {
    name: "Emily Buchanan",
    age: 18,
    relStatus: false,
    curStatus: "thinks that we should probably stop talking about this thinks that we should prob",
    statusSet: "25 minutes ago",
    musicTaste: ["Indie", "Electronic"],
    quotes: ["If I just lay here, would you lie with me and just forget the world?", ""]
}

Mat = {
    name: "Mat Gershy",
    age: 19,
    relStatus: true,
    curStatus: "pooooooooooooooooooooggers",
    statusSet: "15 minutes ago",
    musicTaste: ["Pop", "Rock"],
    quotes: ["If I just lay here, would you lie with me and just forget the world?", ""]
}

Player = {
    name: "Adam Gaffney",
    age: 20,
    relStatus: false,
    curStatus: "wants Ichiran again so badly",
    statusSet: "13 minutes ago",
    musicTaste: ["Indie", "Electronic", "Punk", "Metal"],
    quotes: ["If I just lay here, would you lie with me and just forget the world?", ""]
}

let playerStr = JSON.stringify(Player)
let playerParse = JSON.parse(playerStr)

let emilyStr = JSON.stringify(Emily)
let emilyParse = JSON.parse(emilyStr)

document.getElementById("welcome-message").innerHTML = "Welcome, " + playerParse.name + "."
document.getElementById("test2").innerHTML = emilyParse.musicTaste[0]
document.getElementById("test3").innerHTML = emilyParse.musicTaste[1]