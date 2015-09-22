var AppView = Backbone.View.extend({

  // Hard-coded in index.html
  el: '#app',

  // Create and render all the subviews upon app launch
  initialize: function() {

    this.title = new TitleView();

    // this.input = new InputView({
    //   collection: this.collection
    // });

    this.render();
  },

  // Append each view to DOM
  render: function() {

    this.$el.append([
      this.title.$el
      // this.input.$el,
    ]);

    return this;
  }

});