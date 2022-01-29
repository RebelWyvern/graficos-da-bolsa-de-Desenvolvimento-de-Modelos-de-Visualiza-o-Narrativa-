/*const annotations1 = [
  {
    note: {
      label: "Angola e a África Oriental e Meridional tem a mesma porcentagem de gastos em 1985",
      align: "left",  // try right or left
      wrap: 5,  // try something smaller to see text split in several lines
      padding: 5   // More = text lower
    },
    type: d3.annotationCalloutCircle,
    subject: {
      radius: 10,         // circle radius
      radiusPadding: 5   // white space around circle befor connector
    },
    color: ["red"],
    x: 180,
    y: 115,
    dy: 20,
    dx: -10
  },
  {
  note: {
      label: "Afeganistão e a África Oriental e Meridional tem a mesma quantidade de gastos em 2016",
      align: "middle",  // try right or left
      wrap: 10,  // try something smaller to see text split in several lines
      padding: 10   // More = text lower
    },
    type: d3.annotationCalloutCircle,
    subject: {
      radius: 10,         // circle radius
      radiusPadding: 5   // white space around circle befor connector
    },
    color: ["red"],
    x: 550,
    y: 106,
    dy: -50,
    dx: -1
  }
]


// Add annotation to the chart
const makeAnnotations1 = d3.annotation()
  .annotations(annotations1)
*/
// set the dimensions and margins of the graph
var margin = {top: 100, right: 80, bottom: 100, left: 80},
    width = 760 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
  //.call(makeAnnotations1)
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
          

//Read the data
d3.csv("https://raw.githubusercontent.com/RebelWyvern/database/master/escolarizaçãoP1.csv", function(data) {

  // group the data: I want to draw one line per group
  var aux2;
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d){ return d.Entity;})

    .entries(data);
    console.log("entidade: "+sumstat[0].values[0].GDP)
    console.log("entidade: "+sumstat[1].key)

    // This allows to find the closest X index of the mouse:
 
  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain([1970,2019])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));
    svg.append("text")      // text label for the x axis
        .attr("x", width/2 )
        .attr("y",450)
        .style("text-anchor", "middle")
        .text("Ano(1970-2019)");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.GDP; })])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Gastos do governo com educação em %");

  // color palette
  var res = sumstat.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
      .domain(res)
      .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])
    
    

  // Draw the line
  svg.selectAll(".line")
      .data(sumstat)
      .enter()
      .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return x(d.Year); })
            .y(function(d) { return y(+d.GDP); })
            (d.values) 
        })

        svg
      // First we need to enter in a group
      .selectAll("myDots")
      .data(sumstat)
      .enter()
        .append('g')
        
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
      .style("fill", function(d){ return color(d.Entity)})
        .attr("cx", function(d) { return x(d.Year) } )
        .attr("cy", function(d) { return y(d.GDP) } )
        .attr("r", 3)
        .attr("stroke", "white")


      var size = 10  
      var  v = svg.selectAll(".mylabels")
  .data(sumstat)

  v
  .enter()
  .append("text")
  .attr("class","myLabels")
    .attr("x", 20)
    .attr("y", function(d,i){ return -80 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d.key)})
    .text(function(d){ return d.key})
    .attr("text-anchor", "right")
    .style("alignment-baseline", "top")
                            
        

})

var margin2 = {top: 100, right: 80, bottom: 100, left: 80},
    width2 = 760 - margin2.left - margin2.right,
    height2 = 600 - margin2.top - margin2.bottom;

// append the svg object to the body of the page
var svg2 = d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin2.left + "," + margin2.top + ")");
          
d3.csv("https://raw.githubusercontent.com/RebelWyvern/database/master/escolarizaçãopart2.csv", function(data) {

// group the data: I want to draw one line per group
var aux2;
     


var x = d3.scaleBand()
.range([ 0, width2 ])
.domain(data.map(function(d){ return d.Entity }))
.padding(0.2);
svg2.append("g")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
      svg2.append("text")      // text label for the x axis
        .attr("x", width2/2 )
        .attr("y",480)
        .style("text-anchor", "middle")
        .text("Ano de 2015");  

  var y = d3.scaleLinear()
    .domain([0, 6.5])
    .range([ height2, 0]);
  svg2.append("g")
    .call(d3.axisLeft(y));
    svg2.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x",0 - (height2 / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Gastos do governo com educação em %");


    svg2.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.Entity); })
      .attr("y", function(d) { return y(d.GDP); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height2 - y(d.GDP); })
      .attr("fill", "#69b3a2")


    })      




  