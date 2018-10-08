import {Attacker, Defender, DamageType} from "./model";
import damageplot from "./ui/damageplot"


require("./index.html");

let attacker:Attacker = {
    offensiveAbility : 2500,
    critDamage : .75,
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
    defender.resistance[DamageType[type] as DamageType] = .18;
}

damageplot({attacker: attacker,defender :defender});
