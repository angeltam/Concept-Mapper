var Graph = Backbone.Model.extend({

  initialize: function() {
    console.log("created the model");
    this.set("title", "Best Map Ever");
    this.set("nodes", []);
    this.set("links", []);
    console.log("the nodes ", this.get("nodes"));  // [{"name":"Boy","group":1} ...etc]
    console.log("the links ", this.get("links")); // [ {"source":0, "target":1, "relationship": "loves"} .. etc]
  },

  addToGraph: function(concept1, concept2, relationship) {
    this.addConcept(concept1);
    this.addConcept(concept2);
    this.addRelationship(concept1, concept2, relationship);
    console.log("Adding input data to the graph");
    this.trigger('addedStuff', this);
  },

  addConcept: function(concept) {
    // Add only if concept is not already in the graph
    if ( !this.hasConcept(concept, this) ) {
      var newSource = {"name": concept, "group": 1};
      this.get("nodes").push(newSource);
      console.log("added ", concept);
    }
  },

  hasConcept: function(concept) {
    return _.some(this.get("nodes"), function(node) {
      return node.name === concept;
    });
  },

  addRelationship: function(concept1, concept2, relationship) {
    var newSourceIndex;
    var newTargetIndex;
    for (var i=0; i<this.get("nodes").length; i++) {
      if (this.get("nodes")[i].name == concept1) {
        console.log(i);
        newSourceIndex = i;
      }
      if (this.get("nodes")[i].name == concept2) {
        console.log(i);
        newTargetIndex = i;
      }
    }
    var newLink = {
      "source": newSourceIndex,
      "target": newTargetIndex,
      "relationship": relationship
    };
    this.get("links").push(newLink);
    console.log("added ", relationship);

  }

});
