var AppView = Backbone.View.extend({

  // Hard-coded in index.html
  el: '#app',

  // Create and render all the subviews upon app launch
  initialize: function() {

    this.title = new TitleView();

    this.input = new InputView({
      model: this.model
    });

    this.graph = new GraphView( {
      model: this.model  // Pass along the AppView's Graph model; may want to give AppView a collection later instead
    });

    this.render();
  },

  // Append each view to DOM
  render: function() {

    this.$el.append([
      this.title.$el,
      this.graph.$el,
      this.input.$el
    ]);

    return this;
  }

});