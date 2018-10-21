import {simulate} from "../simulation";
import {Attack, Attacker,DamageType,Defender,Simulation} from "../model";

const ctx: Worker = self as any;


// Respond to message from parent thread
ctx.onmessage = (ev) => {
    let values = [];

    let sim : Simulation = ev.data;

    for(let i = 0; i < 350; i++) {
        let oa = 500 + 10 * i;
        sim.attacker.offensiveAbility = oa;
        values.push({
            "OA" : oa,
            "dps" : simulate(sim)
        })
    }

    ctx.postMessage(values);
};