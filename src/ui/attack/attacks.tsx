import * as React from "react"
import {Attack} from "../../model"
import {AttackInputs} from "./attack"

interface AttacksData {
    attacks : Attack[]
}

export class Attacks extends React.Component<AttacksData,AttacksData> {
    constructor(props : AttacksData) {
        super(props);
        this.state = {
            attacks : props.attacks
        }
    }

    addAttack = () => {
        let attacks = this.state.attacks;
        attacks.push({
            damage: [],
            weaponDamage: 0,
            isSpell: false,
        });
        this.setState({attacks : attacks});
    }

    render() {
        let attacks = [];
        
        let counter = 0;
        for(let attack of this.state.attacks) {
            attacks.push(<AttackInputs key={counter++} attack={attack} />);
        }

        return (
        <div className="row">
            {attacks}
            <div className="col s2"><a className="waves-effect waves-light btn" onClick={this.addAttack}>Add attack</a></div>
        </div>);
    }
}
