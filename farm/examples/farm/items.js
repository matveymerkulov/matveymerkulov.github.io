import {yes, no} from "../../src/main.js"
import {write} from "../../src/gui.js"
import {player} from "../../src/person.js"
import {stable, attic} from "./locations.js"
import {Item} from "../../src/item.js"
import {Cloth} from "../../src/cloth.js"

export const torch = Object.assign(new Item("факел"), {
    lit: no,

    name: () => `${torch.lit ? "горящий" : ""}  факел`,
    description: "Небольшой факел, совершенно обыкновенный на вид.",
    commands: [
        {
            text: "погасить",
            condition: () => torch.lit,
            execution: () => {
                torch.lit = no
                write("OК, он сразу же погас.")
            }
        }, {
            text: "зажечь",
            condition: () => !torch.lit,
            execution: () => {
                torch.lit = yes
                write("OK, теперь факел горит.")
            }
        }
    ]
})


export const chips = Object.assign(new Item("щепки"), {
    name: "деревянные щепки"
})


export const emerald = Object.assign(new Item("алмаз"), {
    name: "алмаз",
    description: "Что за подозрения! Он настоящий. Скорей бери его и покончим с этим делом!"
})


export const plaid = Object.assign(new Cloth("плед"), {
    name: "шерстяной плед",
    description: "Красивый плед, выглядит как из французской шерсти.",
})


export const box = Object.assign(new Item("шкатулка"), {
    name: ["деревянная шкатулка", "деревянную шкатулку"],
    commands: [
        {
            text: "осмотреть",
            execution: "Она достаточно прочна."
        }, {
            text: "открыть",
            execution: "Несмотря ни на какие усилия, открыть ее не удаётся!"
        }, {
            text: "отпереть/бронзовым ключом",
            condition: () => player.has(key),
            execution: "Ключ к шкатулке нe подходит."
        }, {
            text: "швырнуть вниз",
            condition: () => player.isIn(attic),
            execution: () => {
                write("Вот это бросок!!! От удара шкатулка разбилась. Что-то из нее выпало и"
                    + ", блеснув, покатилось по полу конюшни.")
                player.destroy(box)
                stable.add(chips, emerald)
            }
        }
    ]
})


export const key = Object.assign(new Item("ключ"), {
    name: "бронзовый ключ",
})


export const shovel = Object.assign(new Item("лопата"), {
    name: ["короткая лопата", "короткую лопату"],
})