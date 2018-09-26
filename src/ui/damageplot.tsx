import {DamageGraph} from './graph'
import {AttackerInputs} from './attacker'
import {DefenderInputs} from './defender'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Attacker,Defender,DamageType} from '../model';
import {simulate} from '../simulation';

interface PlotterData {
    attacker : Attacker
    defender : Defender
    data? : any
}

class DamagePlotter extends React.Component<PlotterData,any> {
    graph : DamageGraph;

    constructor(props: PlotterData) {
        super(props);
        this.state = {
            attacker : props.attacker,
            defender : props.defender,
            data : props.data
        }
    }

    createGraph = () => {
        let values = [];

        let attacker = JSON.parse(JSON.stringify(this.state.attacker));
        let defender = JSON.parse(JSON.stringify(this.state.defender));

        console.log(attacker);
        console.log(defender);


        for(let i = 0; i < 350; i++) {
            let oa = 500 + 10 * i;
            attacker.offensiveAbility = oa;
            values.push({
                "OA" : oa,
                "dps" : simulate({attacker:attacker,
                    defender:defender,
                    attack:{damage : [{type : DamageType.CHAOS, value:100}], weaponDamage: 0}, 
                    attacks : 20000})
            })
        }

        //this.setState({data : values});
        this.graph.doChart(values);
    }

    render() {
        return <div>
                <AttackerInputs attacker={this.state.attacker} />
                <DefenderInputs defender={this.state.defender} resistance={16} />
                <DamageGraph data={this.state.data} ref={graph => {this.graph = graph}} />
                <input name="" />
                <button onClick={this.createGraph}>Plot</button>
            </div>
    }
}

export default (data : PlotterData) => {
    let playground : any = ReactDOM.render(<DamagePlotter {...data} />, 
        document.querySelector("#content"));
}
