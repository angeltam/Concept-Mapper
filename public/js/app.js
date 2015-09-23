// On launch, render a new AppView
var graphModel = new Graph();
// graphModel.addToGraph("Boy", "Dog", "loves");

var app = new AppView({
  // This AppView is linked to a new Graph model that got the data above
  model: graphModel
});
