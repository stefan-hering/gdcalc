import * as React from "react"
import {Attack,DamageType} from "../../model"
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
        attack.damage.push({type: DamageType.PHYISCAL,value : 2000});
        this.setState({attack : attack});
    }

    render() {
        let instances = [];
        let counter = 0;
        for(let damageInstance of this.state.attack.damage) {
            instances.push(<DamageInstanceComponent key={counter++} instance={damageInstance}></DamageInstanceComponent>);
        }

        return (
        <div className="col s6">
            {instances}
            <div className="input-field col s3">
                <input id="weaponDamage" 
                    name="weaponDamage" 
                    type="number" 
                    value={this.state.attack.weaponDamage} 
                    onChange={this.onChange} />
                <label htmlFor="weaponDamage">Weapon damage (in %)</label>
            </div>
            <a className="waves-effect waves-light btn col s3" onClick={this.addDamageInstance}>Add damage instance</a>
        </div>);
    }
}
