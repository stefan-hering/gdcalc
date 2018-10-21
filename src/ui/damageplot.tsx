import {DamageGraph} from "./graph"
import {AttackerInputs} from "./attacker"
import {DefenderInputs} from "./defender"
import {Attacks} from "./attack/attacks"
import * as React from "react"
import * as ReactDOM from "react-dom"
import {Attack,Attacker,Defender,DamageType,Simulation} from "../model"

import CalculationWorker = require("worker-loader?name=dist/[name].js!./worker");

interface PlotterData {
    attacker : Attacker
    defender : Defender
    attacks : Attack[]
    data? : any
}

class DamagePlotter extends React.Component<PlotterData,any> {
    graph : DamageGraph;

    constructor(props: PlotterData) {
        super(props);
        this.state = {
            attacker : props.attacker,
            defender : props.defender,
            attacks : props.attacks,
            data : props.data,
            time : 2000
        }
    }

    clear = () => {
        this.graph.clear();
    }

    createGraph = () => {
        let worker = new CalculationWorker();

        let sim : Simulation = {
            attacker : JSON.parse(JSON.stringify(this.state.attacker)),
            defender : JSON.parse(JSON.stringify(this.state.defender)),
            attacks : JSON.parse(JSON.stringify(this.state.attacks)),
            time : this.state.time,
        };
        console.log(sim);
        worker.onmessage = (ev: MessageEvent) => {
            this.graph.doChart(ev.data);
            worker.terminate();
        };

        worker.postMessage(sim);
    }

    onChangeTime = (evt) => {
        this.setState({time : Number(evt.target.value)});
    }

    render() {
        return <div className="row">
                <div className="col s12">
                    <AttackerInputs attacker={this.state.attacker} />
                </div>
                <div className="col s12">
                    <DefenderInputs defender={this.state.defender} resistance={16} absorbtion={0} />
                </div>
                <div className="col s12">
                    <Attacks attacks={this.state.attacks} />
                </div>
                <div className="input-field col s12">
                    <input id="time" name="time" type="number" onChange={this.onChangeTime} value={this.state.time} />
                    <label htmlFor="time">Time in ??</label>

                    <a className="waves-effect waves-light btn" onClick={this.createGraph}>Plot</a>
                    <a className="waves-effect waves-light btn" onClick={this.clear}>Clear</a>
                </div>
                <div className="col s12">
                    <DamageGraph data={this.state.data} ref={graph => {this.graph = graph}} />
                </div>
            </div>
    }
}

export default (data : PlotterData) => {
    let playground : any = ReactDOM.render(<DamagePlotter {...data} />, 
        document.querySelector("#content"));
}
