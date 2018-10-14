import {simulate} from "../simulation";
import {Attack, Attacker,DamageType,Defender,Simulation} from "../model";

const ctx: Worker = self as any;


// Respond to message from parent thread
ctx.onmessage = (ev) => {
    let values = [];

    let {attacker, defender, attack} : Simulation = ev.data;

    for(let i = 0; i < 350; i++) {
        let oa = 500 + 10 * i;
        attacker.offensiveAbility = oa;
        values.push({
            "OA" : oa,
            "dps" : simulate({attacker:attacker,
                defender: defender,
                attack: attack, 
                attacks: 20000})
        })
    }

    ctx.postMessage(values);
};