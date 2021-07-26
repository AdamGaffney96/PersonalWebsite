// code for input box
emilyMessageSentCount = 0
matMessageSentCount = 0
emilyMessages = ["If I just lay here, would you lie with me and just forget the world?", "Do you believe in life after love?", "Sometimes I feel I've got to run away."]
matMessages = ["If I just lay here, would y forget the world?", "Do you beafter love?", "Sometimes I fe run away."]
    // use this to set message
    // message = messages[messageSentCount]

// makes the typing work
const typeMessage = function(e) {
    message = window[e.target.id.split("-")[0] + 'Messages'][window[e.target.id.split("-")[0] + "MessageSentCount"]]
    if (e.target == isInputBox) {
        e.preventDefault()
        currentLength = isInputBox.value.length
        isInputBox.value = message.substring(0, currentLength + 1)
    }
}

// Event listener to prevent typing first letter of next message when submitting last message
const onKeyUpFunction = function(e) {
    inputBox.addEventListener("keypress", typeMessage)
    inputBox.removeEventListener("keyup", onKeyUpFunction)
}

// // gets the input box
// isInputBox = document.querySelector(".chat-input-box")
// inputBox = document.getElementById("footer")

// // event listener for typing
// inputBox.addEventListener("keypress", typeMessage)

// // event listener to prevent backspace and make enter work
// inputBox.addEventListener("keydown", (e) => {
//     if (e.target == isInputBox) {
//         if (e.key == "Backspace") {
//             e.preventDefault()
//         }
//         if (e.key == "Enter" && isInputBox.value == message) {
//             e.preventDefault()
//             isInputBox.readOnly = true
//             document.activeElement.blur()
//             isInputBox.value = ""
//             inputBox.removeEventListener("keypress", typeMessage)
//             inputBox.addEventListener("keyup", onKeyUpFunction)
//             messageSentCount++
//             if (messageSentCount + 1 != isInputBox.value.length) {
//                 message = messages[messageSentCount]
//             }
//         }
//     }
// })