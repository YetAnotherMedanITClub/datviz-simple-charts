var fill   = d3.scale.category20();
var layout = d3.layout.cloud()
               .size([960, 640])
               .padding(5);

d3.csv("data/BookListWC.csv")
    .row(function (d) { return {text: d["key"], size: d["value"]}; })
    .get(function (error, rows) {
    	var draw = function (words) {
    		var width  = layout.size()[0],
    		    height = layout.size()[1];

    		d3.select("section#wordcloud").append("svg")
    			.attr("width",  width)
    			.attr("height", height)
    		  .append("g")
    		    .attr("transform", "translate(" + width/2 + "," + height/2 + ")")
    		  .selectAll("text")
    		    .data(words)
    		  .enter().append("text")
    		    .style("font-size", function (d) { return d.size + "px"; })
    		    .style("font-family", "Impact")
    		    .style("fill", function (d, i) { return fill(i); })
    		    .attr("text-anchor", "middle")
    		    .attr("transform", function (d) {
    		    	return "translate(" + [d.x,d.y] + ")";
    		    })
    		    .text(function (d) { return d.text; });
    	};

  	    if (error) throw error;

  	    layout.words(rows)
  	          .font("Impact")
  	          .fontSize(function (d) { return d.size; })
  	          .on("end", draw);

  	    layout.start();
    });