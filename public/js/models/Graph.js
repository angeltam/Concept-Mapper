var Graph = Backbone.Model.extend({

  defaults: {
  },

  initialize: function() {
    console.log("created the model");
    console.log(this.get("nodes"));  // [{"name":"Boy","group":1} ...etc]
    console.log(this.get("links")); // [ {"source":0, "target":1, "relationship": "loves"} .. etc]
  },

  addToGraph: function() {
    console.log("Adding input data to the graph");
  }

});
