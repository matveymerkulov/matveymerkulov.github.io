// noinspection NonAsciiCharacters

import {executeMenuItem, update, clearConsole, showMenu} from "./gui.js"
import {toArray, toString, isArray, isFunction, error, isHidden, isClosed} from "./functions.js"
import {player} from "./person.js"

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
    return просклонять(isFunction(object.name) ? object.name(object) : object.name, pad)
}

export function просклонять(text, pad = Pad.imen) {
    if(!isArray(text)) return text
    if(text.length === 2) return text[pad === Pad.vin ? 1 : 0]
    return text[pad] ?? text[0]
}



let menu

function обработатьКоманду(command, parameter, префикс = "") {
    if(command.condition && !command.condition(parameter)) return
    const nodes = (префикс + toString(command.text)).split("/")
    let level = menu
    for(let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if(i === nodes.length - 1) {
            if(level[node] !== undefined) {
                error(`В меню уже есть команда "${command}"`)
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

function operateCommands(object, префикс = "") {
    if(isHidden(object)) return

    for(let command of toArray(object.commands)) {
        обработатьКоманду(command, object, префикс)
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
}

export function executeCommand(text) {
    const location = player.location

    for(const [пункт, узел] of Object.entries(menu)) {
        if(text === пункт) {
            if(isArray(узел)) {
                executeMenuItem(узел)
                return
            }
            showMenu(узел)
            return
        }
    }

    for(const выход of location.exits ?? []) {
        const exitCommand = выход[0]
        if(exitCommand === text) {
            player.location = выход[1]
            clearConsole()
            update()
            return
        }
    }
}