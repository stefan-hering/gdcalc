import {calculateDamage,calculateHitRoll, probabilityToHit} from "./formulas";
import {Attack, Attacker, Defender, Simulation } from "./model";


let simulate = (s : Simulation) => {
    let totalDamage = 0;

    for(let i = 0; i < s.time; i ++) {
        for(let attack of s.attacks) {
            let hitRoll = calculateHitRoll(Math.random(),
                probabilityToHit(s.attacker.offensiveAbility, s.defender.defensiveAbility),
                s.attacker.critDamage);

            totalDamage += calculateDamage(s.attacker, s.defender, attack, hitRoll);
        }
    }
    return totalDamage;
}

export {simulate}