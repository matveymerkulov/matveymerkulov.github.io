import {executeMenuItem, update, clearConsole, showMenu, write} from "./gui.js"
import {toArray, toString, isArray, isFunction, error, isHidden, isClosed} from "./functions.js"
import {player} from "./person.js"
import {allObjects} from "./base.js"
import {loc, tran} from "./localization.js"

export const yes = true, no = false

export const Pad = Object.freeze({
    imen: 0,
    rod: 1,
    dat: 2,
    vin: 3,
    tvor: 4,
    pred: 5
})



let actionsBefore = () => {}
export function setActionsBefore(func) {
    actionsBefore = func
}



export function declineName(object, pad = Pad.imen) {
    if(object.name === undefined || object.name === "") error(loc("NoName"))
    return decline(isFunction(object.name) ? object.name(object) : object.name, pad)
}

export function decline(text, pad = Pad.imen) {
    if(!isArray(text)) return tran(text)
    if(text.length === 2) return tran(text[pad === Pad.vin ? 1 : 0])
    return tran(text[pad] ?? text[0])
}



let menu

function operateCommand(command, parameter, prefix = "") {
    if(command.condition && !command.condition(parameter)) return
    const nodes = (prefix + toString(command.text)).split("/")
    let level = menu
    for(let i = 0; i < nodes.length; i++) {
        const node = tran(nodes[i])
        if(i === nodes.length - 1) {
            if(level[node] !== undefined) {
                error(loc("commandExists") + nodes + '".')
            }
            level[node] = [command, parameter]
        } else {
            if(level[node] === undefined) {
                level[node] = {}
            }
            level = level[node]
        }
    }
}

function operateCommands(object, prefix = "") {
    if(isHidden(object)) return

    if(object.inspect !== undefined) {
        operateCommand({
            text: "осмотреть~inspect",
            execution: (object) => {
                write(toString(object.inspect))
            }
        }, object, prefix)
    }

    for(let command of toArray(object.commands)) {
        operateCommand(command, object, prefix)
    }

    if(isClosed(object)) return

    for(let childObject of object.objects) {
        operateCommands(childObject, declineName(childObject, Pad.vin) + "/")
    }
}



export function updateCommands() {
    actionsBefore()

    const location = player.location

    menu = {}
    operateCommands(location)

    for(let object of player.inventory) {
        operateCommands(object, declineName(object) + "/")
    }
    for(let object of player.clothes) {
        operateCommands(object, declineName(object, Pad.vin) + "/")
    }

    console.log(menu)
}

export function executeCommand(text) {
    for(const [item, node] of Object.entries(menu)) {
        if(text === item) {
            if(isArray(node)) {
                executeMenuItem(node)
                return
            }
            showMenu(node)
            return
        }
    }
}

export function movePlayerTo(exit) {
    player.location = allObjects.get(exit)
    clearConsole()
    update()
}