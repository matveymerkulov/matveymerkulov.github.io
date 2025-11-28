import {Obj} from "./object.js"
import {player} from "./person.js"
import {loc, tran} from "./localization.js"

export class Item extends Obj {
    getCommands() {
        const commands = []

        commands.push({
            text: () => loc("take"),
            condition: (item) => !player.has(item),
            execution: (item) => {
                player.putOff(item)
                player.take(item)
            }
        })

        function addDropCommand(container) {
            if(!container.put) return
            commands.push({
                text: () => loc("drop") + "/" + tran(container.put),
                condition: (item) => player.has(item),
                execution: (item) => player.drop(item, container)
            })
        }

        addDropCommand(player.location)
        for(const object of player.location.objects) {
            addDropCommand(object)
        }

        return commands
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