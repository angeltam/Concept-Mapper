/*********/
/*  DATA */
/*********/

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


var addConcept = function(concept) {
  // Add only if concept is not already in the graph
  if ( !hasConcept(concept) ) {
    var newSource = {"name": concept, "group": 1};
    graph.nodes.push(newSource);
    console.log("added ", concept);
  }
};

var hasConcept = function(concept) {
  return _.some(graph.nodes, function(node) {
    return node.name === concept;
  });
};

var addRelationship = function(concept1, concept2, relationship) {
  var newSourceIndex;
  var newTargetIndex;
  for (var i=0; i<graph.nodes.length; i++) {
    if (graph.nodes[i].name == concept1) {
      console.log(i);
      newSourceIndex = i;
    }
    if (graph.nodes[i].name == concept2) {
      console.log(i);
      newTargetIndex = i;
    }
  }
  var newLink = {
    "source": newSourceIndex,
    "target": newTargetIndex,
    "relationship": relationship
  };
  graph.links.push(newLink);
  console.log("added ", relationship);

};

var addToGraph = function(concept1, concept2, relationship) {
  addConcept(concept1);
  addConcept(concept2);
  addRelationship(concept1, concept2, relationship);
  console.log("Adding input data to the graph");
  draw();
};


/*************************/
/*  FORCE-DIRECTED GRAPH */
/*************************/


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

var link = svg.selectAll(".link");
var node = svg.selectAll(".node");

// d3.json("miserables.json", function(error, sample) {
//  if (error) throw error;
//  All node/linkcode in here
// });

// Associate the force layout with node data and link data and start the layout
force
  .nodes(graph.nodes)
  .links(graph.links)
  .on("tick", tick);

// Render the data
draw();

// Position the nodes and links constantly
function tick() {
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
}

function dragstart(d) {
  d3.select(this).classed("fixed", d.fixed = true);
}

/************************/
/*  UPDATE RENDER GRAPH */
/************************/

function draw() {

  // Remove old links and nodes
  link.remove();
  node.remove();

  // Select all links and nodes
  link = svg.selectAll(".link");
  node = svg.selectAll(".node");

  // Bind the link data to a line element
  // Must do that before binding the nodes so nodes sit on top
  link = link.data(graph.links); // bind the data
  link.enter().append("line") // append the line element
    .attr("class", "link"); // add a class

  // Remove any links with no data
  link.exit().remove();

  // Bind the node data to a group element, which will contain circle and text
  node = node.data(graph.nodes);
  node.enter().append("g")
    .attr("class", "node")
    .call(drag);

  // Add circle element to the node
  node.append("circle")
    .attr("class", "node-container")
    .attr("r", 50);

  // Add text to the node
  node.append("text")
    .text(function(d) { return d.name; })
    .attr("class", "node-text")
    .attr("text-anchor", "middle");

  // Remove any nodes with no data
  node.exit().remove();

  // Restart the force layout
  force.start();
}
