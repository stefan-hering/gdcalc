import * as React from "react"
import {Defender, DamageType} from "../model"

interface DefenderData {
    defender: Defender
    resistance : number,
    absorbtion : number
}

export class DefenderInputs extends React.Component<DefenderData,DefenderData> {
    constructor(props : DefenderData) {
        super(props);
        this.state = {
            defender : props.defender,
            resistance : props.resistance,
            absorbtion : props.defender.percentAbsorbtion * 100
        }
    }

    onChangeResistance = (event : any) => {
        let defender = this.state.defender;
        let newResi = Number(event.target.value) / 100;

        for (let type in DamageType) {
            defender.resistance[DamageType[type]] = newResi;
        }

        this.setState({resistance : Number(event.target.value),defender: defender});
    }

    onChangeAbsorb = (event : any) => {
        let defender = this.state.defender;
        defender.percentAbsorbtion = Number(event.target.value) / 100;
        this.setState({absorbtion : Number(event.target.value), defender});
    }

    onChange = (event : any) => {
        let defender = this.state.defender;
        defender[event.target.name] = Number(event.target.value);
        this.setState({defender: defender});
    }

    render() {
        return (
        <div className="row">
            <h6 className="col s12">Defender</h6>
            <div className="input-field col">
                <input id="armor" 
                    name="armor" 
                    type="number" 
                    value={this.state.defender.armor} 
                    onChange={this.onChange} />
                <label htmlFor="armor">Armor</label>
            </div>
            <div className="input-field col">
                <input id="armorAbsorbtion" 
                    name="armorAbsorbtion" 
                    type="number" 
                    value={this.state.defender.armorAbsorbtion}
                     onChange={this.onChange} />
                <label htmlFor="critDamage">Armor absorbtion</label>
            </div>
            <div className="input-field col">
                <input id="da" 
                    name="defensiveAbility" 
                    type="number" 
                    value={this.state.defender.defensiveAbility} 
                    onChange={this.onChange} />
                <label htmlFor="da">Defensive ability</label>
            </div>
            <div className="input-field col">
                <input id="resistance" 
                name="resistance" 
                type="number" 
                value={this.state.resistance} 
                onChange={this.onChangeResistance} />
                <label htmlFor="resistance">All resistances</label>
            </div>
            <div className="input-field col">
                <input id="percentAbsorbtion" 
                    name="percentAbsorbtion" 
                    type="number" 
                    value={this.state.absorbtion} 
                    onChange={this.onChangeAbsorb} />
                <label htmlFor="percentAbsorbtion">Percentage absorbtion</label>
            </div>
            <div className="input-field col">
                <input id="flatAbsorbtion" 
                    name="flatAbsorbtion" 
                    type="number" 
                    value={this.state.defender.flatAbsorbtion} 
                    onChange={this.onChange} />
                <label htmlFor="flatAbsorbtion">Flat absorbtion</label>
            </div>
        </div>);
    }
}