import {calculateDamage,calculateHitRoll, probabilityToHit} from "./formulas";
import {Attack, Attacker, DamageType, Defender, } from "./model";

interface Simulation {
    attacker: Attacker
    attack : Attack
    defender: Defender
    attacks : number
}

let simulate = (s : Simulation) => {
    let totalDamage = 0;

    for(let i = 0; i < s.attacks; i ++) {
        let hitRoll = calculateHitRoll(Math.random(),
            probabilityToHit(s.attacker.offensiveAbility, s.defender.defensiveAbility),
            s.attacker.critDamage);
        
        totalDamage += calculateDamage(s.attacker, s.defender, s.attack, hitRoll);
    }
    return totalDamage;
}

export {simulate}