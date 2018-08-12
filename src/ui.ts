import {render} from './graphs';
import {Attacker, Defender, DamageType} from './model';
import {simulate} from './simulation';

require("./index.html");

let attacker:Attacker = {
    offensiveAbility : 2500,
    critDamage : 0.25,
    weaponSpeed : 1.12,
    attackSpeed : 25,
    percentageDamageBonus : {} as {DamageType:number},
    flatDamage : {} as {DamageType:number},
    durationBonus : {} as {DamageType:number}
}

let defender:Defender = {
    armor: 1000,
    armorAbsorbtion: 0.70,
    defensiveAbility: 2200,
    percentAbsorbtion: 0,
    flatAbsorbtion: 0,
    resistance: {} as {DamageType:number}
}

for (let type in DamageType) {
    attacker.percentageDamageBonus[DamageType[type] as DamageType] = 0;
    attacker.flatDamage[DamageType[type] as DamageType] = 0;
    defender.resistance[DamageType[type] as DamageType] = 0;
}


let values = [];

for(let i = 0; i < 100; i++) {
    let oa = 2500 + 10 * i;
    attacker.offensiveAbility = oa;
    values.push({
        "OA" : oa,
        "dps" : simulate(attacker,defender,{
            damage : [{type : DamageType.CHAOS, value:100}], weaponDamage: 0})
    })
}

render(values);
