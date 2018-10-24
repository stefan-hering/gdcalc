import {simulate} from "../simulation";
import {Attack, Attacker,DamageType,Defender,Simulation} from "../model";

const ctx: Worker = self as any;


// Respond to message from parent thread
ctx.onmessage = (ev) => {
    let values = [];

    let sim : Simulation = ev.data;

    let baseOA = sim.attacker.offensiveAbility - 1510;

    for(let i = 0; i < 300; i++) {
        let oa = baseOA + 10 * i;
        sim.attacker.offensiveAbility = oa;
        values.push({
            "OA" : oa,
            "dps" : simulate(sim)
        })
    }

    ctx.postMessage(values);
};