var GraphView = Backbone.View.extend({

  className: 'graphContainer',

  template: _.template('<h2><%= title %></h2>'),

  initialize: function() {

    this.graph = new this.Graph();

    // Re-render when model changes
    this.listenTo(this.model, 'change', this.render);
    // First time render
    this.render();

  },

  Graph: function() {
    // Define the dimensions of the graph

    this.data = {
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

    var width = 1400,
        height = 500;

    // Create a force layout and set props like size, link dist, charge
    this.force = d3.layout.force()
      .size([width, height])
      .charge(-2000)
      .linkDistance(100);

    // Allow drag on force layout
    this.drag = this.force.drag()
      .on("dragstart", function(d) {
        d3.select(this).classed("fixed", d.fixed = true);
      });

    //Create a SVG canvas that holds the graph
    this.svg = d3.select("#graphDisplay").append('svg')
        .attr('width', width)
        .attr('height', height);

    this.link = this.svg.selectAll(".link");
    this.node = this.svg.selectAll(".node");

    // Associate the force layout with node data and link data and start the layout
    this.force
      .nodes(this.data.nodes)
      .links(this.data.links)
      .on("tick", tick.bind(this));

    function tick() {
      this.link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      this.node.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });

      this.node.select("circle").attr("cx", function(d) { return d.x; })
                        .attr("cy", function(d) { return d.y; });

      this.node.select("text").attr("x", function(d) { return d.x; })
                         .attr("y", function(d) { return d.y; });
    }

    this.dragstart =

    this.draw = function() {
      this.link.remove();
      this.node.remove();

      // Select all links and nodes
      this.link = this.svg.selectAll(".link");
      this.node = this.svg.selectAll(".node");

      // Bind the link data to a line element
      // Must do that before binding the nodes so nodes sit on top
      this.link = this.link.data(this.data.links); // bind the data
      this.link.enter().append("line") // append the line element
        .attr("class", "link"); // add a class

      // Remove any links with no data
      this.link.exit().remove();

      // Bind the node data to a group element, which will contain circle and text
      this.node = this.node.data(this.data.nodes);
      this.node.enter().append("g")
        .attr("class", "node")
        .call(this.drag);

      // Add circle element to the node
      this.node.append("circle")
        .attr("class", "node-container")
        .attr("r", 50);

      // Add text to the node
      this.node.append("text")
        .text(function(d) { return d.name; })
        .attr("class", "node-text")
        .attr("text-anchor", "middle");

      // Remove any nodes with no data
      this.node.exit().remove();

      // Restart the force layout
      this.force.start();

      return this.svg;
    }

    console.log("this is the graph object initalized", this);
  },


  render: function() {

    // Populate the template with data
    var title = this.template({
      title: this.model.get('title')
    });

    // Render the graph using D3 code
    this.graph.draw();

    // Append title and graph to the DOM
    this.$el.append([title]);

  }

});
