import {calculateDamage,calculateHitRoll, probabilityToHit} from './formulas';
import {Attack, Attacker, DamageType, Defender, } from './model';



let simulate = (attacker:Attacker, defender:Defender, attack: Attack) => {
    let totalDamage = 0;

    for(let i = 0; i < 5000; i ++) {
        let hitRoll = calculateHitRoll(Math.random(),
            probabilityToHit(attacker.offensiveAbility, defender.defensiveAbility),
            attacker.critDamage);
        
        totalDamage += calculateDamage(attacker, defender, attack, hitRoll);
    }
    console.log(totalDamage);
    return totalDamage;
}

export {simulate}