import {error, toArray} from "./functions.js"
import {BaseObject, allObjects} from "./base.js"
import {loc} from "./localization.js"

export class Container extends BaseObject {
    objects = []

    init() {
        super.init()
        const array = []
        for(let objectName of toArray(this.objects)) {
            const object = allObjects.get(objectName)
            if(!object) error(loc("object") + objectName + loc("isNotFound"))
            object.container = this
            array.push(object)
        }
        this.objects = array
    }

    contains(object) {
        return this.objects.includes(object)
    }

    add(...object) {
        this.objects.push(...object)
    }

    remove(...object) {
        this.objects.remove(...object)
    }
}