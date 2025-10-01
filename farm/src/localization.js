import {error} from "./functions.js"

export function getRussianSystemLocale() {
    return {
        commandExists: 'В меню уже есть команда "',
        object: 'Объект "',
        isNotFound: '" не найден!',
        youHave: "У вас с собой ",
        youWear: "Вы одеты в ",
        youSee: "Вы видите ",
        location: 'Локация "',
        isNotFoundW: " не найдена!",
        locString: 'Локализационная строка "',
        noName: "У одного из объектов отсутствует имя!",
        emptyCommand: "Пустая команда ",

        take: "взять",
        drop: "положить",
        putOff: "снять",
        putOn: "надеть",
    }
}

export function getEnglishSystemLocale() {
    return {
        commandExists: 'Menu already has command "',
        object: 'Object "',
        isNotFound: '" not found!',
        youHave: "You have ",
        youWear: "You are wearing ",
        youSee: "You see ",
        location: 'Location "',
        isNotFoundW: " not found!",
        locString: 'Localization string "',
        noName: "One of objects has no name!",
        emptyCommand: "Empty command ",

        take: "take",
        drop: "drop",
        putOff: "put off",
        putOn: "put on",
    }
}


let localesList = [], currentLocale = 0
export let currentLocaleIndex = 0
export function newLocale(name, strings, setAsCurrent) {
    if(setAsCurrent) {
        currentLocale = strings
        currentLocaleIndex = localesList.length
    }
    strings.name = name
    localesList.push(strings)
}

export function setLocale(name) {
    for(let index = 0; index < localesList.length; index++) {
        if(localesList[index].name === name) {
            currentLocaleIndex = index
            currentLocale = localesList[index]
            return
        }
    }
}

export function loc(string) {
    if(!currentLocale.hasOwnProperty(string)) {
        error(loc('locString') + string + loc('isNotFound'))
        return ""
    }
    return currentLocale[string]
}

export function tran(text) {
    const parts = text.split("~")
    return parts[parts.length <= currentLocaleIndex ? 0 : currentLocaleIndex]
}