import {Attack,Attacker,Defender,DamageType} from 'model';

/**
 * PTH formula taken from http://grimdawn.com/guide/gameplay/combat.php#q19
 * @param oa Offensive ability of attack
 * @param da Defensive ability of attackee
 * @returns the probability to hit the enemy
 */
let probabilityToHit = (oa:number, da:number) => {
    return ((((oa / ((da / 3.5) + oa)) * 300) * 0.3) + (((((oa * 3.25) + 10000) - (da * 3.25)) / 100) * 0.7)) - 50;
}

/**
 * Calculate a miss or a hit
 * @param probabilityToHit from the pth formula
 * @param critDamage +crit damage bonus from attacker
 * @returns the damage modifier for this attack, 0 for miss
 */
let calculateHit : (pth:number, critDamage:number) => number
    = (probabilityToHit:number, critDamage:number) => {
    let hitRoll: number;
    if(probabilityToHit < 100) {
        hitRoll = Math.random() * 100;
    } else {
        hitRoll = Math.random() * probabilityToHit;
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

/**
 * Source: http://www.grimdawn.com/forums/showthread.php?t=36471
 * @param weaponModifier 
 */
let attackPerSecond = (weaponModifier:number, attackSpeedBonus) => {
    return (1 + weaponModifier) + (1 - weaponModifier) * attackSpeedBonus;
}

export {probabilityToHit,attackPerSecond};