import * as React from "react";
import * as d3 from 'd3';

class DamageGraph extends React.Component<any,any> {
    x;
    y;
    data;
    line;
    height;
    width;
    g;
    node;

    constructor(props) {
        super(props);

        this.state = {
            data : props.data
        }
    }

    setData = (data) => {
        this.data = data;
    }

    doChart = (data) => {
        if( ! data) {
            return;
        }
        this.data = data;

        var svg = d3.select(this.node);
        var margin = {top: 20, right: 20, bottom: 20, left: 80};
        this.width = +svg.attr("width") - margin.left - margin.right,
        this.height = +svg.attr("height") - margin.top - margin.bottom,
        this.g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        

        this.x = d3.scaleLinear().rangeRound([0, this.width]);
        this.y = d3.scaleLinear().rangeRound([this.height, 0]);
        this.line = d3.line()
            .curve(d3.curveBasis)
            .x((d:any) => { return this.x(d.OA); })
            .y((d:any) => { return this.y(d.dps); });


        this.x.domain(d3.extent(this.data, function(d:any) { return parseInt(d.OA,10); }));
        this.y.domain([d3.min(this.data, function(d:any) { return parseInt(d.dps, 10); }), 
            d3.max(this.data, function(d:any) { return parseInt(d.dps, 10); })]);

        this.g.append("path")
            .datum(this.data)
            .attr("fill", "none")
            .style("stroke","#181818")
            .style("stroke-width","4px")
            .attr("d", this.line);

        this.g.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.x))
            .append("text")
            .attr("fill", "#000")
            .attr("x", this.width)
            .attr("y", -6)
            .attr("dx", "0.71em")
            .attr("text-anchor", "end")
            .text("OA");

        this.g.append("g")
            .call(d3.axisLeft(this.y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("total damage");
    }
    
    render() {
        return <svg id="dps-graph" ref={node => this.node = node} style={{width:"960px", height:"800px"}} width="960" height="800"></svg>;
    }
}

export {DamageGraph};