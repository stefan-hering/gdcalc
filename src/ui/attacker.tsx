import * as React from "react";

import {Attacker} from '../model';

interface AttackerData {
    attacker: Attacker;
}

export class AttackerInputs extends React.Component<AttackerData,any> {
    constructor(props : AttackerData) {
        super(props);
        this.state = {
            attacker : props.attacker
        }
    }

    onChange = (event : any) => {
        let attacker = this.state.attacker;
        attacker[event.target.name] = Number(event.target.value);
        this.setState({attacker: attacker});
    }

    render() {
        return (
        <div className="row">
            <h6>Attacker</h6>
            <div className="input-field col">
                <input id="oa" 
                    name="offensiveAbility" 
                    type="number" 
                    value={this.state.attacker.offensiveAbility} 
                    onChange={this.onChange} />
                <label htmlFor="oa">OA</label>
            </div>
            <div className="input-field col">
                <input id="critDamage" 
                    name="critDamage" 
                    type="number" 
                    value={this.state.attacker.critDamage}
                     onChange={this.onChange} />
                <label htmlFor="critDamage">Crit damage</label>
            </div>
            <div className="input-field col">
                <input id="weaponSpeed" 
                    name="weaponSpeed" 
                    type="number" 
                    value={this.state.attacker.weaponSpeed} 
                    onChange={this.onChange} />
                <label htmlFor="weaponSpeed">Weapon speed</label>
            </div>
            <div className="input-field col">
                <input id="attackSpeed" 
                name="attackSpeed" 
                type="number" 
                value={this.state.attacker.attackSpeed} 
                onChange={this.onChange} />
                <label htmlFor="attackSpeed">Attack speed</label>
            </div>
        </div>);
    }
}