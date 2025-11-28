import {yes, no} from "../../src/main.js"
import {light} from "./main.js"
import {write} from "../../src/gui.js"
import {player} from "../../src/person.js"
import {basement, entrance, hallway, garden, atTheGates} from "./locations.js"
import {key, shovel, box} from "./items.js"
import {Obj} from "../../src/object.js"
import {Passage} from "../../src/passage.js"
import {tran} from "../../src/localization.js"
import {combine} from "../../src/functions.js"

export const door = combine(new Obj("дверь"), {
    location0: "порог",
    location1: "прихожая",
    isClosed: yes,

    name: () => (door.isClosed ? ["закрытая дверь~closed door", "закрытую дверь~closed door"]
        : ["открытая дверь~open door", "открытую дверь~open door"]),
    inspect: () => tran("Дверь сделана из добротного дерева и в данный момент " +
        "~The door is made of good quality wood and is currently ") +
        tran(door.isClosed ? "закрыта, но не заперта~closed but not locked" :
        "остается широко открытой~wide open") + ".",
    commands: [
        {
            text: "войти~enter",
            condition: () => !door.isClosed && player.isIn(entrance),
            execution: () => {
                player.moveTo(hallway)
            }
        }, {
            text: "выйти~exit",
            condition: () => !door.isClosed && player.isIn(hallway),
            execution: () => {
                player.moveTo(entrance)
            }
        }, {
            text: "открыть~open",
            condition: () => door.isClosed,
            execution: () => {
                write("ОК, вы открыли дверь.~OK, you opened the door.")
                door.isClosed = no
            }
        }, {
            text: "закрыть~close",
            condition: () => !door.isClosed,
            execution: () => {
                write("OК, теперь дверь закрыта.~OK, now the door is closed.")
                door.isClosed = yes
            }
        }
    ],
})


export const cupboard = combine(new Obj("буфет"), {
    isClosed: yes,
    wasOpen: no,

    name: () => (cupboard.isClosed ? "закрытый буфет~closed cupboard" : "открытый буфет~opened cupboard"),
    inside: "в буфете~inside cupboard",
    put: "в буфет~in cupboard",
    commands: [
        {
            text: "открыть~open",
            condition: () => cupboard.isClosed,
            execution: () => {
                cupboard.isClosed = no
                write("ОК, вы открыли буфет.")
                if(!cupboard.wasOpen) {
                    write('Вы слышите тихий голос, доносящийся из глубины буфета: ' +
                        '"Швырни шкатулку c чердака и увидишь, что будет!".' +
                        '~You hear a quiet voice coming from the depths of the cupboard: ' +
                        '"Throw the box from the attic and see what happens!"')
                    cupboard.wasOpen = yes
                } else {
                    write("Но что такое? Все тихо!~But what's going on? Everything is quiet!")
                }
            }
        }, {
            text: "закрыть~close",
            condition: () => !cupboard.isClosed,
            execution: () => {
                cupboard.isClosed = yes
                write("ОК, теперь буфет закрыт.~OK, now the cupboard is closed.")
            }
        }
    ],
})


export const safe = combine(new Obj("сейф"), {
    isClosed: yes,
    isLocked: yes,
    isHidden: () => !light(basement),

    objects: "шкатулка",
    name: () => (safe.isClosed ? "закрытый сейф~closed safe" : "открытый сейф~opened safe"),
    inspect: () => safe.isClosed ?
        "Дверца сейфа закрыта.~The safe door is closed." :
        "Дверца сейфа открыта.~The safe door is open.",
    inside: "в сейфе~inside safe",
    put: "в сейф~in safe",
    commands: [
        {
            text: "отпереть~unlock/бронзовым ключом~with the bronze key",
            condition: () => player.has(key) && safe.isLocked,
            execution: () => {
                write("ОК, вы отперли сейф ключом.~OK, you have unlocked the safe with the key.")
                safe.isLocked = no
            }
        }, {
            text: "запереть~lock/бронзовым ключом~with bronze key",
            condition: () => player.has(key) && !safe.isLocked,
            execution: () => {
                if(safe.isClosed) {
                    write("ОК, вы заперли сейф на ключ.~OK, you've locked the safe.")
                    safe.isLocked = yes
                } else {
                    write("Сейф в данный момент открыт, его нельзя запереть." +
                        "~The safe is currently open and cannot be locked.")
                }
            }
        }, {
            text: "открыть~open",
            condition: () => safe.isClosed,
            execution: () => {
                if(safe.isLocked) {
                    write("Не открывается! Заперт на ключ.~It won't open! It's locked.")
                } else if(safe.contains(box)) {
                    write("Сейф открывается, и внутри вы видите деревянную шкатулку." +
                        "~The safe opens and inside you see a wooden casket.")
                    safe.isClosed = no
                } else {
                    write("ОК, вы открыли сейф.~OK, you have opened the safe.")
                    safe.isClosed = no
                }
            }
        }, {
            text: "закрыть~close",
            condition: () => !safe.isClosed,
            execution: () => {
                write("ОК, вы закрыли дверь сейфа.~OK, you have closed the safe door.")
                safe.isClosed = yes
            }
        }
    ],
})


export const gates = combine(new Obj("ворота"), {
    isClosed: yes,

    name: () => (gates.isClosed ? "закрытые ворота~closed gates" : "открытые ворота~open gates"),
    inspect: () => tran("Bopoтa сделаны из неважного дерева и в данный момент " +
        "~The gates are made of low-quality wood and are currently ") +
        tran(gates.isClosed ?
        "закрыты изнутри на засов~locked from the inside with a bolt" :
        "остаются открытыми~standing open") + ".",
    commands: [
        {
            text: "войти~enter",
            condition: () => !gates.isClosed && player.isIn(atTheGates),
            execution: () => {
                player.moveTo(garden)
            }
        }, {
            text: "выйти~exit",
            condition: () => !gates.isClosed && player.isIn(garden),
            execution: () => {
                player.moveTo(atTheGates)
            }
        }, {
            text: "открыть~open",
            condition: () => gates.isClosed && player.isIn(garden),
            execution: () => {
                write("ОК, вы открыли ворота, отодвинув засов.~OK, you opened the gates by sliding the bolt.")
                gates.isClosed = no
            }
        }, {
            text: "закрыть~close",
            condition: () => !gates.isClosed && player.isIn(garden),
            execution: () => {
                write("ОК, вы закрыли ворота на засов.~OK, you bolted the gates.")
                gates.isClosed = yes
            }
        }
    ]
})


export const gardenSpot = combine(new Obj("пятноВСаду"), {
    name: "пятно~spot",
    inspect: "Выглядит так, как будто здесь кто-то копал.~It looks like someone has been digging here.",
    commands: [
        {
            text: "копать яму~dig a hole/руками~with bare hands",
            execution: "Руками копать не получается. Для этого нужен подходящий инструмент." +
                "~You can't dig with your hands. You need a suitable tool for that."
        }, {
            text: "копать яму~dig a hole/лопатой~with a shovel",
            condition: () => player.has(shovel),
            execution: () => {
                if(gardenHole.contains(key)) {
                    write("Вы испортили красивую лужайку глубокой ямой. Но вот что-то блеснуло... Это ключ!" +
                        "~You ruined a beautiful lawn with a deep hole. But something sparkled... It's the key!")
                } else {
                    write("OK, вы выкопали яму.~OK, you've dug a hole.")
                }
                gardenHole.isHidden = no
                gardenSpot.isHidden = yes
            }
        }
    ]
})

export const gardenHole = combine(new Obj("ямаВСаду"), {
    isHidden: true,
    fillText: "OК, вы закопали яму и оставили на лужайке некрасивое пятно!" +
        "~OK, you filled in the hole and left an unsightly spot on the lawn!",

    name: ["яма~hole", "яму~hole"],
    inspect: "Это довольно глубокая яма, и если туда свалиться, то...!" +
        "~This is a pretty deep hole — if you fall in, then...!",
    inside: "в яме~inside hole",
    put: "в яму~in hole",
    objects: "ключ",
    commands: [
        {
            text: "закопать~fill/лопатой~with shovel",
            condition: () => player.has(shovel),
            execution: () => {
                write(gardenHole.fillText)
                gardenHole.isHidden = yes
                gardenSpot.isHidden = no
            }
        }, {
            text: "закопать~fill/руками~with bare hands",
            execution: () => {
                write(gardenHole.fillText)
                gardenSpot.isHidden = no
                gardenHole.isHidden = yes
            }
        }
    ]
})

export const fieldHole = combine(new Obj("ямаВПоле"), {
    isHidden: true,
    fillText: "OK, вы закопали яму в поле.~OK, you filled in the hole in the field.",

    name: ["яма~hole", "яму~hole"],
    inside: "в яме~inside hole",
    put: "в яму~in hole",
    commands: [
        {
            text: "закопать~fill/лопатой~with shovel",
            condition: () => !fieldHole.isHidden & player.has(shovel),
            execution: () => {
                write(fieldHole.fillText)
                fieldHole.isHidden = yes
            }
        }, {
            text: "закопать~fill/руками~with bare hands",
            condition: () => !fieldHole.isHidden,
            execution: () => {
                write(fieldHole.fillText)
                fieldHole.isHidden = yes
            }
        }
    ]
})