import {no, setActionsBefore, yes} from "../../src/main.js"
import "./items.js"
import "./objects.js"
import "./locations.js"
import {player} from "../../src/person.js"
import {emerald, key, plaid, shovel, torch} from "./items.js"
import {end, begin, stable, basement} from "./locations.js"
import {safe} from "./objects.js"


setActionsBefore(() => {
    if(player.has(emerald)) {
        end.plaid = player.wears(plaid)
        player.inventory = []
        player.clothes = []
        player.moveTo(end)
    }
})

export function light(location) {
    return torch.lit && (player.has(torch) || location.contains(torch))
}

player.maxItems = 2
player.location = begin

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
