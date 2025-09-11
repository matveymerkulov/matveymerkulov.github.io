// noinspection NonAsciiCharacters

import {Container} from "./container.js"
import {error, toArray} from "./functions.js"
import {allObjects} from "./base.js"

export class Location extends Container {
    init() {
        super.init()
        this.commands = toArray(this.commands)

        const array = []
        for(let exit of toArray(this.exits)) {
            const location = allObjects.get(exit[1])
            if(!location) error(`Локация "${exit[1]}" не найдена!`)
            array.push([exit[0], location])
        }
        this.exits = array
    }
}