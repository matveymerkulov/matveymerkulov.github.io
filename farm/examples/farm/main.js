import{no, setActionsBefore, yes} from "../../src/main.js"
import "./items.js"
import "./objects.js"
import "./locations.js"
import {player} from "../../src/person.js"
import {diamond, key, blanket, shovel, torch} from "./items.js"
import {end, begin, stable, basement, field, garden} from "./locations.js"
import {safe} from "./objects.js"
import {getEnglishSystemLocale, getRussianSystemLocale, newLocale} from "../../src/localization.js"


setActionsBefore(() => {
    if(player.has(diamond)) {
        end.plaid = player.wears(blanket)
        player.inventory = []
        player.clothes = []
        player.moveTo(end)
    }
})

export function light(location) {
    return torch.lit && (player.has(torch) || location.contains(torch))
}

newLocale("Русский", getRussianSystemLocale(), true)
newLocale("English", getEnglishSystemLocale())

player.maxItems = 2
player.location = begin

/*player.location = garden
player.inventory = [shovel]*/

/*player.location = stable
stable.objects = ["алмаз", "плед", "факел"]*/

/*игрок.location = location.чердак
игрок.inventory = [шкатулка]*/

/*игрок.location = location.сад
игрок.inventory = [лопата]*/

/*player.location = stable
stable.objects = ["факел", "ключ"]
torch.lit = yes
safe.isClosed = no*/

/*player.location = basement
player.inventory = [torch, key]*/
