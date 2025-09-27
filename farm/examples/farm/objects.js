import {yes, no} from "../../src/main.js"
import {light} from "./main.js"
import {write} from "../../src/gui.js"
import {player} from "../../src/person.js"
import {basement, entrance, hallway, garden, atTheGates} from "./locations.js"
import {key, shovel, box} from "./items.js"
import {Obj} from "../../src/object.js"
import {Passage} from "../../src/passage.js"

export const door = Object.assign(new Obj("дверь"), {
    location0: "порог",
    location1: "прихожая",
    isClosed: yes,

    name: () => (door.isClosed ? ["закрытая дверь", "закрытую дверь"]
        : ["открытая дверь", "открытую дверь"]),
    commands: [
        {
            text: "осмотреть",
            execution: () => {
                write("Дверь сделана из добротного дерева и в данный момент "
                    + (door.isClosed ? "закрыта, но не заперта" : "остается широко открытой") + ".")
            }
        }, {
            text: "войти в дверь",
            condition: () => !door.isClosed,
            execution: () => {
                if(player.isIn(entrance)) {
                    player.moveTo(hallway)
                } else {
                    player.moveTo(entrance)
                }
            }
        }, {
            text: "открыть",
            condition: () => door.isClosed,
            execution: () => {
                write("ОК, вы открыли дверь.")
                door.isClosed = no
            }
        }, {
            text: "закрыть",
            condition: () => !door.isClosed,
            execution: () => {
                write("OК, теперь дверь закрыта.")
                door.isClosed = yes
            }
        }
    ],
})


export const buffet = Object.assign(new Obj("буфет"), {
    isClosed: yes,
    wasOpen: no,

    name: () => (buffet.isClosed ? "закрытый " : "открытый ") + "буфет",
    commands: [
        {
            text: "открыть",
            condition: () => buffet.isClosed,
            execution: () => {
                buffet.isClosed = no
                write("ОК, вы открыли буфет.")
                if(!buffet.wasOpen) {
                    write('Вы слышите тихий голос, доносящийся из глубины буфета:'
                        + '"Швырни шкатулку c чердака и увидишь, что будет!".')
                    buffet.wasOpen = yes
                } else {
                    write("Но что такое? Все тихо!")
                }
            }
        }, {
            text: "закрыть",
            condition: () => !buffet.isClosed,
            execution: () => {
                buffet.isClosed = yes
                write("ОК, теперь буфет закрыт.")
            }
        }
    ],
})


export const safe = Object.assign(new Obj("сейф"), {
    isClosed: yes,
    isLocked: yes,
    isHidden: () => !light(basement),

    objects: "шкатулка",
    name: () => (safe.isClosed ? "закрытый " : "открытый ") + "сейф",
    commands: [
        {
            text: "отпереть/ключом",
            condition: () => player.has(key) && safe.isLocked,
            execution: () => {
                write("ОК, вы отперли сейф ключом.")
                safe.isLocked = no
            }
        }, {
            text: "запереть/ключом",
            condition: () => player.has(key) && !safe.isLocked,
            execution: () => {
                if(safe.isClosed) {
                    write("ОК, вы заперли сейф на ключ.")
                    safe.isLocked = yes
                } else {
                    write("Сейф в данный момент открыт, его нельзя запереть.")
                }
            }
        }, {
            text: "открыть",
            condition: () => safe.isClosed,
            execution: () => {
                if(safe.isLocked) {
                    write("Не открывается! Заперт на ключ.")
                } else if(safe.contains(box)) {
                    write("Сейф открывается, и внутри вы видите деревянную шкатулку.")
                    safe.isClosed = no
                } else {
                    write("ОК, вы открыли сейф.")
                    safe.isClosed = no
                }
            }
        }, {
            text: "закрыть",
            condition: () => !safe.isClosed,
            execution: () => {
                write("ОК, вы закрыли дверь сейфа.")
                safe.isClosed = yes
            }
        }, {
            text: "осмотреть",
            condition: () => !safe.isClosed,
            execution: () => {
                if(safe.isClosed) {
                    write("Дверца сейфа закрыта.")
                } else {
                    write("Дверца сейфа открыта.")
                }
            }
        }
    ],
})


export const gates = Object.assign(new Obj("ворота"), {
    isClosed: yes,

    name: () => (gates.isClosed ? "закрытые " : "открытые ") + "ворота",
    commands: [
        {
            text: "войти в ворота",
            condition: () => !gates.isClosed && player.isIn(atTheGates),
            execution: () => {
                player.moveTo(garden)
            }
        }, {
            text: "выйти за ворота",
            condition: () => !gates.isClosed && player.isIn(garden),
            execution: () => {
                player.moveTo(atTheGates)
            }
        }, {
            text: "осмотреть",
            execution: () => {
                write("Bopoтa сделаны из неважного дерева и в данный момент "
                    + (gates.isClosed ? "закрыты изнутри на засов" : "остаются открытыми") + ".")
            }
        }, {
            text: "открыть",
            condition: () => gates.isClosed && player.isIn(garden),
            execution: () => {
                write("ОК, вы открыли ворота, отодвинув засов.")
                gates.isClosed = no
            }
        }, {
            text: "закрыть",
            condition: () => !gates.isClosed && player.isIn(garden),
            execution: () => {
                write("ОК, вы закрыли ворота на засов.")
                gates.isClosed = yes
            }
        }
    ]
})


export const hole = Object.assign(new Obj("яма"), {
    isHidden: yes,

    objects: "ключ",
    name: ["яма", "яму"],
    commands: [
        {
            text: "осмотреть",
            execution: "Это довольно глубокая яма, и если туда свалиться, то...!"
        }, {
            text: "закопать/лопатой",
            condition: () => player.has(shovel),
            execution: () => {
                write("OК, вы закопали яму и оставили на лужайке некрасивое пятно!")
                hole.isHidden = yes
            }
        }, {
            text: "закопать/руками",
            execution: () => {
                write("OК, вы закопали яму и оставили на лужайке некрасивое пятно!")
                hole.isHidden = yes
            }
        }
    ]
})