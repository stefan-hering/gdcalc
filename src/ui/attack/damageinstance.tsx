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

    onChangeValue = (event : any) => {
        let instance = this.state.instance;
        instance.value = Number(event.target.value);
        this.setState({instance: instance});
    }
    
    onChangeType = (event : any) => {
        let instance = this.state.instance;
        instance.type = event.target.value;
        this.setState({instance: instance});
    }

    render() {
        let options = [];

        let counter = 0;
        for(let type in DamageType) {
            options.push(<option key={counter++} value={DamageType[type]}>{DamageType[type]}</option>)
        }

        return (
        <div className="col s6">
            <div className="input-field">
                <select id={"damageType" + this.id} onChange={this.onChangeType}>
                    {options}
                </select>
                <label htmlFor={"damageType" + this.id}>Type</label>
            </div>
            <div className="input-field">
                <input id={"damageInstance" + this.id}
                    name="damageInstance" 
                    type="number" 
                    value={this.state.instance.value} 
                    onChange={this.onChangeValue} />
                <label htmlFor={"damageInstance" + this.id}>{this.state.instance.type}</label>
            </div>
        </div>);
    }
}
