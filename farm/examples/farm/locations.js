import {yes, no} from "../../src/main.js"
import {light} from "./main.js"
import {write, reset} from "../../src/gui.js"
import {player} from "../../src/person.js"
import {key, shovel, plaid, torch, box} from "./items.js"
import {buffet, gates, door, safe, hole} from "./objects.js"
import {Location} from "../../src/location.js"


export const begin = Object.assign(new Location("начало"), {
    image: "intro.jpg",
    description:
        `Цель этой короткой программы очень проста. Вам надо разыскать крупный алмаз и завладеть им.
        
        *Начать игру*
        *Авторы*`,
    exits: [
        ["Начать игру", "поле"],
        ["Авторы", "авторы"]
    ],
})


export const authors = Object.assign(new Location("авторы"), {
    image: "intro.jpg",
    description:
        `Оригинальная платформа Adventure Building System: T. D. Frost
        Адаптация платформы, разработка игры: Алексеев А. Г.
        Платформа RuWebQuest: Матвей Меркулов
        Конверсия игры: Матвей Меркулов
        Иллюстрации: Матвей Меркулов с помощью ChatGPT 5 Sora
    
        *Вернуться*`,
    exits: [
        ["Вернуться", "начало"],
    ],
})


export const barn = Object.assign(new Location("амбар"), {
    objects: "лопата",
    image: () => "barn_inside" + (barn.contains(shovel) ? "_shovel" : "") + ".jpg",
    description: "Вы находитесь в чистом и аккуратном амбаре. Фермер, которому он принадлежит, по-видимому"
        + " любит свое дело. Можно *идти на юг*.",
    exits: [
        ["идти на юг", "двор"]
    ]
})


export const yard = Object.assign(new Location("двор"), {
    image: "barn_yard.jpg",
    description: "Вы вышли на двор фермы. Никаких животных не видно."
        + " На севере - *амбар*, на юге - *поле*.",
    exits: [
        ["амбар", "амбар"],
        ["поле", "поле"]
    ]
})


export const stable = Object.assign(new Location("конюшня"), {
    image: "stable_inside.jpg",
    description: "Конюшня совершенно пуста. Нет даже характерного запаха животных."
        + " Лестница ведет *на чердак*, видны также *ступени*, скрывающиеся где-то внизу, в темноте."
        + " Можно *выйти* из конюшни.",
    exits: [
        ["выйти", "поле"],
        ["ступени", "погреб"],
        ["на чердак", "чердак"]
    ]
})


export const attic = Object.assign(new Location("чердак"), {
    image: "stable_attic.jpg",
    description: "Забравшись по *лестнице* вверх, вы попали как бы на открытый чердак."
        + " Скорее его можно описать, как большое хранилище над комнатой.",
    exits: [
        ["лестнице", "конюшня"]
    ]
})


export const field = Object.assign(new Location("поле"), {
    holeIsDug: no,

    image: "field.jpg",
    description: "Вы вышли в открытое *поле*. Оно было недавно вспахано, но ничего посажено не было."
        + " Можно пойти *на север*, *на юг*, *на восток* и *на запад*.",
    commands: [
        {
            text: "поле/выкопать яму лопатой",
            condition: () => !field.holeIsDug && player.has(shovel),
            execution: () => {
                write("ОК, вы выкопали яму в поле.")
                field.holeIsDug = yes
            }
        }, {
            text: "яма/закопать яму лопатой",
            condition: () => field.holeIsDug && player.has(shovel),
            execution: () => {
                write("OK, вы закопали яму в поле.")
                field.holeIsDug = no
            }
        }, {
            text: "поле/осмотреть",
            execution: () => {
                if(field.holeIsDug) {
                    write("Здесь *яма*, будьте ocтopoжны!")
                } else {
                    write("Чувствуeтcя заботливый уход, нo недавний дождь оставил раскисшую почву!")
                }
            }
        }
    ],
    exits: [
        ["на север", "двор"],
        ["на юг", "дорога"],
        ["на запад", "конюшня"],
        ["на восток", "порог"]
    ]
})


export const entrance = Object.assign(new Location("порог"), {
    objects: "дверь",
    image: () => "house_entrance_door_" + (door.isClosed ? "closed" : "opened") + ".jpg",
    description: "Вы находитесь у двери фермерского дома. Дом сделан очень добротно и крепко, как будто хозяевам было"
        + " от чего скрываться. От двери отходит дорога в *поле*.",
    exits: [
        ["поле", "поле"]
    ]
})



export const hallway = Object.assign(new Location("прихожая"), {
    objects: ["дверь", "буфет"],
    image: () => "hallway_buffet_" + (buffet.isClosed ? "closed" : "opened")
        + "_door_" + (door.isClosed ? "closed" : "opened") + ".jpg",
    description: () => "Перед вами небольшая прихожая. В углу стоит буфет и больше ничего здесь нет."
        + " На востоке - *кухня*, на севере - *гостиная*.",
    exits: [
        ["кухня", "кухня"],
        ["гостиная", "гостиная"],
    ]
})


export const livingRoom = Object.assign(new Location("гостиная"), {
    objects: "факел",
    image: () => "living_room" + (livingRoom.contains(torch) ? "_torch" : "") + ".jpg",
    description: "Уютная гостиная крестьянского дома. Вы чувствуете на себе чей-то взгляд."
        + " Двери ведут в *столовую* и в *прихожую*.",
    exits: [
        ["столовую", "столовая"],
        ["прихожую", "прихожая"]
    ],
})


export const diningRoom = Object.assign(new Location("столовая"), {
    objects: "плед",
    image: () => "dining_room" + (diningRoom.contains(plaid) ? "_plaid" : "") + ".jpg",
    description: "Кажется, что этой столовой комнатой давно никто не пользовался. Наверное, здесь никто не живет."
        + " Отсюда можно пройти *на кухню* и *в гостиную*.",
    exits: [
        ["на кухню", "кухня"],
        ["в гостиную", "гостиная"]
    ]
})


export const kitchen = Object.assign(new Location("кухня"), {
    image: "kitchen.jpg",
    description: "Кухня сверкает чистотой. В воздухе определенно чувствуется запах чего-то приятного."
        + " Можно идти *в прихожую*, *в столовую* или *в сад*.",
    exits: [
        ["в прихожую", "прихожая"],
        ["в столовую", "столовая"],
        ["в сад", "сад"]
    ],
})


export const basement = Object.assign(new Location("погреб"), {
    objects: "сейф",
    image: () => {
        if(light(basement)) {
            if (!safe.isClosed) {
                if(safe.contains(box)) {
                    return "stable_basement_lit_safe_opened_casket.jpg"
                }
                return "stable_basement_lit_safe_opened.jpg"
            }
            return "stable_basement_lit_safe_closed.jpg"
        } else {
            return "stable_basement_dark.jpg"
        }
    },
    description: () => light(basement) ? "В отличие от большинства обычных погребов, этот явно не"
        + " используется для хранения всяких запасов. А в углу можно разглядеть большой старомодный сейф со встроенным"
        + " в него бронзовым замком. Можно взобраться обратно *по лестнице*."
        : "Здесь темно и ничего не видно! Только на *лестницу* падает немного света.",
    exits: [
        ["лестницу", "конюшня"],
        ["по лестнице", "конюшня"]
    ]
})


export const deadEnd = Object.assign(new Location("тупик"), {
    image: "dead_end.jpg",
    description: "Это тупик. Можно было сюда вообще не приходить. Вернемся *назад*?",
    exits: [
        ["назад", "дорога"]
    ]
})


export const road = Object.assign(new Location("дорога"), {
    image: "road.jpg",
    description: "Эта дорога ведет с *востока* на *север*. Но, кажется, можно пройти и *на запад*.",
    exits: [
        ["на запад", "тупик"],
        ["востока", "уВорот"],
        ["север", "поле"],
    ]
})


export const atTheGates = Object.assign(new Location("уВорот"), {
    objects: "ворота",
    image: () => "gates_" + (gates.isClosed ? "closed" : "opened") + ".jpg",
    description: "*Дорога* упирается в ворота, за ними расположен приусадебный сад.",
    exits: [
        ["Дорога", "дорога"]
    ],
})


export const garden = Object.assign(new Location("сад"), {
    objects: ["ворота", "яма"],
    image: () => "garden_gates_" + (gates.isClosed ? "closed" : "opened")
        + (hole.isHidden ? "_spot" : "_hole") + ".jpg",
    description: () => "Это довольно пустынный *сад*, который скорее похож на лужайку с несколькими цветочными"
        + " клумбами. " + (hole.isHidden ? "Здесь было бы совсем красиво, если бы не бесцветное вытоптанное"
        + " *пятно* перед воротами, ведущими на запад." : "") + "Вы видите ворота, ведущие на запад."
        + " Можно *войти в дом*.",
    commands: [
        {
            text: "сад/осмотреть",
            condition: () => hole.isHidden,
            execution: "Вы не видите ничего необычного."
        }, {
            text: "сад/осмотреть",
            condition: () => !hole.isHidden,
            execution: "Здесь *яма*, будьте ocтopoжны!"
        }, {
            text: "пятно/осмотреть",
            execution: "Выглядит так, как будто здесь кто-то копал."
        }, {
            text: "пятно/копать яму/руками",
            execution: "Руками копать не получается. Для этого нужен подходящий инструмент."
        }, {
            text: "пятно/копать яму/лопатой",
            condition: () => player.has(shovel),
            execution: () => {
                if(hole.contains(key)) {
                    write("Вы испортили красивую лужайку глубокой ямой. Но вот что-то блеснуло... Это ключ!")
                } else {
                    write("OK, вы выкопали яму в саду.")
                }
                hole.isHidden = no
            }
        }
    ],

    exits: [
        ["войти в дом", "кухня"]
    ]
})


export const end = Object.assign(new Location("конец"), {
    plaid: no,

    image: () => "end" + (end.plaid ? "_plaid" : "") + ".jpg",
    description:
        `Поздравляем! Вы закончили свою миссию!
    
        *В начало*`,
    commands: [
        {
            text: "В начало",
            execution: () => {
                reset()
            }
        },
    ],
})