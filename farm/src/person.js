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

function removeFromPersonArray(person, array, item) {
    if(!array.includes(item)) return
    removeFromArray(array, item)
    person.location.objects.push(item)
    item.container = person.location
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

    drop(item) {
        removeFromPersonArray(this, this.inventory, item)
    }

    wears(item) {
        return this.clothes.includes(item)
    }

    putOn(item){
        addToPersonArray(this, this.clothes, item)
    }

    putOff(item) {
        removeFromPersonArray(this, this.clothes, item)
    }

    destroy(item) {
        removeFromArray(this.inventory, item)
        removeFromArray(this.clothes, item)
    }
}

export const player = new Person("игрок")