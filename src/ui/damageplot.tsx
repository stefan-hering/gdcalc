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
            data : props.data
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
            attack : {damage : [{type : DamageType.CHAOS, value:100}], weaponDamage: 0},
            time : 3000,
            attacks : 2000
        }
        worker.onmessage = (ev: MessageEvent) => {
            this.graph.doChart(ev.data);
            worker.terminate();
        };

        worker.postMessage(sim);
    }

    render() {
        return <div>
                <AttackerInputs attacker={this.state.attacker} />
                <DefenderInputs defender={this.state.defender} resistance={16} absorbtion={0} />
                <Attacks attacks={this.state.attacks} />
                <DamageGraph data={this.state.data} ref={graph => {this.graph = graph}} />
                <input name="" />
                <a className="waves-effect waves-light btn" onClick={this.createGraph}>Plot</a>
                <a className="waves-effect waves-light btn" onClick={this.clear}>Clear</a>
            </div>
    }
}

export default (data : PlotterData) => {
    let playground : any = ReactDOM.render(<DamagePlotter {...data} />, 
        document.querySelector("#content"));
}
