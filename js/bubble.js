var diameter = 960,
    color    = d3.scale.category20c();

var bubble = d3.layout.pack()
               .sort(null)
               .size([diameter, diameter])
               .padding(1.5);

var svg = d3.select("section#graph").append("svg")
            .attr("width", diameter)
            .attr("height", diameter);

d3.csv("./data/LinesOfCode.csv")
    .row(function (d) { return {key: d["Project"], value: +d["FLoC"], LoC: d["LoC"]} })
    .get(function (error, rows) {
    	if (error) throw error;

    	var nodes = bubble.nodes({children: rows}).filter(function (d) { return !d.children; });

    	var bubbles = svg.selectAll(".bubble")
    	              .data(nodes)
    	              .enter().append("g")
    	              .attr("class", "bubble")
    	              .attr("transform", "translate(0, 0)");

    	bubbles.append("circle")
    		   .attr("class", "circle")
    		   .attr("cx", diameter / 2)
    		   .attr("cy", diameter / 2)
    	       .style("fill", function (d) { return color(d.value); })
    	       .style("opacity", 0)
    	       .on("mouseover", function (d) {
    	       		var string = d["key"] + " - " + d["LoC"] + " million LoC";
    	       		d3.select("section#project").text(string);
    	       })
    	       .on("mouseout", function (d) {
    	       		d3.select("section#project").text("");
    	       });

    	svg.selectAll(".circle").transition().duration(5000).delay(function (d, i) { return i * 50; })
    		   .style("opacity", 1)
    	       .attr("r",  function (d) { return d.r; })
    	       .attr("cx", function (d) { return d.x; })
    	       .attr("cy", function (d) { return d.y - 150; });
    });