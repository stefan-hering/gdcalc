import * as React from "react";
import {Attack} from "../../model";
import {DamageInstanceComponent} from "./damageinstance";

interface AttackData {
    attack: Attack;
}

export class AttackInputs extends React.Component<AttackData,AttackData> {
    constructor(props : AttackData) {
        super(props);
        this.state = {
            attack : props.attack
        }
    }

    onChange = (event : any) => {
        let attack = this.state.attack;
        attack[event.target.name] = Number(event.target.value);
        this.setState({attack: attack});
    }

    render() {
        let instances = [];
        for(let damageInstance of this.state.attack.damage) {
            instances.push(<DamageInstanceComponent instance={damageInstance}></DamageInstanceComponent>)
        }

        return (
        <div className="row">
            {instances}
            <input id="weaponDamage" 
                name="weaponDamage" 
                type="number" 
                value={this.state.attack.weaponDamage} 
                onChange={this.onChange} />
            <label htmlFor="weaponDamage">Weapon damage</label>
        </div>);
    }
}
