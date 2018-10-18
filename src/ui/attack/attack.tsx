import * as React from "react"
import {Attack} from "../../model"
import {DamageInstanceComponent} from "./damageinstance"

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

    addDamageInstance = () => {
        let attack = this.state.attack;
        attack.damage.push({type: null,value : 0});
        this.setState({attack : attack});
    }

    render() {
        let instances = [];
        let counter = 0;
        for(let damageInstance of this.state.attack.damage) {
            instances.push(<DamageInstanceComponent key={counter} instance={damageInstance}></DamageInstanceComponent>)
        }

        return (
        <div className="col s12">
            {instances}
            <a className="waves-effect waves-light btn" onClick={this.addDamageInstance}>Add damage instance</a>
            <div className="input-field col">
                <input id="weaponDamage" 
                    name="weaponDamage" 
                    type="number" 
                    value={this.state.attack.weaponDamage} 
                    onChange={this.onChange} />
                <label htmlFor="weaponDamage">Weapon damage (in %)</label>
            </div>
        </div>);
    }
}
