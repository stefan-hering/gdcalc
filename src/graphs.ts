import * as d3 from 'd3';

var svg = d3.select("#dps-graph"),
    margin = {top: 20, right: 20, bottom: 20, left: 80},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleLinear().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);


var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d:any) { return x(d.OA); })
    .y(function(d:any) { return y(d.dps); });

let render = (data) => {
    (<any>x).domain(d3.extent(data, function(d:any) { return parseInt(d.OA,10); }));
    (<any>y).domain([d3.min(data, function(d:any) { return parseInt(d.dps, 10); }), 
        d3.max(data, function(d:any) { return parseInt(d.dps, 10); })]);

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .style("stroke","#181818")
        .style("stroke-width","4px")
        .attr("d", line);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("fill", "#000")
        .attr("x", width)
        .attr("y", -6)
        .attr("dx", "0.71em")
        .attr("text-anchor", "end")
        .text("OA");

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("total damage");
}

export {render};
