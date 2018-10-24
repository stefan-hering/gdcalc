import {calculateDamage,calculateHitRoll, probabilityToHit, attackPerSecond} from "./formulas";
import {Attack, Attacker, Defender, Simulation } from "./model";

interface CalculableAttack extends Attack {
    totalAttacks : number
}

let attackDamage = (attack : CalculableAttack, s : Simulation) => {
    let totalDamage = 0;
    for(let i = 0; i < attack.totalAttacks; i ++) {
        let hitRoll = calculateHitRoll(Math.random(),
            probabilityToHit(s.attacker.offensiveAbility, s.defender.defensiveAbility),
            s.attacker.critDamage);

        totalDamage += calculateDamage(s.attacker, s.defender, attack, hitRoll);
    }
    return totalDamage;
}

let simulate = (s : Simulation) => {
    let attacks : CalculableAttack[] = s.attacks.map(attack => {
        // TODO spell calculation
        let attacksPerSecond = attack.isSpell ? 0 : attackPerSecond(s.attacker.weaponSpeed, s.attacker.attackSpeed);
        return {
            weaponDamage : attack.weaponDamage,
            damage : attack.damage,
            isSpell : attack.isSpell,
            totalAttacks : attacksPerSecond * s.time
        };
    });

    return attacks.map(attack => attackDamage(attack,s)).reduce((a,b) => a + b);
}

export {simulate}