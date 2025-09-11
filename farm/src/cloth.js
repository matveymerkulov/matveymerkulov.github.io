import {Item} from "./item.js"
import {player} from "./person.js"

export class Cloth extends Item {
    init() {
        super.init()
        this.commands.push({
            text: "надеть",
            condition: () => !player.wears(this),
            execution: () => {
                player.drop(this)
                player.wear(this)
            }
        }, {
            text: "снять",
            condition: () => player.wears(this),
            execution: () => player.putOff(this)
        })
    }
}