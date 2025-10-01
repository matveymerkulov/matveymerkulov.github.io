import {BaseObject, allObjects} from "./base.js"
import {write} from "./gui.js"
import {no} from "./main.js"
import {player} from "./person.js"

export class Passage extends BaseObject {
    location0
    location1

    constructor(name, location0, location1) {
        super(name)
        this.location0 = location0
        this.location1 = location1
    }

    init() {
        super.init()
        this.location0 = allObjects.get(this.location0)
        this.location1 = allObjects.get(this.location1)
        this.location0.objects.push(this)
        this.location1.objects.push(this)
    }

    moveThrough() {
        player.location = player.location === this.location0 ? this.location1 : this.location0
    }
}