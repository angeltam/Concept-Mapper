var graph =
  {
    "nodes":[
      {"name":"Boy","group":1},
      {"name":"Dog","group":1},
      {"name":"Cat","group":1},
      {"name":"House","group":1}
    ],
    "links":[
      {"source":0, "target":1, "relationship": "loves"},
      {"source":0, "target":2, "relationship": "loves"},
      {"source":0, "target":3, "relationship": "lives in"},
      {"source":1, "target":3, "relationship": "lives in"},
      {"source":1, "target":2, "relationship": "hates"}
    ]
  };


// Define the dimensions of the graph
var width = 960,
    height = 500;

// Create a force layout and set props like size, link dist, charge
var force = d3.layout.force()
  .size([width, height])
  .charge(-400)
  .linkDistance(100);


// Allow drag on force layout
var drag = force.drag()
  .on("dragstart", dragstart);

// Create a SVG canvas that holds the graph
var svg = d3.select('#graph').append('svg')
    .attr('width', width)
    .attr('height', height);


// d3.json("miserables.json", function(error, sample) {
//  if (error) throw error;
//  All node/linkcode in here
// });

// Associate the force layout with node data and link data and start the layout
force
  .nodes(graph.nodes)
  .links(graph.links)
  .start();

// Bind the link data to a line element
// Must do that before binding the nodes so nodes sit on top
var link = svg.selectAll(".link") // if not element not there already, it will create it
  .data(graph.links)  // bind the data
  .enter().append("line") // append the line element
  .attr("class", "link"); // add a class

// Bind the node data to a group element, which will contain rectangle and text
var node = svg.selectAll(".node")
  .data(graph.nodes)
  .enter().append("g")
  .attr("class", "node")
  .call(drag);

// Add rectangle element to the node
node.append("circle")
  .attr("class", "node-container")
  .attr("r", 40);

node.append("text")
  .text(function(d) { return d.name; })
  .attr("class", "node-text")
  .attr("text-anchor", "middle");

// Position the nodes and links constantly
force.on("tick", function() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

  node.select("circle").attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });

  node.select("text").attr("x", function(d) { return d.x; })
                     .attr("y", function(d) { return d.y; });

});

function dragstart(d) {
  d3.select(this).classed("fixed", d.fixed = true);
}

// function dblclick(d) {
//   d3.select(this).classed("fixed", d.fixed = false);
// }