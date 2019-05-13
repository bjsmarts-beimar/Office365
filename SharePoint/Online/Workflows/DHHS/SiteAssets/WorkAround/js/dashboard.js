'use strict';

var chartData = null;

jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }    

    getDataFromlocalStorage();

    //loadChartData();
    
});

function loadChartData() {

    let ddi1, ddi2, ddi3, ddi4, ddi5, ddi6;

    let urlQuery = "?$filter=(WorkaroundType eq 'DDI Pre-Implementation') and (WorkaroundWorkflowStatus ne 'Completed')";
    let results = retrieveSharePointListItemsByListName("Workaround", urlQuery);

    results.done(function (data) {
        
        ddi1 = _(data.d.results).size()*20;
        urlQuery = "?$filter=(WorkaroundType eq 'DDI Pre-Implementation') and (WorkaroundWorkflowStatus eq 'Rejected')";
        results = retrieveSharePointListItemsByListName("Workaround", urlQuery);

        results.done(function (data) {

            ddi2 = _(data.d.results).size()*20;
            urlQuery = "?$filter=(WorkaroundType eq 'DDI Post-Implementation') and (WorkaroundWorkflowStatus ne 'Completed')";
            results = retrieveSharePointListItemsByListName("Workaround", urlQuery);

            results.done(function (data) {

                ddi3 = _(data.d.results).size()*20;
                urlQuery = "?$filter=(WorkaroundType eq 'DDI Post-Implementation') and (WorkaroundWorkflowStatus eq 'Rejected')";
                results = retrieveSharePointListItemsByListName("Workaround", urlQuery);

                results.done(function(data) {

                    ddi4 = _(data.d.results).size()*20;
                    urlQuery = "?$filter=(WorkaroundType eq 'O%26M') and (WorkaroundWorkflowStatus ne 'Completed')";
                    results = retrieveSharePointListItemsByListName("Workaround", urlQuery);

                    results.done(function(data) {

                        ddi5 = _(data.d.results).size()*20;
                        urlQuery = "?$filter=(WorkaroundType eq 'O%26M') and (WorkaroundWorkflowStatus eq 'Rejected')";
                        results = retrieveSharePointListItemsByListName("Workaround", urlQuery);

                        results.done(function(data) {

                            ddi6 = _(data.d.results).size()*20;
                            chartData = [ddi1, ddi2, ddi3, ddi4, ddi5, ddi6];     
                            drawChart(chartData);                       

                        });
                        results.fail(function(err) {
                            alert(err.responseText);
                        });
                
                    });
                    results.fail(function(err) {
                        alert(err.responseText);
                    });

                });
                results.fail(function(err) {
                    alert(err.responseText);
                });

                
            });
            results.fail(function(err) {
                alert(err.responseText);
            });
        });
        results.fail(function(err) {
            alert(err.responseText);
        });

    });
    results.fail(function(err) {
        alert(err.responseText);
    });
}

function drawChart(dataset) {    

    var svgWidth = 400;
    var svgHeight = 240;
    var svg = d3.select("#chart1")
    .append("svg")    
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "bar-chart");

    svg.append("text")
        .attr("x", (svgWidth / 2))             
        .attr("y", 30)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Temporary Process Change (TPC) Totals by Type");
    
    //var dataset = [80, 100, 56, 120, 180, 30];
    var barPadding = 20;
    var barWidth = (svgWidth / dataset.length);
    var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function(d) {
        return svgHeight - d
    })
    .attr("height", function(d) {
        return d;
    })
    .attr("width", barWidth - barPadding)
    .attr("style", "fill:#1341B6")
    .attr("transform", function (d, i) {
         var translate = [barWidth * i, 0];
         return "translate("+ translate +")";
    });

}

function drawPie()
{
    var data = [{"letter":"4","presses":1},{"letter":" ","presses":5},{"letter":"","presses":2}];
    
    var width = 380,
	height = 300,
	// Think back to 5th grade. Radius is 1/2 of the diameter. What is the limiting factor on the diameter? Width or height, whichever is smaller
	radius = Math.min(width, height) / 2;        
    
    var color = d3.scaleOrdinal()
	.range(["red","lightgreen","yellow"]);
    
    var pie = d3.pie()
	.value(function(d) { return d.presses; })(data);
    
    var arc = d3.arc()
	.outerRadius(radius - 25)
	.innerRadius(0);

    var labelArc = d3.arc()
	.outerRadius(radius - 100)
	.innerRadius(radius - 50);
    
    var svg = d3.select("#pie")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width/2 + "," + height/2 +")"); // Moving the center point. 1/2 the width and 1/2 the height
    
    svg.append("text")
        .attr("x", (2 / 2))             
        .attr("y", 140)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Temporary Process Change (TPC) Totals by Days");
    
    var g = svg.selectAll("arc")
	.data(pie)
	.enter().append("g")
	.attr("class", "arc");
    
    g.append("path")
	.attr("d", arc)
	.style("fill", function(d) { return color(d.data.letter);});
    
    g.append("text")
	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
	.text(function(d) { return d.data.letter;})
	.style("fill", "#fff");
}