import * as React from "react";
import {DamageInstance} from "../../model";

interface DamageInstanceData {
    instance : DamageInstance;
}

export class DamageInstanceComponent extends React.Component<DamageInstanceData,DamageInstanceData> {
    constructor(props : DamageInstanceData) {
        super(props);
        this.state = {
            instance : props.instance
        }
    }

    onChange = (event : any) => {
        let instance = this.state.instance;
        instance[event.target.name] = Number(event.target.value);
        this.setState({instance: instance});
    }

    render() {
        return (
        <div className="row">
            <div className="input-field col">
                <input id="oa" 
                    name="offensiveAbility" 
                    type="number" 
                    value={this.state.instance.value} 
                    onChange={this.onChange} />
                <label htmlFor="oa">{this.state.instance.type}</label>
            </div>
        </div>);
    }
}
