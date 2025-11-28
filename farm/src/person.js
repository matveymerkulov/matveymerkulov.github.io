import {write, update, clearConsole} from "./gui.js"
import {Obj} from "./object.js"
import {allObjects} from "./base.js"
import {removeFromArray} from "./functions.js"


function addToPersonArray(person, array, item) {
    if(array.includes(item)) return
    if(item.container) removeFromArray(item.container.objects, item)
    removeFromArray(person.location.objects, item)
    array.push(item)
}

function removeFromPersonArray(person, array, item, container) {
    if(!array.includes(item)) return
    removeFromArray(array, item)
    container.objects.push(item)
    item.container = container
}

export class Person extends Obj {
    inventory = []
    maxItems
    clothes = []
    location

    moveTo(location) {
        this.location = location
        clearConsole()
    }

    isIn(location) {
        return this.location === location
    }

    has(item) {
        return this.inventory.includes(item)
    }

    take(item){
        const max = this.maxItems
        if(max >= 0 && this.inventory.length >= max) {
            write("Вы не можете нести больше предметов.")
            return
        }
        addToPersonArray(this, this.inventory, item)
    }

    drop(item, container) {
        removeFromPersonArray(this, this.inventory, item, container)
    }

    wears(item) {
        return this.clothes.includes(item)
    }

    putOn(item){
        addToPersonArray(this, this.clothes, item)
    }

    putOff(item, container) {
        removeFromPersonArray(this, this.clothes, item, container)
    }

    destroy(item) {
        removeFromArray(this.inventory, item)
        removeFromArray(this.clothes, item)
    }
}

export const player = new Person("игрок")