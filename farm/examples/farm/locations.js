// noinspection JSUnusedGlobalSymbols

import {yes, no} from "../../src/main.js"
import {light} from "./main.js"
import {write, reset} from "../../src/gui.js"
import {player} from "../../src/person.js"
import {key, shovel, blanket, torch, box} from "./items.js"
import {cupboard, gates, door, safe, gardenHole, fieldHole} from "./objects.js"
import {Location} from "../../src/location.js"
import {combine} from "../../src/functions.js"
import {currentLocaleIndex, setLocale} from "../../src/localization.js"

export const begin = combine(new Location("начало"), {
    image: "intro.jpg",
    description:
        `Цель этой короткой игры очень проста. Вам надо разыскать крупный алмаз и завладеть им.
        
        *Switch to English*
        *Начать игру=поле*
        *Авторы=авторы*
        ~The goal of this short quest is very simple. You need to find a large diamond and take possession of it.
        
        *Переключить на русский язык*
        *Begin game=поле*
        *Authors=авторы*`,
    commands: [
        {
            text: "Переключить на русский язык",
            execution: () => setLocale("Русский")
        }, {
            text: "Switch to English",
            execution: () => setLocale("English")
        }
    ]
})


export const authors = combine(new Location("авторы"), {
    image: "intro.jpg",
    description:
        `Оригинальная платформа Adventure Building System: T. D. Frost
        Адаптация платформы, разработка игры: Алексеев А. Г.
        Платформа WebQuest, конверсия игры: Матвей Меркулов
        Иллюстрации: Матвей Меркулов с помощью ChatGPT 5 Sora
        
        *Вернуться=начало*
        ~Original platform Adventure Building System: T. D. Frost
        Platform adaptation, game development: Alekseev A. G.
        WebQuest platform, game conversion: Matvey Merkulov
        Illustrations: Matvey Merkulov using ChatGPT 5 Sora
    
        *Return=начало*`,
})


export const barn = combine(new Location("амбар"), {
    objects: "лопата",
    image: () => "barn_inside" + (barn.contains(shovel) ? "_shovel" : "") + ".jpg",
    description: "Вы находитесь в чистом и аккуратном амбаре. Фермер, которому он принадлежит, по-видимому" +
        " любит свое дело. Можно *идти на юг=двор*.~You are in a clean and tidy barn. The farmer who owns it," +
        "apparently loves his work. You can *go south=двор*.",
})


export const yard = combine(new Location("двор"), {
    image: "barn_yard.jpg",
    description: "Вы вышли на двор фермы. Никаких животных не видно. На севере - *амбар=*, на юге - *поле=*." +
        "~You have come out into the farm yard. No animals are visible. To the north is a *barn=амбар*, " +
        "to the south is a *field=поле*."
})


export const stable = combine(new Location("конюшня"), {
    image: "stable_inside.jpg",
    description: "Конюшня совершенно пуста. Нет даже характерного запаха животных. " +
        "Лестница ведет *на чердак=чердак*, видны также *ступени=погреб*, скрывающиеся где-то внизу, в темноте. " +
        "Можно *выйти=поле* из конюшни." +
        "~The stable is completely empty. There is not even the characteristic smell of animals. " +
        "The stairs lead *to the attic=чердак*, and you can also see *steps=погреб* hiding somewhere below" +
        ", in the darkness. You can *leave=поле* the stable."
    ,
})


export const attic = combine(new Location("чердак"), {
    image: "stable_attic.jpg",
    description: "Забравшись по *лестнице=конюшня* вверх, вы попали как бы на открытый чердак. " +
        "Скорее его можно описать, как большое хранилище над комнатой." +
        "~Climbing up the *stairs=конюшня*, you find yourself in an open attic — " +
        "more like a large storage space above the room.",
})


export const field = combine(new Location("поле"), {
    objects: "ямаВПоле",
    image: "field.jpg",
    description: "Вы вышли в открытое *поле*. Оно было недавно вспахано, но ничего посажено не было. " +
        "Можно пойти *на север=двор*, *на юг=дорога*, *на восток=порог* и *на запад=конюшня*." +
        "~You have come out into an open *field*. It has been recently plowed, but nothing has been planted. " +
        "You can go *north=двор*, *south=дорога*, *east=порог*, and *west=конюшня*.",
    commands: [
        {
            text: "поле~field/выкопать яму~dig a hole/лопатой~with a shovel",
            condition: () => fieldHole.isHidden && player.has(shovel),
            execution: () => {
                write("ОК, вы выкопали яму в поле.~OK, you dug a hole in the field.")
                fieldHole.isHidden = false
            }
        }, {
            text: "поле~field/осмотреть~inspect",
            execution: "Чувствуeтcя заботливый уход, нo недавний дождь оставил раскисшую почву!" +
                        "~It feels well tended, but the recent rain has left the soil soggy!"
        }
    ],
})


export const entrance = combine(new Location("порог"), {
    objects: "дверь",
    image: () => "house_entrance_door_" + (door.isClosed ? "closed" : "opened") + ".jpg",
    description: "Вы находитесь у двери фермерского дома. Дом сделан очень добротно и крепко, как будто хозяевам было" +
        " от чего скрываться. От двери отходит дорога в *поле=*." +
        "~You are at the door of a farmhouse. The house is very well made and sturdy, " +
        "as if the owners had something to hide from. A road leads from the door into the *field=поле*.",
})



export const hallway = combine(new Location("прихожая"), {
    objects: ["дверь", "буфет"],
    image: () => "hallway_cupboard_" + (cupboard.isClosed ? "closed" : "opened") +
        "_door_" + (door.isClosed ? "closed" : "opened") + ".jpg",
    description: () => "Перед вами небольшая прихожая. В углу стоит буфет и больше ничего здесь нет. " +
        "На востоке - *кухня=*, на севере - *гостиная=*." +
        "~In front of you is a small hallway. In the corner there is a cupboard and nothing else here. " +
        "To the east is the *kitchen=кухня*, to the north is the *living room=гостиная*.",
})


export const livingRoom = combine(new Location("гостиная"), {
    objects: "факел",
    image: () => "living_room" + (livingRoom.contains(torch) ? "_torch" : "") + ".jpg",
    description: "Уютная гостиная крестьянского дома. Вы чувствуете на себе чей-то взгляд." +
        " Двери ведут в *столовую=столовая* и в *прихожую=прихожая*." +
        "~A cozy farmhouse living room. You feel someone's eyes on you." +
        " The doors lead to the *dining room=столовая* and the *hallway=прихожая*.",
})


export const diningRoom = combine(new Location("столовая"), {
    objects: "плед",
    image: () => "dining_room" + (diningRoom.contains(blanket) ? "_plaid" : "") + ".jpg",
    description: "Кажется, что этой столовой комнатой давно никто не пользовался. Наверное, здесь никто не живет." +
        " Отсюда можно пройти *на кухню=кухня* и *в гостиную=гостиная*." +
        "~It looks like this dining room hasn't been used for a long time. Probably no one lives here. " +
        "From here you can go to the *kitchen=кухня* and *living room=гостиная*.",
})


export const kitchen = combine(new Location("кухня"), {
    image: "kitchen.jpg",
    description: "Кухня сверкает чистотой. В воздухе определенно чувствуется запах чего-то приятного. " +
        "Можно идти *в прихожую=прихожая*, *в столовую=столовая* или *в сад=сад*." +
        "~The kitchen gleams with cleanliness. There's definitely a pleasant smell in the air. " +
        "You can go to the *hallway=прихожая*, the *dining room=столовая*, or the *garden=сад*.",
})


export const basement = combine(new Location("погреб"), {
    objects: "сейф",
    image: () => {
        if(light(basement)) {
            if (!safe.isClosed) {
                if(safe.contains(box)) {
                    return "stable_basement_lit_safe_opened_box.jpg"
                }
                return "stable_basement_lit_safe_opened.jpg"
            }
            return "stable_basement_lit_safe_closed.jpg"
        } else {
            return "stable_basement_dark.jpg"
        }
    },
    description: () => light(basement) ? "В отличие от большинства обычных погребов, этот явно не " +
        "используется для хранения всяких запасов. А в углу можно разглядеть большой старомодный сейф со встроенным " +
        "в него бронзовым замком. Можно взобраться обратно *по лестнице=конюшня*." +
        "~Unlike most ordinary cellars, this one is clearly not used for storing supplies. And in the corner you can " +
        "see a large old-fashioned safe with a bronze lock built into it. You can climb back up *the stairs=конюшня*." :
        "Здесь темно и ничего не видно! Только на *лестницу=конюшня* падает немного света." +
        "~It's dark here and you can't see anything! Only a little light falls on the *stairs=конюшня*.",
})


export const deadEnd = combine(new Location("тупик"), {
    image: "dead_end.jpg",
    description: "Это тупик. Можно было сюда вообще не приходить. Вернемся *назад=дорога*?" +
        "~This is a dead end. You didn't need to come here at all. Shall we go *back=дорога*?",
})


export const road = combine(new Location("дорога"), {
    image: "road.jpg",
    description: "Эта дорога ведет с *востока=уВорот* на *север=поле*. Но, кажется, можно пройти и *на запад=тупик*." +
        "~This road leads from the *east=уВорот* to the *north=поле*. But it seems that you can also go *west=тупик*.",
})


export const atTheGates = combine(new Location("уВорот"), {
    objects: "ворота",
    image: () => "gates_" + (gates.isClosed ? "closed" : "opened") + ".jpg",
    description: "*Дорога=дорога* упирается в ворота, за ними расположен приусадебный сад." +
        "~*The road=дорога* ends at a gate, behind which is a garden.",
})


export const garden = combine(new Location("сад"), {
    objects: ["ворота", "пятноВСаду", "ямаВСаду"],
    image: () => "garden_gates_" + (gates.isClosed ? "closed" : "opened") +
        (gardenHole.isHidden ? "_spot" : "_hole") + ".jpg",
    description: () => "Это довольно пустынный *сад*, который скорее похож на лужайку с несколькими " +
        "цветочными клумбами. " + (gardenHole.isHidden ? "Здесь было бы совсем красиво, если бы не бесцветное " +
        "вытоптанное пятно перед воротами, ведущими на запад. " : "") + "Вы видите ворота, ведущие на запад. " +
        "Можно *войти в дом=кухня*." +
        "~This is a rather deserted *garden*, which looks more like a lawn with a few flower " +
        "beds. " + (gardenHole.isHidden ? "It would be quite beautiful here if it weren't for the colorless trampled " +
        "*spot* in front of the gate leading to the west. " : "") + "You see the gate leading west. " +
        "You can *enter the house=кухня*.",
    commands: [
        {
            text: "сад~garden/осмотреть~inspect",
            condition: () => gardenHole.isHidden,
            execution: "Вы не видите ничего необычного.~You don't see anything unusual."
        }, {
            text: "сад~garden/осмотреть~inspect",
            condition: () => !gardenHole.isHidden,
            execution: "Здесь *яма*, будьте ocтopoжны!~There's a *hole* here, be careful!"
        }
    ],
})


export const end = combine(new Location("конец"), {
    plaid: no,

    image: () => "end" + (end.plaid ? "_plaid" : "") + ".jpg",
    description:
        `Поздравляем! Вы закончили свою миссию!
    
        *В начало*
        ~Congratulations! You have completed your mission!

        *Back to the beginning*`,
    commands: [
        {
            text: "В начало~Back to the beginning",
            execution: () => {
                reset()
            }
        },
    ],
})