// On launch, render a new AppView
var graphModel = new Graph();

var app = new AppView({
  // This AppView is linked to a new Graph model that got the data above
  model: graphModel
});
