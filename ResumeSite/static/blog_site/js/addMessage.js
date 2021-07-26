const startChat = function(name) {
    firstName = name.split(' ')[0];

    // chat box creator
    node = document.querySelector("#chat-box-template")
    clonedNode = document.importNode(node.content, true)
    clonedNode.querySelector('.chat-box').id = window[firstName].name.replace(" ", "-").toLowerCase() + "-chat-box"
    clonedNode.querySelector('.chat-box').querySelector('.other-user-info').querySelector('.colour-bar-name').innerHTML = window[firstName].name
    let statusTime = clonedNode.querySelector('.chat-box').querySelector('.other-user-info').querySelector('.non-colour-bar-status').querySelector('.time-for-status').cloneNode(true)
    statusTime.innerHTML = window[firstName].statusSet
    console.log(statusTime)
    clonedNode.querySelector('.chat-box').querySelector('.other-user-info').querySelector('.non-colour-bar-status').innerHTML = window[firstName].curStatus
    clonedNode.querySelector('.chat-box').querySelector('.other-user-info').querySelector('.non-colour-bar-status').appendChild(statusTime)
    clonedNode.querySelector('.chat-box').querySelector('.chat-input-box').id = window[firstName].name.toLowerCase().replace(' ', '-') + "-chat-input-box"
    clonedNode.querySelector('.chat-bar').id = name.replace(" ", "-").toLowerCase() + "-chat"
    clonedNode.querySelector('.chat-bar').innerHTML = window[firstName].name

    inputBox = document.getElementById("footer")

    // event listener for typing
    inputBox.addEventListener("keypress", typeMessage)

    // event listener to prevent backspace and make enter work
    inputBox.addEventListener("keydown", (e) => {
        isInputBox = e.target
        if (isInputBox.className == "chat-input-box") {
            if (e.key == "Backspace") {
                e.preventDefault()
            }
            if (e.key == "Enter") {
                e.preventDefault()
                if (isInputBox.value == message) {
                    e.preventDefault()
                        // isInputBox.readOnly = true
                    document.activeElement.blur()
                    isInputBox.value = ""
                    window[e.target.id.split("-")[0] + "MessageSentCount"]++
                        inputBox.removeEventListener("keypress", typeMessage)
                    inputBox.addEventListener("keyup", onKeyUpFunction)
                    if (window[e.target.id.split("-")[0] + "MessageSentCount"] + 1 != isInputBox.value.length) {
                        message = window[e.target.id.split("-")[0] + 'Messages'][window[e.target.id.split("-")[0] + "MessageSentCount"]]
                    }
                }
            }
        }
    })

    $(clonedNode).insertBefore($('#chat-boxes #clear'))

    // scroll to bottom
    messageBox = document.querySelector(".message-history")
    messageBox.scrollTop = messageBox.scrollHeight
}

const addMessage = function(user, message) {
    console.log(document.querySelector("#message-template"))
    node = document.querySelector("#message-template")
    clonedNode = document.importNode(node.content, true)
    console.log(clonedNode)

    clonedNode.querySelector(".message-history-message-sender-name").innerHTML = user
    clonedNode.querySelector(".message-history-message-sent").innerHTML = message
    document.querySelector('.message-history').appendChild(clonedNode)
    messageBox = document.querySelector(".message-history")
    messageBox.scrollTop = messageBox.scrollHeight
}

startChat("Mat Gershy")
startChat("Emily Buchanan")
document.getElementById('test-button').addEventListener('click', function() { addMessage('Steven', 'This is yet another test message') })