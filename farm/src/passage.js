// noinspection NonAsciiCharacters


import {BaseObject, allObjects} from "./base.js"
import {write} from "./gui.js"
import {no} from "./main.js"
import {player} from "./person.js"

export class Passage extends BaseObject {
    location0
    location1

    constructor(имя, location0, location1) {
        super(имя)
    }

    init() {
        super.init()
        this.location0 = allObjects.get(this.location0)
        this.location1 = allObjects.get(this.location1)
        this.location0.objects.push(this)
        this.location1.objects.push(this)

        this.commands.push({
            text: "войти",
            execution: () => {
                player.moveTo(player.isIn(this.location1) ? this.location0: this.location1)
            }
        })
    }
}