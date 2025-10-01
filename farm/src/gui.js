import {executeCommand, updateCommands, Pad, declineName, movePlayerTo} from "./main.js"
import {isClosed, isHidden, toString} from "./functions.js"
import {player} from "./person.js"
import {allObjects} from "./base.js"
import {currentLocaleIndex, loc, tran} from "./localization.js"

let portrait
const mainElement = document.getElementById("main")
const descriptionElement = document.getElementById("description")
const columnElement = document.getElementById("column")
const imageDiv1 = document.getElementById("image_div_1")
const imageDiv3 = document.getElementById("image_div_3")
const imageElement = new Image()
const consoleElement = document.getElementById("console")

function applyOrientation() {
    portrait = document.body.offsetWidth / document.body.offsetHeight < 1
    if(portrait) {
        columnElement.insertBefore(descriptionElement, consoleElement)
    } else {
        mainElement.insertBefore(descriptionElement, columnElement)
    }
}


let x, y

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("mousemove", event => {
        x = event.clientX
        y = event.clientY
    })

    document.body.onresize = function() {
        applyOrientation()
        update()
    }

    applyOrientation()

    for(const object of allObjects.values()) {
        object.init()
    }

    update()
})


function parseText(text) {
    let begin = 0, link = false, newText = "", locale = 0
    text = tran(text)
    for(let index = 0; index < text.length; index++) {
        const symbol = text.charAt(index)
        if(symbol === "*") {
            if(link) {
                const part = text.substring(begin, index).split("=")
                let exit = ""
                if(part.length > 1) {
                    exit = part[1]
                    if(exit === "") exit = part[0]
                    exit = ` exit="${exit}"`
                }
                newText = newText.concat(`<span class="link"${exit}>${part[0]}</span>`)
            } else {
                newText = newText.concat(text.substring(begin, index))
            }
            begin = index + 1
            link = !link
        } else if(symbol === "\n") {
            newText = newText.concat(text.substring(begin, index), "<p>")
            begin = index + 1
        } else if(symbol === "~") {
            locale++
        }
    }
    newText = newText.concat(text.substring(begin))
    return newText
}



function objectsText(object) {
    let text = ""
    for(let childObject of object.objects) {
        if(isHidden(childObject)) continue
        let inside = childObject.container?.inside
        inside = inside === undefined ? "" : ` (${tran(inside)})`
        text += `, <span class="link">${declineName(childObject, Pad.vin)}</span>${inside}`
        if(isClosed(childObject)) continue
        text += objectsText(childObject)
    }
    return text
}


function personInfoText(array, prefix, pad = Pad.imen) {
    let text = ""
    for(let object of array) {
        text += `${text === "" ? "" : ", "}<span class="link">${declineName(object, pad)}</span>`
    }
    return text === "" ? "" : prefix + text
}


export function update() {
    updateCommands()

    const location = player.location
    let text = objectsText(location)
    if(text !== "") text = "<p>" + loc("youSee") + text.substring(2)

    descriptionElement.innerHTML =
        parseText(
            tran(toString(location.description, location))) +
        text +
        personInfoText(player.inventory, "<p>" + loc("youHave")) +
        personInfoText(player.clothes, "<p>" + loc("youWear"), Pad.vin)

    const imageFile = toString(location.image, location)
    if(imageFile === "") {
        imageElement.hidden = true
    } else {
        imageElement.hidden = false
        imageElement.onload = function() {
            const maxWidth = portrait ? document.body.offsetWidth - 32
                : 0.5 * (document.body.offsetWidth - 48)
            const maxHeight = portrait ? 0.3 * (document.body.offsetHeight - 48)
                : 0.5 * (document.body.offsetHeight - 32)
            const scale = Math.min(maxWidth / imageElement.naturalWidth
                , maxHeight / imageElement.naturalHeight)
            imageDiv1.style.height = (scale * imageElement.naturalHeight) + "px"
        }
        imageElement.src = "images/" + imageFile
        imageDiv1.style.backgroundImage = `url("${imageElement.src}")`
        imageDiv3.style.backgroundImage = `url("${imageElement.src}")`
    }


    for(const element of document.getElementsByClassName("link")) {
        element.addEventListener("click", event => {
            if(event.target.hasAttribute("exit")) {
                movePlayerTo(event.target.getAttribute("exit"))
                return
            }
            executeCommand(event.target.innerHTML)
        })
    }
}


const menuContainer = document.getElementById("menus")

export function executeMenuItem(menuNode) {
    const command = menuNode[0].execution
    const object = menuNode[1]
    if(typeof command === "string") {
        write(command)
    } else {
        command(object)
    }
    hideMenu()
    update()
}

export function showMenu(menuNode) {
    const layer = document.createElement("div")
    layer.className = "layer"
    layer.addEventListener("click", () => {
        menuContainer.removeChild(menuContainer.lastChild)
        menuContainer.removeChild(menuContainer.lastChild)
    })

    const menu = document.createElement("div")
    menu.className = "menu"
    for(const [key, value] of Object.entries(menuNode)) {
        const div = document.createElement("div")
        div.className = "menu_item"
        div.innerHTML = key
        div["menuNode"] = value
        div.addEventListener("click", event => {
            const menuNode = event.target["menuNode"]
            if(Array.isArray(menuNode)) {
                executeMenuItem(menuNode)
            } else {
                showMenu(menuNode)
            }
        })
        menu.appendChild(div)
    }

    menu.style.visibility = "isHidden"
    menu.style.left = "0px"
    menu.style.top = "0px"

    menuContainer.appendChild(layer)
    menuContainer.appendChild(menu)

    menu.style.left = Math.max(8, Math.min(x, window.innerWidth - menu.offsetWidth - 8)) + "px"
    menu.style.top = Math.max(8, Math.min(y + 6, window.innerHeight - menu.offsetHeight - 8)) + "px"
    menu.style.visibility = "visible"
}

function hideMenu() {
    menuContainer.textContent = ""
}

export function clearConsole() {
    consoleElement.textContent = ""
}

export function write(text) {
    if(consoleElement.innerHTML.length > 0) consoleElement.innerHTML += "<p>"
    consoleElement.innerHTML += parseText(text)
    consoleElement.scrollTop = consoleElement.scrollHeight;
}

export function reset() {
    window.location.reload();
}