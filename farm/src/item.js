import {Obj} from "./object.js"
import {player} from "./person.js"
import {loc} from "./localization.js"

export class Item extends Obj {
    init() {
        super.init()
        this.commands.push({
            text: () => loc("take"),
            condition: () => !player.has(this),
            execution: () => {
                player.putOff(this)
                player.take(this)
            }
        }, {
            text: () => loc("drop"),
            condition: () => player.has(this),
            execution: () => player.drop(this)
        })
    }

    moveTo(container) {
        if(this.container === container) return
        if(this.container) this.container.objects.remove(this)
        container.objects.push(this)
        this.container = container
    }

    isIn(container) {
        return this.container === container
    }
}