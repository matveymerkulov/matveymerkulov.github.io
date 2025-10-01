import {Item} from "./item.js"
import {player} from "./person.js"
import {loc, tran} from "./localization.js"

export class Cloth extends Item {
    init() {
        super.init()
        this.commands.push({
            text: () => loc("putOn"),
            condition: () => !player.wears(this),
            execution: () => {
                player.drop(this)
                player.putOn(this)
            }
        }, {
            text: () => loc("putOff"),
            condition: () => player.wears(this),
            execution: () => player.putOff(this)
        })
    }
}