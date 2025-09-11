export const allObjects = new Map()

export class BaseObject {
    constructor(name) {
        allObjects.set(name, this)
    }

    init() {
    }
}