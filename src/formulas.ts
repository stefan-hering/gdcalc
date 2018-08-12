import {Attack,Attacker,Defender,DamageType,DamageInstance} from './model';

/**
 * PTH formula taken from http://grimdawn.com/guide/gameplay/combat.php#q19
 * 
 * Capped at 66 since 1.0.6.0
 * 
 * @param oa Offensive ability of attack
 * @param da Defensive ability of attackee
 * @returns the probability to hit the enemy
 */
let probabilityToHit = (oa:number, da:number) => {
    return Math.max(66,
            ((((oa / ((da / 3.5) + oa)) * 300) * 0.3) + (((((oa * 3.25) + 10000) - (da * 3.25)) / 100) * 0.7)) - 50);
}

/**
 * Calculate a miss or a hit
 * @param roll Random roll between 0 and 1
 * @param probabilityToHit from the pth formula
 * @param critDamage +crit damage bonus from attacker
 * @returns the damage modifier for this attack, 0 for miss
 */
let calculateHitRoll : (roll:number, pth:number, critDamage:number) => number
    = (roll:number, probabilityToHit:number, critDamage:number) => {
    let hitRoll: number;
    if(probabilityToHit < 100) {
        hitRoll = roll * 100;
    } else {
        hitRoll = roll * probabilityToHit;
    }
    if(hitRoll > probabilityToHit) {
        return 0;
    }
    if(probabilityToHit < 70) {
        return probabilityToHit / 70;
    }
    if(hitRoll < 90) {
        return 1;
    }
    if(hitRoll < 105) {
        return 1.1 + critDamage;
    }
    if(hitRoll < 120) {
        return 1.2 + critDamage;
    }
    if(hitRoll < 130) {
        return 1.3 + critDamage;
    }
    if(hitRoll < 135) {
        return 1.4 + critDamage;
    }
    return 1.5 + critDamage;
}

let calculateDamageTaken = (damage:DamageInstance, defender:Defender) => {
    // Not calculated: different armor pieces, chance to hit, fumble, % damage from x...
    let damageValue = damage.value;
    if(damage.type == DamageType.PHYISCAL) {
        if(defender.armor > damageValue) {
            damageValue = damageValue * defender.armorAbsorbtion;
        } else {
            damageValue = damageValue - defender.armor + defender.armor * (1 - defender.armorAbsorbtion)
        }
    }

    return damageValue
            * (1 - defender.resistance[damage.type])
            * (1 - defender.percentAbsorbtion)
            - defender.flatAbsorbtion;
}

let calculateDamage = (attacker:Attacker, defender:Defender, attack:Attack, hitRoll:number) => {
    let totalDamage = 0;

    for(let damage of attack.damage) {
        totalDamage += 
            calculateDamageTaken({
                value: (1 + attacker.percentageDamageBonus[damage.type]) * damage.value * hitRoll,
                type: damage.type
            },defender);
    }

    if(attack.weaponDamage > 0) {
        for(let damageType in attacker.flatDamage) {
            totalDamage += 
                calculateDamageTaken({
                    value: attacker.percentageDamageBonus[damageType as DamageType] *
                        attacker.flatDamage[damageType as DamageType] *
                        attack.weaponDamage * hitRoll,
                    type: damageType as DamageType
                },defender);
        }
    }
    return totalDamage;
}

/**
 * Source: http://www.grimdawn.com/forums/showthread.php?t=36471
 * @param weaponModifier 
 * @param attackSpeedBonus 
 */
let attackPerSecond = (weaponModifier:number, attackSpeedBonus) => {
    return (1 + weaponModifier) + (1 - weaponModifier) * attackSpeedBonus;
}

export {probabilityToHit,attackPerSecond,calculateHitRoll,calculateDamage,calculateDamageTaken};