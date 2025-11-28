import {Item} from "./item.js"
import {player} from "./person.js"
import {loc, tran} from "./localization.js"

export class Cloth extends Item {
    getCommands() {
        const commands = []
        commands.push({
            text: () => loc("putOn"),
            condition: (item) => !player.wears(item),
            execution: (item) => {
                player.drop(item, player.location)
                player.putOn(item)
            }
        })

        function addDropCommand(container) {
            if(!container.put) return
            commands.push({
                text: () => loc("putOff") + "/" + tran(container.put),
                condition: (item) => player.wears(item),
                execution: (item) => player.putOff(item, container)
            })
        }

        addDropCommand(player.location)
        for(const object of player.location.objects) {
            addDropCommand(object)
        }

        return commands
    }
}