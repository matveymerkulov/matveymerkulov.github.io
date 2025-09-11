export const isArray = (object) => Array.isArray(object)
export const isString = (object) => typeof object === "string"
export const isFunction = (object) => typeof object === "function"


export function toArray(object, parent = undefined) {
    if(object === undefined) return []
    if(isArray(object)) return object
    if(isFunction(object)) return object.call(parent)
    return [object]
}

export function toString(object, parent = undefined) {
    if(isString(object)) return object
    if(isFunction(object)) return object.call(parent)
    return ""
}

export function toValue(object, parent = undefined) {
    if(isFunction(object)) return object.call(parent)
    return object
}


export function isHidden(object) {
    return toValue(object.isHidden, object)
}

export function isClosed(object) {
    return toValue(object.isClosed, object)
}

export function removeFromArray(array, element) {
    const index = array.indexOf(element, 0);
    if (index > -1) {
        array.splice(index, 1);
    }
}

export function error(text) {
    console.error(text)
}