import * as React from "react"
import {DamageInstance, DamageType} from "../../model"

interface DamageInstanceData {
    instance : DamageInstance
}

export class DamageInstanceComponent extends React.Component<DamageInstanceData,DamageInstanceData> {
    id : string
    constructor(props : DamageInstanceData) {
        super(props);
        this.state = {
            instance : props.instance
        }
    }

    componentWillMount() {
        // TODO this has a low chance to result in conflicting htmlids
        this.id = ("" + Math.random()).split("\.")[1];
    }

    componentDidMount() {
        (window as any).M.FormSelect.init
            (document.getElementById("damageType" + this.id));
    }

    onChange = (event : any) => {
        let instance = this.state.instance;
        instance[event.target.name] = Number(event.target.value);
        this.setState({instance: instance});
    }

    render() {
        let options = [];

        let counter = 0;
        for(let type in DamageType) {
            options.push(<option key={counter++} value={type}>{DamageType[type]}</option>)
        }

        return (
        <div>
            <div className="input-field col">
                <select id={"damageType" + this.id}>
                    {options}
                </select>
                <label htmlFor={"damageType" + this.id}>Type</label>
            </div>
                <div className="input-field col">
                <input id={"damageInstance" + this.id}
                name="damageInstance" 
                type="number" 
                value={this.state.instance.value} 
                onChange={this.onChange} />
                <label htmlFor={"damageInstance" + this.id}>{this.state.instance.type}</label>
            </div>
        </div>);
    }
}
